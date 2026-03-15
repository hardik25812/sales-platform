import { useState, useEffect } from 'react';
import { useDemo } from '../context/DemoContext';
import { CurrencyCounter, AnimatedCounter, PercentCounter } from './AnimatedCounter';
import {
  PhoneIncoming, CalendarCheck, FileText, Star, Truck, Shield, MessageCircle,
  CalendarPlus, Stethoscope, HeartPulse, Award, Crown, AlertTriangle, Wrench,
  MapPin, Smile, ClipboardList, RotateCcw, ShieldCheck, Zap, Phone, RefreshCw,
  TrendingUp, Users, Target, Car, HardHat, MessageSquare, Scale, Building2,
  Heart, FileCheck, DoorOpen, TreePine, Calculator, CloudRain, Waves, Palette,
  Sun, Filter, Bell, Key, CheckCircle, UserMinus, Activity
} from 'lucide-react';

const ICON_MAP = {
  PhoneIncoming, CalendarCheck, FileText, Star, Truck, Shield, MessageCircle,
  CalendarPlus, Stethoscope, HeartPulse, Award, Crown, AlertTriangle, Wrench,
  MapPin, Smile, ClipboardList, RotateCcw, ShieldCheck, Zap, Phone, RefreshCw,
  TrendingUp, Users, Target, Car, HardHat, MessageSquare, Scale, Building2,
  Heart, FileCheck, DoorOpen, TreePine, Calculator, CloudRain, Waves, Palette,
  Sun, Filter, Bell, Key, CheckCircle, UserMinus, Activity
};

function LiveFeedItem({ item, accent }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
      <div className="live-pulse mt-1.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-300 truncate">{item.text}</p>
        <p className="text-[10px] text-slate-600 font-mono mt-0.5">{item.time}</p>
      </div>
    </div>
  );
}

function AgentCard({ agent, accent, index }) {
  const Icon = ICON_MAP[agent.icon] || Activity;
  return (
    <div
      className={`glass-panel glass-panel-hover p-4 space-y-3 animate-fade-up`}
      style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${0.05 + index * 0.06}s` }}
      data-testid={`agent-card-${index}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}15`, color: accent }}>
            <Icon size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">{agent.name}</p>
            <p className="text-[10px] text-slate-500 font-mono">{agent.dept}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-emerald-400 font-mono">Active</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{agent.description}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-bold font-mono" style={{ color: accent }}>{agent.metric.value}</span>
        <span className="text-[10px] text-slate-500 font-mono">{agent.metric.unit === 'stars' ? '★' : agent.metric.unit}</span>
        <span className="text-[10px] text-slate-600 ml-auto">{agent.metric.label}</span>
      </div>
    </div>
  );
}

export default function CommandCenter() {
  const { industryConfig, metrics, roi, companyName } = useDemo();
  const [feedIndex, setFeedIndex] = useState(0);

  // Cycle through live feed
  useEffect(() => {
    if (!industryConfig?.liveFeedExamples) return;
    const interval = setInterval(() => {
      setFeedIndex(prev => (prev + 1) % industryConfig.liveFeedExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [industryConfig]);

  if (!industryConfig || !roi) return null;

  const accent = industryConfig.color;
  const agents = industryConfig.agents || [];
  const feed = industryConfig.liveFeedExamples || [];

  // Pipeline funnel data
  const pipelineStages = [
    { name: 'Leads', value: metrics.monthlyLeads, pct: 100 },
    { name: 'Contacted', value: Math.round(metrics.monthlyLeads * 0.92), pct: 92 },
    { name: 'Qualified', value: Math.round(metrics.monthlyLeads * 0.65), pct: 65 },
    { name: 'Proposal', value: Math.round(metrics.monthlyLeads * 0.40), pct: 40 },
    { name: 'Closed', value: Math.round(metrics.monthlyLeads * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
  ];

  return (
    <div className="space-y-6" data-testid="command-center">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Command Center</p>
          <h2 className="text-2xl font-bold text-white font-display">
            {companyName ? `${companyName}'s` : 'Your'} AI Workforce
          </h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400">{agents.length} Agents Active</span>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Monthly Revenue Potential', value: roi.gains.totalMonthlyGain, type: 'currency', color: 'text-emerald-400', icon: TrendingUp },
          { label: 'Projected Close Rate', value: roi.projectedCloseRate * 100, type: 'percent', color: 'text-blue-400', icon: Target },
          { label: 'Response Time', value: null, display: roi.projectedResponseTime, color: 'text-cyan-400', icon: Zap },
          { label: 'FTE Savings', value: roi.fteEquivalent, type: 'number', suffix: ' FTE', color: 'text-violet-400', icon: Users },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel p-4 animate-fade-up" style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-center gap-1.5 mb-2">
                <Icon size={14} className={stat.color} />
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className={`text-xl md:text-2xl font-bold font-mono ${stat.color}`}>
                {stat.display ? stat.display :
                  stat.type === 'currency' ? <><span className="text-sm">$</span><AnimatedCounter value={stat.value} /></> :
                  stat.type === 'percent' ? <><AnimatedCounter value={stat.value} /><span className="text-sm">%</span></> :
                  <><AnimatedCounter value={stat.value} decimals={1} /><span className="text-sm">{stat.suffix}</span></>
                }
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Agents + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Agent Grid */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">AI Agent Team</p>
            <p className="text-[10px] text-slate-600 font-mono">{industryConfig.name} Configuration</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {agents.map((agent, i) => (
              <AgentCard key={i} agent={agent} accent={accent} index={i} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Pipeline Funnel */}
          <div className="glass-panel p-4">
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-4">Pipeline Funnel</p>
            <div className="space-y-2.5">
              {pipelineStages.map((stage, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">{stage.name}</span>
                    <span className="font-mono text-slate-300">{stage.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${stage.pct}%`,
                        background: `linear-gradient(90deg, ${accent}80, ${accent})`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="glass-panel p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">Live Feed</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-mono">Live</span>
              </div>
            </div>
            <div className="space-y-0">
              {feed.map((item, i) => (
                <LiveFeedItem key={i} item={item} accent={accent} />
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="glass-panel p-4">
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-3">Integrations</p>
            <div className="flex flex-wrap gap-1.5">
              {(industryConfig.integrations || []).map((int, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                  {int}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
