/*
 * Home — The Green Ledger
 * Design: Parliamentary Dispatch Box meets data journalism
 * Sections: Hero → Scoreboard → Policy Grid → Calculator
 * Typography: Libre Baskerville (headlines) + Source Sans 3 (body) + JetBrains Mono (data)
 */

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Scale, AlertTriangle, TrendingDown, Shield, BookOpen } from 'lucide-react';
import { policies, riskColors, categoryColors, ANALYSIS_LAST_UPDATED, MANIFESTO_VERSION } from '@/lib/policyData';
import PolicyCard from '@/components/PolicyCard';
import PolicyModal from '@/components/PolicyModal';
import CostCalculator from '@/components/CostCalculator';
import type { Policy } from '@/lib/policyData';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/108629700/F3tBCxdieu2HTbNrLpTbRT/hero-uk-map-9oy3guursJKmf6jVpx3ZwP.webp';

const CATEGORIES = ['All', ...Array.from(new Set(policies.map(p => p.category)))];
const RISK_FILTERS = ['All', 'critical', 'high', 'medium', 'low'];

function StatCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl mb-1">{icon}</div>
      <div className="data-callout text-2xl mb-1">{value}</div>
      <div className="text-sm text-white/65 font-tech leading-tight">{label}</div>
    </div>
  );
}

