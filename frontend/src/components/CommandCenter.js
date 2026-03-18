import { useState, useEffect, useMemo } from 'react';
import { useDemo } from '../context/DemoContext';
import { CurrencyCounter, AnimatedCounter, PercentCounter } from './AnimatedCounter';
import { getDepartments, calculateAgentValue, calculateDepartmentValue, getAllAgents } from '../data/departments';
import { formatCurrency } from '../lib/formatters';
import AgentDetailPanel from './AgentDetailPanel';
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

function DeptAgentCard({ agent, accent, index, onClick, metrics }) {
  const agentValue = calculateAgentValue(agent, metrics);
  return (
    <button
      onClick={() => onClick(agent)}
      className="glass-panel glass-panel-hover p-4 space-y-3 animate-fade-up text-left w-full cursor-pointer group"
      style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${0.05 + index * 0.06}s` }}
      data-testid={`agent-card-${agent.id}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: `${accent}15` }}>
            {agent.icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight group-hover:text-white/90 transition-colors">{agent.name}</p>
            <p className="text-[10px] text-slate-500 font-mono">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-emerald-400 font-mono">Active</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{agent.tagline}</p>

      {/* KPIs row */}
      <div className="flex items-center gap-3">
        {(agent.kpis || []).slice(0, 2).map((kpi, i) => (
          <div key={i} className="flex items-baseline gap-1">
            <span className="text-xs font-bold font-mono" style={{ color: accent }}>
              {kpi.dynamic ? (metrics[kpi.key] || 0).toLocaleString() : kpi.value}
            </span>
            <span className="text-[9px] text-slate-600">{kpi.label}</span>
          </div>
        ))}
      </div>

      {/* Load bar */}
      {agent.loadPercent && (
        <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${agent.loadPercent}%`, backgroundColor: accent }}
          />
        </div>
      )}

      {/* Value */}
      {agentValue > 0 && (
        <div className="flex items-baseline justify-between pt-2 border-t border-white/[0.04]">
          <span className="text-[10px] text-slate-500">Worth</span>
          <span className="text-sm font-bold font-mono" style={{ color: accent }}>
            {formatCurrency(agentValue)}<span className="text-[10px] text-slate-500">/mo</span>
          </span>
        </div>
      )}
    </button>
  );
}

function DepartmentHeader({ dept, accent, metrics }) {
  const totalValue = calculateDepartmentValue(dept, metrics);
  const agentCount = dept.agents.length;

  return (
    <div className={`glass-panel p-4 mb-3 ${dept.isNicheSpecific ? 'border-l-2' : ''}`} style={dept.isNicheSpecific ? { borderLeftColor: accent } : {}}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">{dept.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">{dept.name}</h3>
              {dept.isNicheSpecific && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border" style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}10` }}>
                  {dept.nicheLabel}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">{dept.description}</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-[10px] text-slate-500 font-mono">
            {agentCount} agent{agentCount !== 1 ? 's' : ''}
            {totalValue > 0 && (
              <> · Worth <span style={{ color: accent }}>{formatCurrency(totalValue)}</span>/mo</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommandCenter() {
  const { industryConfig, selectedIndustryId, metrics, roi, companyName } = useDemo();
  const [feedIndex, setFeedIndex] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Get department-organized data
  const departments = useMemo(() => {
    if (!industryConfig) return [];
    return getDepartments(selectedIndustryId, industryConfig);
  }, [selectedIndustryId, industryConfig]);

  const allAgents = useMemo(() => getAllAgents(departments), [departments]);
  const totalAgentCount = allAgents.length;

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
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Your AI Team</p>
          <h2 className="text-2xl font-bold text-white font-display">
            {companyName ? `${companyName}'s` : 'Your'} AI Workforce
          </h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400">{totalAgentCount} Agents Active</span>
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

      {/* Main Grid: Departments + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Department-Organized Agent Grid */}
        <div className="lg:col-span-8 space-y-6">
          {departments.map((dept, deptIdx) => (
            <div key={dept.id}>
              <DepartmentHeader dept={dept} accent={accent} metrics={metrics} />
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {dept.agents.map((agent, agentIdx) => (
                  <DeptAgentCard
                    key={agent.id}
                    agent={{ ...agent, departmentName: dept.name }}
                    accent={accent}
                    index={deptIdx * 3 + agentIdx}
                    onClick={setSelectedAgent}
                    metrics={metrics}
                  />
                ))}
              </div>
            </div>
          ))}
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

      {/* Agent Detail Slide-Out */}
      {selectedAgent && (
        <AgentDetailPanel
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
          allAgents={allAgents}
        />
      )}
    </div>
  );
}
