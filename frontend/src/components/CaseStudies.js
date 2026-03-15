import { useDemo } from '../context/DemoContext';
import { CheckCircle, MapPin, Users, ArrowUpRight } from 'lucide-react';

export default function CaseStudies() {
  const { industryConfig, companyName } = useDemo();

  if (!industryConfig) return null;

  const accent = industryConfig.color;
  const cases = industryConfig.caseStudies || [];
  const painPoints = industryConfig.painPoints || [];

  return (
    <div className="space-y-8" data-testid="case-studies">
      {/* Header */}
      <div>
        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Social Proof</p>
        <h2 className="text-2xl font-bold text-white font-display">
          Results from {industryConfig.name} Businesses Like {companyName || 'Yours'}
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Projected outcomes based on industry benchmarks and early client data
        </p>
      </div>

      {/* Pain Points */}
      <div className="space-y-3">
        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">Industry Pain Points</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {painPoints.map((pain, i) => (
            <div
              key={i}
              className="glass-panel p-4 space-y-2 animate-fade-up"
              style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${i * 0.08}s` }}
              data-testid={`pain-point-${i}`}
            >
              <p className="text-2xl font-bold text-rose-400 font-mono">{pain.stat}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{pain.description}</p>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{pain.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Cards */}
      <div className="space-y-3">
        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">Case Studies</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((cs, i) => (
            <div
              key={i}
              className="glass-panel p-6 space-y-4 animate-fade-up group"
              style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${0.2 + i * 0.1}s` }}
              data-testid={`case-study-${i}`}
            >
              {/* Company Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-semibold text-white">{cs.company}</h3>
                  <div className="px-2 py-0.5 rounded-full text-[10px] font-mono border" style={{ borderColor: `${accent}40`, color: accent }}>
                    Verified
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {cs.location}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {cs.employees} employees</span>
                </div>
              </div>

              {/* Result Headline */}
              <div className="rounded-lg p-3" style={{ backgroundColor: `${accent}08`, border: `1px solid ${accent}15` }}>
                <p className="text-sm font-semibold" style={{ color: accent }}>
                  "{cs.result}"
                </p>
              </div>

              {/* Metrics */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300">{cs.savings}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{cs.detail}</p>
              </div>

              {/* Before/After Mini */}
              {cs.metrics && (
                <div className="flex items-center gap-3 pt-2 border-t border-white/[0.04]">
                  <div>
                    <p className="text-[10px] text-slate-600 uppercase">Close Rate Before</p>
                    <p className="text-sm font-bold text-rose-400 font-mono">{cs.metrics.closeBefore}%</p>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-600" />
                  <div>
                    <p className="text-[10px] text-slate-600 uppercase">Close Rate After</p>
                    <p className="text-sm font-bold font-mono" style={{ color: accent }}>{cs.metrics.closeAfter}%</p>
                  </div>
                  <div className="ml-auto">
                    <p className="text-[10px] text-slate-600 uppercase">Timeline</p>
                    <p className="text-sm font-bold text-slate-300 font-mono">{cs.metrics.days}d</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof Bar */}
      <div className="glass-panel p-4 text-center">
        <p className="text-xs text-slate-500 font-mono">
          Trusted by businesses across <span className="text-slate-300">10 industries</span> — Results based on industry benchmarks and projected outcomes
        </p>
      </div>
    </div>
  );
}
