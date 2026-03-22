/*
 * PolicyCard — The Green Ledger
 * Design: Dark card with risk dial, category badge, and hover lift
 */

import { motion } from 'framer-motion';
import { Policy, riskColors, riskLabels, categoryColors } from '@/lib/policyData';

interface PolicyCardProps {
  policy: Policy;
  onClick: () => void;
  index: number;
}

function RiskDial({ level, score }: { level: string; score: number }) {
  const color = riskColors[level as keyof typeof riskColors];
  const avgScore = score;
  const circumference = 2 * Math.PI * 16;
  const strokeDash = (avgScore / 10) * circumference;

  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <svg width="40" height="40" viewBox="0 0 40 40" className="rotate-[-90deg]">
        <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <circle
          cx="20" cy="20" r="16"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${strokeDash} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-mono font-bold" style={{ color }}>{avgScore}</span>
      </div>
    </div>
  );
}

export default function PolicyCard({ policy, onClick, index }: PolicyCardProps) {
  const riskColor = riskColors[policy.riskLevel];
  const categoryColor = categoryColors[policy.category] || '#d4a017';
  const avgRisk = Math.round((policy.riskScore.fiscal + policy.riskScore.economic + policy.riskScore.social) / 3);

  return (
    <motion.div
      className="policy-card rounded-xl p-4 cursor-pointer group"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
    >
      {/* Top row: icon + number + risk dial */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
            style={{ background: `${categoryColor}15`, border: `1px solid ${categoryColor}30` }}
          >
            {policy.icon}
          </div>
          <span className="text-xs font-tech text-white/55">
            {String(policy.number).padStart(2, '0')}
          </span>
        </div>
        <RiskDial level={policy.riskLevel} score={avgRisk} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-1.5 leading-tight group-hover:text-white/90 transition-colors">
        {policy.title}
      </h3>

      {/* Category */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs font-tech px-1.5 py-0.5 rounded"
          style={{ color: categoryColor, background: `${categoryColor}15` }}
        >
          {policy.category}
        </span>
      </div>

      {/* Summary snippet */}
      <p className="text-sm text-white/62 leading-relaxed line-clamp-2 mb-2">
        {policy.summary.split('.')[0]}.
      </p>

      {/* Headline stat preview */}
      <div className="mb-3 px-2.5 py-2 rounded" style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.12)' }}>
        <div className="font-mono font-bold text-base leading-tight" style={{ color: '#d4a017' }}>{policy.headlineStat.value}</div>
        <div className="text-xs text-white/55 leading-snug mt-0.5">{policy.headlineStat.label}</div>
      </div>

      {/* Bottom: risk label + explore */}
      <div className="flex items-center justify-between">
        <span
          className="text-sm font-tech"
          style={{ color: riskColor }}
        >
          {riskLabels[policy.riskLevel]}
        </span>
        <span className="text-sm text-white/60 group-hover:text-white/70 transition-colors font-tech">
          Explore →
        </span>
      </div>

      {/* Risk indicator line at bottom */}
      <div className="mt-3 h-0.5 rounded-full overflow-hidden bg-white/5">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: riskColor }}
          initial={{ width: 0 }}
          animate={{ width: `${avgRisk * 10}%` }}
          transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
        />
      </div>
    </motion.div>
  );
}