export default function Home() {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [aboutOpen, setAboutOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [100, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.05]);

  // Auto-open policy from URL params (e.g. ?policy=wealth-tax)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const policyId = params.get('policy');
    if (policyId) {
      const found = policies.find(p => p.id === policyId);
      if (found) {
        setSelectedPolicy(found);
        // Scroll to grid after a short delay
        setTimeout(() => {
          document.getElementById('policy-grid')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, []);

  const filteredPolicies = policies.filter(p => {
    const catMatch = categoryFilter === 'All' || p.category === categoryFilter;
    const riskMatch = riskFilter === 'All' || p.riskLevel === riskFilter;
    return catMatch && riskMatch;
  });

  const criticalCount = policies.filter(p => p.riskLevel === 'critical').length;
  const highCount = policies.filter(p => p.riskLevel === 'high').length;
  const worstCaseTotal = policies.reduce((s, p) => s + p.worstCaseGBP, 0);

  const scrollToGrid = () => {
    document.getElementById('policy-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#0c0e12' }}>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] md:min-h-[100svh] lg:min-h-[105svh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background image */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale }}
        >
          <img
            src={HERO_IMAGE}
            alt="UK map with policy data"
            className="w-full h-full min-w-full object-cover object-center scale-110"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(12,14,18,0.55) 0%, rgba(12,14,18,0.75) 60%, rgba(12,14,18,1) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 44%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.75) 100%)' }} />
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity }}
        >
          <div className="rounded-2xl px-4 py-5 sm:px-8 sm:py-9 border border-white/10 bg-black/25 backdrop-blur-[2px]">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #d4a017)' }} />
              <span className="text-xs sm:text-base font-tech text-white/75">
                Evidence-Based Policy Analysis
              </span>
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
            </motion.div>

            {/* Brand name (visual headline) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              aria-hidden="true"
            >
              The Green Ledger
            </motion.div>

            {/* SEO H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl md:text-2xl text-white/85 mb-3 leading-relaxed max-w-3xl mx-auto"
            >
              Green Party Manifesto Analysed: 14 Policies Fact-Checked
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-white/70 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              What they promise, what the international evidence says, and what it might cost Britain.
              A fair, data-driven analysis of both benefits and trade-offs.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-12 mb-6 sm:mb-10"
            >
              <StatCard value="14" label="Policies Analysed" icon="📋" />
              <div className="hidden sm:block h-12 w-px bg-white/20" />
              <StatCard value={`${criticalCount + highCount}`} label="High/Critical Risk" icon="⚠️" />
              <div className="hidden sm:block h-12 w-px bg-white/20" />
              <StatCard value={`£${Math.abs(worstCaseTotal / 1_000_000_000).toFixed(0)}bn`} label="Worst Case Cost" icon="💸" />
            </motion.div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              onClick={scrollToGrid}
              className="flex items-center gap-2 mx-auto px-5 py-3 sm:px-7 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition-all hover:scale-105"
              style={{ background: '#d4a017', color: '#0c0e12' }}
            >
              Explore the Policies
              <ChevronDown size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={20} className="text-white/20" />
        </motion.div>
      </section>

      {/* ── DISCLAIMER BANNER ── */}
      <div className="py-4 px-4" style={{ background: 'rgba(212,160,23,0.08)', borderTop: '1px solid rgba(212,160,23,0.15)', borderBottom: '1px solid rgba(212,160,23,0.15)' }}>
        <div className="max-w-5xl mx-auto flex items-start gap-3">
          <Scale size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#d4a017' }} />
          <p className="text-sm text-white/75 leading-relaxed">
            <span className="font-semibold text-white/70">This is a balanced analysis.</span> Every policy section includes both what the Green Party gets right and where the evidence raises concerns. We use data from the IFS, ONS, NIESR, SIPRI, NBER, and other credible sources. All sources are linked. We encourage you to read them.
          </p>
        </div>
      </div>

      {/* ── OVERVIEW CARDS ── */}
      <section className="py-8 sm:py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: <Scale size={20} style={{ color: '#22c55e' }} />,
                title: 'What They Get Right',
                desc: 'Every policy analysis begins with a fair assessment of the Green Party\'s genuine strengths — the problems they correctly identify and the goals worth pursuing.',
                color: '#22c55e',
              },
              {
                icon: <AlertTriangle size={20} style={{ color: '#f59e0b' }} />,
                title: 'What the Evidence Says',
                desc: 'International case studies, peer-reviewed research, and data from Norway, France, Germany, Scotland, and Finland test each policy against real-world outcomes.',
                color: '#f59e0b',
              },
              {
                icon: <TrendingDown size={20} style={{ color: '#ef4444' }} />,
                title: 'The Fiscal Reality',
                desc: 'The IFS estimates the full Green Party programme would increase borrowing by £80bn per year. Use the calculator below to model best and worst case scenarios.',
                color: '#ef4444',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="p-5 rounded-xl"
                style={{ background: `${card.color}08`, border: `1px solid ${card.color}20` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-3">{card.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setAboutOpen(prev => !prev)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
            >
              <img
                src="/andy-chadwick.jpeg"
                alt="Andy Chadwick"
                className="w-11 h-11 rounded-full object-cover flex-shrink-0 border"
                style={{ borderColor: 'rgba(212,160,23,0.3)' }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">Andy Chadwick</div>
                <div className="text-xs sm:text-sm text-white/50">About me and why I built this</div>
              </div>
              <ChevronDown
                size={16}
                className="flex-shrink-0 text-white/40 transition-transform"
                style={{ transform: aboutOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            {aboutOpen && (
              <div className="px-5 pb-5">
                <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-mono text-white/45 mb-3 uppercase tracking-wider">Independent, not affiliated with any political party</p>
                  <div className="space-y-2 text-sm text-white/70 leading-relaxed">
                    <p>
                      I built this site because I'm tired of what political debate has become. The minute you post anything with actual data on TikTok or YouTube, the responses from both sides are the same: "you're stupid," "you're uneducated," and worse. Nobody quotes a source. Nobody engages with the numbers. It's just insults. And the parties do it to each other too, frankly. It's embarrassing. We've completely lost the ability to disagree with evidence instead of abuse.
                    </p>
                    <p>
                      I'm not happy with any of the major parties. They've all got something wrong. But the Green Party concerns me the most, because no matter which way I look at the evidence, many of their policies, however well-intentioned, live in a world that doesn't exist. A world without adversaries with nuclear weapons, without wealthy people who can relocate overnight, and without the fiscal constraints that bind every real government.
                    </p>
                    <p>
                      My background: University of Nottingham graduate, military family, and I've done just about every job going. Wetherspoons, Primark, restaurants, retail, corporate offices. From there I went on to start multiple businesses and I now run a software company with a fully remote team. I've had a student loan, worked minimum wage, and built something from nothing, so I know what policy feels like at every level, from the shop floor to the balance sheet.
                    </p>
                    <p className="text-white/55">
                      This site is my attempt to do what comment sections can't. Lay out the evidence calmly, acknowledge what the Green Party gets right, and show where the data says otherwise. Every source is linked. I'd genuinely love to be proven wrong.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── POLICY GRID ── */}
      <section id="policy-grid" className="py-8 px-4 pb-40">
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <div className="mb-8">
            <div className="gold-rule mb-4 w-16" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Green Party Policy Review
            </h2>
            <p className="text-base text-white/70">
              Click any policy to open the full analysis with evidence, international case studies, and a verdict.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-6">
            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className="px-3 py-1 rounded-full text-xs font-mono transition-all"
                  style={{
                    background: categoryFilter === cat
                      ? (cat === 'All' ? 'rgba(212,160,23,0.2)' : `${categoryColors[cat]}20`)
                      : 'rgba(255,255,255,0.05)',
                    color: categoryFilter === cat
                      ? (cat === 'All' ? '#d4a017' : categoryColors[cat])
                      : 'rgba(255,255,255,0.55)',
                    border: categoryFilter === cat
                      ? `1px solid ${cat === 'All' ? 'rgba(212,160,23,0.4)' : `${categoryColors[cat]}40`}`
                      : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Risk filter */}
            <div className="flex flex-wrap gap-1.5">
              {RISK_FILTERS.map(risk => (
                <button
                  key={risk}
                  onClick={() => setRiskFilter(risk)}
                  className="px-3 py-1 rounded-full text-xs font-mono transition-all capitalize"
                  style={{
                    background: riskFilter === risk
                      ? (risk === 'All' ? 'rgba(255,255,255,0.1)' : `${riskColors[risk as keyof typeof riskColors]}20`)
                      : 'rgba(255,255,255,0.03)',
                    color: riskFilter === risk
                      ? (risk === 'All' ? 'rgba(255,255,255,0.8)' : riskColors[risk as keyof typeof riskColors])
                      : 'rgba(255,255,255,0.55)',
                    border: riskFilter === risk
                      ? `1px solid ${risk === 'All' ? 'rgba(255,255,255,0.2)' : `${riskColors[risk as keyof typeof riskColors]}40`}`
                      : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {risk === 'All' ? 'All Risk' : risk}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm font-mono text-white/60 mb-4">
            Showing {filteredPolicies.length} of {policies.length} policies
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPolicies.map((policy, i) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                index={i}
                onClick={() => setSelectedPolicy(policy)}
              />
            ))}
          </div>

          {filteredPolicies.length === 0 && (
            <div className="text-center py-16 text-white/30 text-sm font-mono">
              No policies match the current filters.
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-4 pb-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={14} style={{ color: '#d4a017' }} />
                <span className="text-base font-bold text-white">The Green Ledger</span>
              </div>
              <p className="text-xs text-white/55">
                An independent, evidence-based analysis of the Green Party UK's 2024 manifesto.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={12} className="text-white/50" />
              <span className="text-xs text-white/50 font-mono">Sources: IFS, ONS, NIESR, SIPRI, NBER, Audit Scotland, DEFRA</span>
            </div>
          </div>
          <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <p className="text-xs text-white/55 font-mono">
              Analysis last updated: {new Date(ANALYSIS_LAST_UPDATED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · Based on the {MANIFESTO_VERSION}
            </p>
          </div>
        </div>
      </footer>

      {/* ── MODAL ── */}
      {selectedPolicy && (
        <PolicyModal
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      )}

      {/* ── CALCULATOR ── */}
      <CostCalculator />
    </div>
  );
}
