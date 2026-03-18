import { useEffect, useCallback } from 'react';
import { useDemo } from '../context/DemoContext';
import { calculateAgentValue } from '../data/departments';
import { formatCurrency } from '../lib/formatters';
import { X, ArrowRight, Phone } from 'lucide-react';

const COLOR_MAP = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', accent: '#3b82f6' },
  green: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', accent: '#10b981' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', accent: '#8b5cf6' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', accent: '#f59e0b' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', accent: '#06b6d4' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', accent: '#f43f5e' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-400', accent: '#ec4899' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', accent: '#a855f7' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', accent: '#ef4444' },
};

export default function AgentDetailPanel({ agent, onClose, allAgents }) {
  const { metrics, industryConfig } = useDemo();

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!agent) return null;

  const colors = COLOR_MAP[agent.color] || COLOR_MAP.blue;
  const agentValue = calculateAgentValue(agent, metrics);
  const accent = industryConfig?.color || colors.accent;

  // Find connected agent names
  const connectedAgents = (agent.connectsTo || []).map(id => {
    const found = (allAgents || []).find(a => a.id === id);
    return found ? found.name : id;
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 z-[70] h-full w-full max-w-[520px] overflow-y-auto"
        style={{ animation: 'slideInRight 0.3s ease-out' }}
      >
        <div className="min-h-full glass-panel border-l border-white/[0.06] p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/[0.06] transition-colors text-slate-400 hover:text-white z-10"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-8 pr-8">
            <div className="text-3xl mb-3">{agent.icon}</div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{agent.name}</h2>
            <p className="text-sm text-slate-400 mb-2">{agent.tagline}</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.06]">
                {agent.departmentName || agent.role}
              </span>
              <span className="text-[10px] font-mono text-slate-600">·</span>
              <span className="text-[10px] font-mono text-slate-500">{agent.role}</span>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {(agent.kpis || []).map((kpi, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">{kpi.label}</div>
                <div className="text-lg font-bold font-mono" style={{ color: accent }}>
                  {kpi.dynamic ? (metrics[kpi.key] || 0).toLocaleString() : kpi.value}
                </div>
              </div>
            ))}
          </div>

          {/* What It Does */}
          <Section title="WHAT IT DOES">
            <div className="space-y-2">
              {(agent.outcomes || []).map((outcome, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✅</span>
                  <span className="text-sm text-slate-300">{outcome}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* How It Works */}
          {agent.workflow && agent.workflow.length > 0 && (
            <Section title="HOW IT WORKS">
              <div className="space-y-0">
                {agent.workflow.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    {/* Connector line */}
                    {i < agent.workflow.length - 1 && (
                      <div className="absolute left-[15px] top-[30px] bottom-0 w-px bg-white/[0.06]" />
                    )}
                    <div className="w-[30px] h-[30px] rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 text-sm z-10">
                      {step.icon}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-semibold text-white">{step.step}</span>
                        <span className="text-[10px] font-mono text-slate-600">{step.duration}</span>
                      </div>
                      <span className="text-xs text-slate-400">{step.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Connects With */}
          {agent.connectsDescription && agent.connectsDescription.length > 0 && (
            <Section title="CONNECTS WITH">
              <div className="space-y-2.5">
                {agent.connectsDescription.map((desc, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <ArrowRight size={14} className="text-slate-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-300">{desc}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Sample Output */}
          {agent.sampleOutputs && Object.keys(agent.sampleOutputs).length > 0 && (
            <Section title="SAMPLE OUTPUT">
              <div className="space-y-3">
                {Object.entries(agent.sampleOutputs).map(([key, value], i) => {
                  const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                  return (
                    <div key={i}>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                        {label}
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                        {value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* Your Numbers */}
          {agentValue > 0 && (
            <Section title="YOUR NUMBERS">
              <div className="p-4 rounded-xl border-2 bg-gradient-to-br from-emerald-500/5 to-transparent" style={{ borderColor: `${accent}30` }}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold font-mono" style={{ color: accent }}>
                    {formatCurrency(agentValue)}
                  </span>
                  <span className="text-sm text-slate-500">/mo</span>
                </div>
                <p className="text-xs text-slate-400">{agent.valueLabel}</p>
              </div>
            </Section>
          )}

          {/* Load */}
          {agent.loadPercent && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Current Load</span>
                <span className="text-[10px] font-mono text-slate-400">{agent.loadPercent}%</span>
              </div>
              <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${agent.loadPercent}%`, backgroundColor: accent }}
                />
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="space-y-3 pt-4 border-t border-white/[0.06]">
            <button
              className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${accent}, ${industryConfig?.colorSecondary || accent})` }}
            >
              <Phone size={16} />
              Call Me Now — Live Demo
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[10px] font-mono text-slate-500 tracking-widest">{title}</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>
      {children}
    </div>
  );
}
