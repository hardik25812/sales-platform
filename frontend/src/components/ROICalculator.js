import { useDemo } from '../context/DemoContext';
import { CurrencyCounter, AnimatedCounter } from './AnimatedCounter';
import { formatCurrency } from '../lib/calculations';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, TrendingDown, Clock, PhoneMissed, UserMinus, Wrench, TrendingUp, Users, CalendarX, ArrowRight, Info } from 'lucide-react';

function LossCard({ icon: Icon, label, value, formula, accentColor }) {
  return (
    <div className="glass-panel p-4 space-y-2 group" data-testid={`loss-card-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-rose-400" />
          <span className="text-xs text-slate-400">{label}</span>
        </div>
        {formula && (
          <div className="relative">
            <Info size={12} className="text-slate-600 cursor-help" />
          </div>
        )}
      </div>
      <CurrencyCounter value={value} className="text-lg font-bold text-rose-400 font-mono" />
      <span className="text-[10px] text-slate-600 font-mono">/month</span>
    </div>
  );
}

function GainCard({ icon: Icon, label, value, color }) {
  return (
    <div className="glass-panel p-4 space-y-2" data-testid={`gain-card-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center gap-2">
        <Icon size={14} className={color} />
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <p className={`text-lg font-bold font-mono ${color}`}>
        +<CurrencyCounter value={value} className={`text-lg font-bold font-mono ${color}`} />
      </p>
      <span className="text-[10px] text-slate-600 font-mono">/month</span>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel p-3 text-xs">
      <p className="text-slate-400 mb-1">Month {label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-mono" style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function ROICalculator() {
  const { industryConfig, roi, companyName } = useDemo();

  if (!industryConfig || !roi) return null;

  const accent = industryConfig.color;

  // Comparison data for bar chart
  const comparisonData = [
    { name: 'Revenue', current: roi.comparison.currentMonthlyRevenue, projected: roi.comparison.projectedMonthlyRevenue },
    { name: 'Op. Cost', current: roi.comparison.currentOperationalCost, projected: roi.comparison.projectedOperationalCost },
    { name: 'Net Profit', current: roi.comparison.currentNetProfit, projected: roi.comparison.projectedNetProfit },
  ];

  return (
    <div className="space-y-6" data-testid="roi-calculator">
      {/* Header */}
      <div>
        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">ROI Deep Dive</p>
        <h2 className="text-2xl font-bold text-white font-display">
          {companyName ? `${companyName}'s` : 'Your'} Financial Impact
        </h2>
      </div>

      {/* Money Lost Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingDown size={16} className="text-rose-400" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Money Being Lost</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          <LossCard icon={Clock} label="Slow Response" value={roi.losses.slowResponseLoss} formula="leads × 35% × jobValue × 10%" />
          <LossCard icon={PhoneMissed} label="Missed Calls" value={roi.losses.missedCallLoss} formula="missedCalls × jobValue × closeRate" />
          <LossCard icon={TrendingDown} label="No Follow-Up" value={roi.losses.noFollowUpLoss} formula="leads × (1-closeRate) × jobValue × 8%" />
          <LossCard icon={CalendarX} label="No-Shows" value={roi.losses.noShowLoss} formula="noShowRate × leads × closeRate × jobValue" />
          <LossCard icon={Wrench} label="Manual Labor" value={roi.losses.manualLaborWaste} formula="employees × $5K × 15%" />
        </div>
        <div className="glass-panel p-5 flex items-center justify-between" style={{ borderColor: 'rgba(244,63,94,0.2)' }}>
          <span className="text-sm text-slate-400">Total Monthly Loss</span>
          <CurrencyCounter value={roi.losses.totalMonthlyLoss} className="text-2xl font-bold text-rose-400 font-mono" />
        </div>
      </div>

      {/* Money Gained Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Money Gained With AI</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <GainCard icon={TrendingUp} label="Conversion Lift" value={roi.gains.conversionLift} color="text-emerald-400" />
          <GainCard icon={PhoneMissed} label="Recovered Leads" value={roi.gains.recoveredLeads} color="text-cyan-400" />
          <GainCard icon={Users} label="FTE Savings" value={roi.gains.fteSavings} color="text-violet-400" />
          <GainCard icon={CalendarX} label="No-Show Reduction" value={roi.gains.noShowReduction} color="text-blue-400" />
        </div>
        <div className="glass-panel p-5 flex items-center justify-between" style={{ borderColor: `${accent}30` }}>
          <span className="text-sm text-slate-400">Total Monthly Gain</span>
          <p className="text-2xl font-bold font-mono" style={{ color: accent }}>
            +<CurrencyCounter value={roi.gains.totalMonthlyGain} className="text-2xl font-bold font-mono" style={{ color: accent }} />
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparison Bar Chart */}
        <div className="glass-panel p-5">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-4">Current vs Projected</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={comparisonData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="current" name="Current" radius={[4, 4, 0, 0]} maxBarSize={36}>
                {comparisonData.map((_, i) => (
                  <Cell key={i} fill="rgba(244,63,94,0.4)" />
                ))}
              </Bar>
              <Bar dataKey="projected" name="With AI" radius={[4, 4, 0, 0]} maxBarSize={36}>
                {comparisonData.map((_, i) => (
                  <Cell key={i} fill={accent} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-3 h-2 rounded-sm bg-rose-500/40" /><span className="text-[10px] text-slate-500">Current</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-2 rounded-sm" style={{ backgroundColor: accent }} /><span className="text-[10px] text-slate-500">With AI</span></div>
          </div>
        </div>

        {/* 12-Month Projection */}
        <div className="glass-panel p-5">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-4">12-Month ROI Projection</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={roi.monthlyProjection}>
              <defs>
                <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accent} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `M${v}`} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="netValue" name="Net ROI" stroke={accent} fillOpacity={1} fill="url(#projGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payback Period */}
      <div className="glass-panel p-6 md:p-8 text-center space-y-4" style={{ borderColor: `${accent}25` }}>
        <p className="text-sm text-slate-400">Payback Period</p>
        <div className="flex items-center justify-center gap-8">
          <div>
            <p className="text-xs text-slate-500 mb-1">Setup Cost</p>
            <p className="text-xl font-bold text-slate-300 font-mono">${roi.setupCost.toLocaleString()}</p>
          </div>
          <ArrowRight size={20} className="text-slate-600" />
          <div>
            <p className="text-xs text-slate-500 mb-1">Monthly Value</p>
            <p className="text-xl font-bold font-mono" style={{ color: accent }}>
              ${roi.gains.totalMonthlyGain.toLocaleString()}
            </p>
          </div>
          <ArrowRight size={20} className="text-slate-600" />
          <div>
            <p className="text-xs text-slate-500 mb-1">Pays for Itself In</p>
            <p className="text-3xl font-bold font-mono" style={{ color: accent }}>
              <AnimatedCounter value={roi.paybackDays} /> <span className="text-base">days</span>
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 font-mono">
          12-month impact: <span style={{ color: accent }}>{formatCurrency(roi.annualImpact)}</span>
        </p>
      </div>
    </div>
  );
}
