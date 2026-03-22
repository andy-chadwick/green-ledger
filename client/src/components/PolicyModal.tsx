/*
 * PolicyModal — The Green Ledger
 * Design: Parliamentary Dispatch Box aesthetic
 * Full-screen modal with 4 tabs: Promise / Evidence / Debate / Verdict
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronUp, ChevronDown as ChevronDownIcon, AlertTriangle, CheckCircle, MessageSquare, Gavel, Share2, Check } from 'lucide-react';
import { Policy, riskColors, riskLabels, categoryColors } from '@/lib/policyData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { useState, useEffect } from 'react';

interface PolicyModalProps {
  policy: Policy | null;
  onClose: () => void;
}

const tabs = [
  { id: 'promise', label: 'The Promise', icon: CheckCircle },
  { id: 'evidence', label: 'The Evidence', icon: AlertTriangle },
  { id: 'debate', label: 'They Say / We Say', icon: MessageSquare },
  { id: 'verdict', label: 'The Verdict', icon: Gavel },
];

const RISK_TOOLTIPS: Record<string, string> = {
  'Fiscal Risk': 'How likely is this policy to cost more than projected, blow the budget, or fail to raise the revenue promised?',
  'Economic Risk': 'Could this policy damage growth, destroy jobs, drive capital flight, or reduce competitiveness?',
  'Social Risk': 'Could this policy harm national security, reduce housing supply, worsen inequality, or undermine public services — even if that\'s the opposite of its intent?',
};

function RiskBar({ label, value }: { label: string; value: number }) {
  const [showTip, setShowTip] = useState(false);
  const color = value >= 8 ? '#ef4444' : value >= 5 ? '#f59e0b' : '#22c55e';
  const tooltip = RISK_TOOLTIPS[label];
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span
          className="text-xs font-medium text-white/60 uppercase tracking-wider cursor-help relative"
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onClick={() => setShowTip(prev => !prev)}
        >
          {label} <span className="text-white/30 ml-0.5">ⓘ</span>
          {showTip && tooltip && (
            <span className="absolute left-0 top-full mt-1 z-10 w-64 p-2 rounded text-xs text-white/80 font-normal normal-case tracking-normal leading-relaxed" style={{ background: '#1a1c22', border: '1px solid rgba(255,255,255,0.12)' }}>
              {tooltip}
            </span>
          )}
        </span>
        <span className="text-xs font-mono font-semibold" style={{ color }}>{value}/10</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label, unit }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#121418] border border-white/10 rounded px-3 py-2 text-xs">
        <p className="text-white/60 mb-1">{label}</p>
        <p className="font-mono font-semibold text-[#d4a017]">
          {payload[0].value > 0 ? '+' : ''}{payload[0].value.toLocaleString()} {unit}
        </p>
      </div>
    );
  }
  return null;
}

export default function PolicyModal({ policy, onClose }: PolicyModalProps) {
  const [activeTab, setActiveTab] = useState('promise');
  const [copied, setCopied] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (policy) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [policy]);

  if (!policy) return null;

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?policy=${policy.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `The Green Ledger: ${policy.title}`, url });
        return;
      } catch { /* user cancelled or not supported */ }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const riskColor = riskColors[policy.riskLevel];
  const categoryColor = categoryColors[policy.category] || '#d4a017';

  const hasNegativeValues = policy.chartData.data.some(d => d.value < 0);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] overflow-hidden rounded-none sm:rounded-xl flex flex-col"
          style={{ background: '#121418', border: '1px solid rgba(255,255,255,0.08)' }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex-shrink-0 px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl flex-shrink-0"
                  style={{ background: `${categoryColor}20`, border: `1px solid ${categoryColor}40` }}
                >
                  {policy.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest" style={{ color: categoryColor }}>
                      Policy {String(policy.number).padStart(2, '0')} — {policy.category}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight" style={{ fontFamily: 'Libre Baskerville, serif' }}>
                    {policy.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="text-xs font-mono font-semibold px-2 py-0.5 rounded"
                      style={{ color: riskColor, background: `${riskColor}20`, border: `1px solid ${riskColor}40` }}
                    >
                      {riskLabels[policy.riskLevel]}
                    </span>
                    {policy.greenClaimAmount && (
                      <span className="hidden sm:inline text-xs font-mono text-white/60">
                        Green claim: {policy.greenClaimAmount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleShare}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors relative"
                  title="Share this policy"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
                  {copied && (
                    <span className="absolute -bottom-7 right-0 text-xs font-mono text-green-400 whitespace-nowrap bg-[#121418] px-2 py-0.5 rounded border border-green-400/20">
                      Link copied
                    </span>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mt-5 overflow-x-auto pb-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all"
                    style={{
                      background: isActive ? `${categoryColor}20` : 'transparent',
                      color: isActive ? categoryColor : 'rgba(255,255,255,0.6)',
                      border: isActive ? `1px solid ${categoryColor}40` : '1px solid transparent',
                    }}
                  >
                    <Icon size={12} className="hidden sm:block" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
            <AnimatePresence mode="wait">
              {activeTab === 'promise' && (
                <motion.div
                  key="promise"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Green Party Claim */}
                  <div className="mb-6 p-3 sm:p-4 rounded-lg" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="case-study-stamp">Green Party Position</span>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed italic">"{policy.greenClaim}"</p>
                    {policy.manifestoRef && (
                      <a
                        href={policy.manifestoRef.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-xs font-mono px-2 py-1 rounded transition-colors"
                        style={{ color: 'rgba(212,160,23,0.8)', background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.25)' }}
                      >
                        Manifesto: {policy.manifestoRef.section}{policy.manifestoRef.page ? `, ${policy.manifestoRef.page}` : ''} ↗
                      </a>
                    )}
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed mb-6">{policy.summary}</p>

                  {/* Positives */}
                  <div>
                    <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">What the Green Party gets right</h3>
                    <div className="space-y-2">
                      {policy.positives.map((positive, i) => (
                        <div key={i} className="flex items-start gap-3 p-2.5 sm:p-3 rounded-lg they-say">
                          <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                          <p className="text-white/75 text-sm leading-relaxed">{positive}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'evidence' && (
                <motion.div
                  key="evidence"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Counter argument */}
                  <div className="mb-6 p-4 rounded-lg we-say">
                    <p className="text-white/80 text-sm leading-relaxed">{policy.counterArgument}</p>
                  </div>

                  {/* Key Stats */}
                  <div className="mb-3">
                    <h3 className="text-sm font-tech text-white/70 mb-1">Evidence Snapshot</h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      These are real-world outcomes from comparable countries or official UK fiscal estimates.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {policy.keyStats.map((stat, i) => {
                      const dirColor = stat.direction === 'positive' ? '#22c55e' : stat.direction === 'negative' ? '#ef4444' : '#d4a017';
                      const DirIcon = stat.direction === 'positive' ? ChevronUp : stat.direction === 'negative' ? ChevronDownIcon : null;
                      return (
                        <div key={i} className="p-2.5 sm:p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="data-callout" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.55rem)' }}>{stat.value}</span>
                            {DirIcon && <DirIcon size={16} style={{ color: dirColor }} />}
                          </div>
                          <div className="text-sm text-white/78 leading-snug font-medium">{stat.label}</div>
                          <div className="text-sm text-white/62 mt-1 leading-snug">
                            <span className="text-white/80">What this means:</span> {stat.context}
                          </div>
                          {stat.comparison && (
                            <div className="text-xs mt-2 leading-snug font-mono" style={{ color: '#d4a017' }}>
                              ↳ Put it this way: {stat.comparison}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Chart */}
                  <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <h3 className="text-xs font-mono text-white/60 uppercase tracking-wider mb-4">{policy.chartData.title}</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={policy.chartData.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                        <XAxis
                          dataKey="label"
                          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                          angle={-30}
                          textAnchor="end"
                          height={80}
                          interval={0}
                        />
                        <YAxis
                          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => v.toLocaleString()}
                        />
                        {hasNegativeValues && <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />}
                        <Tooltip content={<CustomTooltip unit={policy.chartData.unit} />} />
                        <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                          {policy.chartData.data.map((entry, index) => (
                            <Cell key={index} fill={entry.color || '#d4a017'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-white/55 mt-2 font-mono">Source: {policy.chartData.source}</p>
                  </div>

                  {/* Case Studies */}
                  {policy.caseStudies.map((cs, i) => (
                    <div key={i} className="mb-4 p-3 sm:p-4 rounded-lg" style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.2)' }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{cs.flag}</span>
                        <div>
                          <span className="case-study-stamp">Case Study: {cs.country} {cs.year}</span>
                          <h4 className="text-sm font-bold text-white mt-1">{cs.title}</h4>
                        </div>
                      </div>
                      <p className="text-white/72 text-sm leading-relaxed mb-2">{cs.description}</p>
                      {cs.chartData && (
                        <div className="my-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <h4 className="text-xs font-mono text-white/55 uppercase tracking-wider mb-3">{cs.chartData.title}</h4>
                          <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={cs.chartData.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                              <XAxis
                                dataKey="label"
                                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                              />
                              <YAxis
                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <Tooltip content={<CustomTooltip unit={cs.chartData.unit} />} />
                              <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                                {cs.chartData.data.map((entry, idx) => (
                                  <Cell key={idx} fill={entry.color || '#d4a017'} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                          <p className="text-xs text-white/45 mt-1 font-mono">Source: {cs.chartData.source}</p>
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <ChevronRight size={12} className="flex-shrink-0 mt-0.5" style={{ color: '#d4a017' }} />
                        <p className="text-sm leading-relaxed font-semibold" style={{ color: '#d4a017' }}>{cs.outcome}</p>
                      </div>
                      <div className="mt-3 pt-3" style={{ borderTop: '1px dashed rgba(212,160,23,0.2)' }}>
                        <div className="text-xs font-tech text-white/55 mb-2">Sources</div>
                        <div className="flex flex-wrap gap-2">
                          {(cs.sources || policy.sources).map((source, sourceIndex) => (
                            <a
                              key={`${cs.country}-${sourceIndex}`}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono px-2 py-1 rounded transition-colors"
                              style={{ color: 'rgba(212,160,23,0.8)', background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.25)' }}
                            >
                              {source.label} ↗
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'debate' && (
                <motion.div
                  key="debate"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-white/60 text-xs font-mono uppercase tracking-wider mb-5">
                    Common arguments from Green Party supporters — and evidence-based responses
                  </p>
                  <div className="space-y-5">
                    {policy.debate.map((point, i) => (
                      <div key={i} className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="p-3 sm:p-4 they-say">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(34,197,94,0.2)', color: '#22c55e' }}>
                              G
                            </div>
                            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: '#22c55e' }}>They Say</span>
                          </div>
                          <p className="text-white/75 text-sm leading-relaxed italic">"{point.theySay}"</p>
                        </div>
                        <div className="p-3 sm:p-4 we-say">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444' }}>
                              R
                            </div>
                            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: '#ef4444' }}>We Say</span>
                          </div>
                          <p className="text-white/80 text-sm leading-relaxed">{point.weSay}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'verdict' && (
                <motion.div
                  key="verdict"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Verdict text */}
                  <div className="mb-6 p-3 sm:p-5 rounded-lg" style={{ background: `${riskColor}10`, border: `1px solid ${riskColor}30` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Gavel size={14} style={{ color: riskColor }} />
                      <span className="text-xs font-mono uppercase tracking-wider" style={{ color: riskColor }}>Our Assessment</span>
                    </div>
                    <p className="text-white/85 text-sm leading-relaxed">{policy.verdict}</p>
                  </div>

                  {/* Risk Scores */}
                  <div className="mb-6">
                    <h3 className="text-xs font-mono text-white/60 uppercase tracking-wider mb-4">Risk Score Breakdown</h3>
                    <RiskBar label="Fiscal Risk" value={policy.riskScore.fiscal} />
                    <RiskBar label="Economic Risk" value={policy.riskScore.economic} />
                    <RiskBar label="Social Risk" value={policy.riskScore.social} />
                  </div>

                  {/* Impact summary */}
                  <div className="mb-3">
                    <h3 className="text-xs font-mono text-white/60 uppercase tracking-wider mb-1">Net Impact Assessment</h3>
                    <p className="text-xs text-white/45 leading-relaxed">Estimated real-world outcome factoring in both intent and evidence. Scale: −5 (much worse) to +5 (much better).</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'National Security', value: policy.securityImpact, reason: policy.securityReason, icon: '🛡' },
                      { label: 'Inequality', value: policy.inequalityImpact, reason: policy.inequalityReason, icon: '⚖' },
                      { label: 'Public Services', value: policy.servicesImpact, reason: policy.servicesReason, icon: '🏛' },
                    ].map((item) => {
                      const isPositive = item.value > 0;
                      const isNeutral = item.value === 0;
                      const color = isNeutral ? 'rgba(255,255,255,0.3)' : isPositive ? '#22c55e' : '#ef4444';
                      const verdict = isNeutral ? 'No change' : isPositive ? 'Improves' : 'Worsens';
                      return (
                        <div key={item.label} className="flex items-start gap-3 p-2.5 sm:p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div className="flex flex-col items-center flex-shrink-0 w-12 sm:w-14">
                            <div className="text-lg">{item.icon}</div>
                            <div className="font-mono font-bold text-base" style={{ color }}>
                              {item.value > 0 ? '+' : ''}{item.value}
                            </div>
                            <div className="text-xs font-mono" style={{ color }}>{verdict}</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white/75 font-medium">{item.label}</div>
                            <div className="text-xs text-white/50 mt-0.5 leading-relaxed">{item.reason}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
