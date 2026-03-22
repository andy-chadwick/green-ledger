/*
 * CostCalculator — The Green Ledger
 * Design: Sticky bottom drawer with best/worst case scenario toggles
 * Shows running total of fiscal, security, and social impact
 */

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ChevronUp, ChevronDown, ToggleLeft, ToggleRight, AlertTriangle } from 'lucide-react';
import { policies } from '@/lib/policyData';

interface CalculatorState {
  [policyId: string]: boolean;
}

const CALC_OPEN_STORAGE_KEY = 'green-ledger-calculator-open';
const CALC_BAR_BG = '#10121a';
const CALC_PANEL_BG = '#12141a';
const CALC_BORDER = 'rgba(212,160,23,0.2)';
const CALC_TOP_GLOW = '0 -14px 40px rgba(0, 0, 0, 0.45), 0 -2px 0 rgba(212,160,23,0.12)';

function formatGBP(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(1)}tn`;
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(0)}bn`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}m`;
  return `£${value.toLocaleString()}`;
}

function ImpactBar({ value, max = 5, label }: { value: number; max?: number; label: string }) {
  const normalised = Math.max(-max, Math.min(max, value));
  const pct = ((normalised + max) / (max * 2)) * 100;
  const color = normalised > 0 ? '#22c55e' : normalised < 0 ? '#ef4444' : '#6b7280';

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-white/65 w-20 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
        <motion.div
          className="absolute top-0 bottom-0 rounded-full"
          style={{
            backgroundColor: color,
            left: normalised < 0 ? `${pct}%` : '50%',
            right: normalised > 0 ? `${100 - pct}%` : '50%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="text-sm font-mono w-8 text-right" style={{ color }}>
        {normalised > 0 ? '+' : ''}{normalised}
      </span>
    </div>
  );
}

export default function CostCalculator() {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    // Default closed on mobile, respect persisted preference on desktop
    const isMobile = window.innerWidth < 640;
    if (isMobile) return false;
    const persisted = window.localStorage.getItem(CALC_OPEN_STORAGE_KEY);
    return persisted ? persisted === '1' : false;
  });
  const [scenario, setScenario] = useState<'best' | 'worst'>('worst');
  const [searchTerm, setSearchTerm] = useState('');
  const [enabled, setEnabled] = useState<CalculatorState>(
    Object.fromEntries(policies.map(p => [p.id, true]))
  );

  useEffect(() => {
    window.localStorage.setItem(CALC_OPEN_STORAGE_KEY, isOpen ? '1' : '0');
  }, [isOpen]);

  const togglePolicy = (id: string) => {
    setEnabled(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const setAllPolicies = (value: boolean) => {
    setEnabled(Object.fromEntries(policies.map(policy => [policy.id, value])));
  };

  const resetDefaults = () => {
    setScenario('worst');
    setSearchTerm('');
    setAllPolicies(true);
  };

  const activePolicies = policies.filter(p => enabled[p.id]);
  const filteredPolicies = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return policies;
    return policies.filter(policy => policy.title.toLowerCase().includes(query));
  }, [searchTerm]);

  const totalFiscal = activePolicies.reduce((sum, p) =>
    sum + (scenario === 'best' ? p.bestCaseGBP : p.worstCaseGBP), 0
  );

  const totalSecurity = activePolicies.reduce((sum, p) => sum + p.securityImpact, 0);
  const totalInequality = activePolicies.reduce((sum, p) => sum + p.inequalityImpact, 0);
  const totalServices = activePolicies.reduce((sum, p) => sum + p.servicesImpact, 0);

  const fiscalColor = totalFiscal >= 0 ? '#22c55e' : '#ef4444';
  const fiscalLabel = totalFiscal >= 0 ? 'Net Annual Saving' : 'Net Annual Cost';
  const isNuclearEnabled = enabled['trident'];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Collapsed bar */}
      <div
        className="cursor-pointer"
        style={{ background: CALC_BAR_BG, borderTop: `1px solid ${CALC_BORDER}`, boxShadow: CALC_TOP_GLOW }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator size={16} style={{ color: '#d4a017' }} />
            <span className="hidden sm:inline text-sm font-tech text-white/75">
              Policy Cost Calculator
            </span>
            <span className="text-xs font-tech px-2 py-0.5 rounded" style={{ background: 'rgba(212,160,23,0.15)', color: '#d4a017' }}>
              {activePolicies.length}/{policies.length} policies active
            </span>
            {!isOpen && (
              <span className="hidden sm:inline text-xs text-white/60">Tap to configure</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Fiscal total */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-white/60 font-mono">
                {scenario === 'best' ? 'Best' : 'Worst'} case:
              </span>
              <span className="text-sm sm:text-base font-mono font-bold" style={{ color: fiscalColor }}>
                {totalFiscal >= 0 ? '+' : ''}{formatGBP(totalFiscal)}
              </span>
            </div>

            {/* Nuclear warning */}
            {!isNuclearEnabled && (
              <div className="flex items-center gap-1 text-xs font-mono" style={{ color: '#ef4444' }}>
                <AlertTriangle size={12} />
                <span className="hidden sm:inline">Trident off</span>
              </div>
            )}

            {isOpen ? <ChevronDown size={14} className="text-white/40" /> : <ChevronUp size={14} className="text-white/40" />}
          </div>
        </div>
      </div>

      {/* Expanded panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ background: CALC_PANEL_BG, borderTop: `1px solid ${CALC_BORDER}`, boxShadow: CALC_TOP_GLOW, overflow: 'hidden' }}
          >
            <div className="max-w-5xl mx-auto px-4 py-5 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
              <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-sm text-white/75">
                  <span className="font-semibold">How to use:</span> 1) Choose a scenario, 2) toggle policies on/off, 3) compare net annual fiscal and social impacts.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Totals */}
                <div className="lg:col-span-1">
                  {/* Scenario toggle */}
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => setScenario('best')}
                      className="flex-1 py-1.5 text-xs font-mono rounded transition-all"
                      style={{
                        background: scenario === 'best' ? 'rgba(34,197,94,0.15)' : 'transparent',
                        color: scenario === 'best' ? '#22c55e' : 'rgba(255,255,255,0.3)',
                        border: scenario === 'best' ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      Best Case
                    </button>
                    <button
                      onClick={() => setScenario('worst')}
                      className="flex-1 py-1.5 text-xs font-mono rounded transition-all"
                      style={{
                        background: scenario === 'worst' ? 'rgba(239,68,68,0.15)' : 'transparent',
                        color: scenario === 'worst' ? '#ef4444' : 'rgba(255,255,255,0.3)',
                        border: scenario === 'worst' ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      Worst Case
                    </button>
                  </div>

                  {/* Big fiscal number */}
                  <div className="p-4 rounded-lg mb-4" style={{ background: `${fiscalColor}10`, border: `1px solid ${fiscalColor}20` }}>
                    <div className="text-xs font-tech text-white/65 mb-1">{fiscalLabel}</div>
                    <div className="font-mono font-bold text-3xl" style={{ color: fiscalColor }}>
                      {totalFiscal >= 0 ? '+' : ''}{formatGBP(totalFiscal)}
                    </div>
                    <div className="text-sm text-white/55 mt-1">per year vs. current spending</div>
                  </div>

                  {/* Social impact bars */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-tech text-white/55 mb-2">Social Impact</div>
                    <ImpactBar value={totalSecurity} label="Security" />
                    <ImpactBar value={totalInequality} label="Inequality" />
                    <ImpactBar value={totalServices} label="Services" />
                  </div>

                  {/* Nuclear warning */}
                  {!isNuclearEnabled && (
                    <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle size={12} style={{ color: '#ef4444' }} />
                        <span className="text-xs font-mono font-bold" style={{ color: '#ef4444' }}>Nuclear Deterrent Removed</span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">
                        UK loses permanent seat at NATO nuclear planning. Ukraine gave up its nuclear arsenal in 1994. Russia invaded in 2022.
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Policy toggles */}
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="text-xs font-tech text-white/55">Toggle Policies</div>
                    <button
                      onClick={() => setAllPolicies(true)}
                      className="px-2 py-1 rounded text-xs font-tech transition-colors"
                      style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}
                    >
                      Select all
                    </button>
                    <button
                      onClick={() => setAllPolicies(false)}
                      className="px-2 py-1 rounded text-xs font-tech transition-colors"
                      style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}
                    >
                      Clear all
                    </button>
                    <button
                      onClick={resetDefaults}
                      className="px-2 py-1 rounded text-xs font-tech transition-colors"
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' }}
                    >
                      Reset defaults
                    </button>
                  </div>

                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search policies..."
                    className="w-full mb-3 px-3 py-2 rounded-lg text-sm text-white placeholder:text-white/35 bg-white/5 border border-white/10 focus:outline-none focus:border-white/25"
                  />

                  <div className="text-xs text-white/60 mb-2">
                    Showing {filteredPolicies.length} of {policies.length} policies
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1">
                    {filteredPolicies.map((policy) => {
                      const isOn = enabled[policy.id];
                      const fiscalVal = scenario === 'best' ? policy.bestCaseGBP : policy.worstCaseGBP;
                      const fiscalColor2 = fiscalVal >= 0 ? '#22c55e' : '#ef4444';
                      return (
                        <button
                          key={policy.id}
                          onClick={() => togglePolicy(policy.id)}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all"
                          style={{
                            background: isOn ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                            border: isOn ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.04)',
                            opacity: isOn ? 1 : 0.5,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{policy.icon}</span>
                            <span className="text-sm text-white/80 truncate max-w-[170px]">{policy.title}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-sm font-mono" style={{ color: fiscalColor2 }}>
                              {fiscalVal >= 0 ? '+' : ''}{formatGBP(fiscalVal)}
                            </span>
                            {isOn
                              ? <ToggleRight size={16} style={{ color: '#22c55e' }} />
                              : <ToggleLeft size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                            }
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {filteredPolicies.length === 0 && (
                    <div className="text-sm text-white/45 mt-3">
                      No policies match your search.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
