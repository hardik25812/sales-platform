import { useDemo } from '../context/DemoContext';
import { Slider } from '../components/ui/slider';
import { CurrencyCounter, AnimatedCounter, PercentCounter } from './AnimatedCounter';
import { DollarSign, Clock, PhoneMissed, TrendingUp, Zap, Users, BarChart3, ArrowRight } from 'lucide-react';

function MetricInput({ label, value, onChange, min, max, step = 1, prefix = '', suffix = '', format = 'number', accentColor }) {
  const displayValue = format === 'currency'
    ? `$${Math.round(value).toLocaleString()}`
    : format === 'percent'
    ? `${Math.round(value * 100)}%`
    : format === 'hours'
    ? `${value}hrs`
    : Math.round(value).toLocaleString();

  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-baseline">
        <label className="text-xs font-medium text-slate-400">{label}</label>
        <span className="text-sm font-mono font-medium text-white">{prefix}{displayValue}{suffix}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className="slider-accent"
        data-testid={`slider-${label.toLowerCase().replace(/\s+/g, '-')}`}
      />
    </div>
  );
}

export default function DiscoveryPanel() {
  const { industryConfig, metrics, updateMetric, roi, companyName, setActiveTab } = useDemo();

  if (!industryConfig || !roi) return null;

  const accent = industryConfig.color;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-testid="discovery-panel">
      {/* Left Panel - Inputs */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel p-6 space-y-1.5">
          <h2 className="text-lg font-semibold text-white font-display">Discovery Inputs</h2>
          <p className="text-xs text-slate-500">Adjust sliders as your prospect shares their metrics</p>
        </div>

        <div className="glass-panel p-6 space-y-5">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400">Company Name</label>
            <input
              type="text"
              value={companyName}
              readOnly
              className="glass-input w-full rounded-lg px-3 py-2 text-sm font-mono"
              placeholder="Set on landing page..."
              data-testid="company-name-display"
            />
          </div>

          <MetricInput label="Monthly Leads" value={metrics.monthlyLeads} onChange={(v) => updateMetric('monthlyLeads', v)} min={10} max={1000} step={5} accentColor={accent} />
          <MetricInput label="Average Job/Deal Value" value={metrics.avgJobValue} onChange={(v) => updateMetric('avgJobValue', v)} min={100} max={100000} step={100} format="currency" accentColor={accent} />
          <MetricInput label="Number of Employees" value={metrics.employees} onChange={(v) => updateMetric('employees', v)} min={1} max={100} accentColor={accent} />
          <MetricInput label="Current Close Rate" value={metrics.currentCloseRate} onChange={(v) => updateMetric('currentCloseRate', v)} min={0.05} max={0.50} step={0.01} format="percent" accentColor={accent} />
          <MetricInput label="Avg Response Time (hours)" value={metrics.currentResponseTime} onChange={(v) => updateMetric('currentResponseTime', v)} min={0.5} max={24} step={0.1} format="hours" accentColor={accent} />
          <MetricInput label="Monthly Ad Spend" value={metrics.monthlyAdSpend} onChange={(v) => updateMetric('monthlyAdSpend', v)} min={0} max={50000} step={250} format="currency" accentColor={accent} />
        </div>

        {/* Optional metrics */}
        <div className="glass-panel p-6 space-y-5">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Optional Metrics</p>
          <MetricInput label="No-Show Rate" value={metrics.noShowRate} onChange={(v) => updateMetric('noShowRate', v)} min={0} max={40} suffix="%" accentColor={accent} />
          <MetricInput label="Monthly Missed Calls" value={metrics.missedCallsEstimate} onChange={(v) => updateMetric('missedCallsEstimate', v)} min={0} max={500} step={5} accentColor={accent} />
        </div>
      </div>

      {/* Right Panel - Live Impact Preview */}
      <div className="lg:col-span-7 space-y-6">
        {/* Current Reality */}
        <div className="glass-panel p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider font-display">
              {companyName ? `${companyName}'s` : 'Your'} Current Reality
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel p-4 space-y-1">
              <div className="flex items-center gap-2 text-rose-400">
                <DollarSign size={16} />
                <span className="text-xs text-slate-500">Missed Opportunities</span>
              </div>
              <CurrencyCounter value={roi.losses.totalMonthlyLoss} className="text-2xl font-bold text-rose-400 font-mono" />
              <span className="text-xs text-slate-600">/month</span>
            </div>

            <div className="glass-panel p-4 space-y-1">
              <div className="flex items-center gap-2 text-amber-400">
                <Clock size={16} />
                <span className="text-xs text-slate-500">Avg Lead Response</span>
              </div>
              <p className="text-2xl font-bold text-amber-400 font-mono">
                <AnimatedCounter value={metrics.currentResponseTime} decimals={1} /> <span className="text-sm">hours</span>
              </p>
            </div>

            <div className="glass-panel p-4 space-y-1">
              <div className="flex items-center gap-2 text-orange-400">
                <PhoneMissed size={16} />
                <span className="text-xs text-slate-500">Leads Going Cold</span>
              </div>
              <p className="text-2xl font-bold text-orange-400 font-mono">
                <AnimatedCounter value={roi.summary.leadsGoingCold} />
              </p>
              <span className="text-xs text-slate-600">/month</span>
            </div>

            <div className="glass-panel p-4 space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <BarChart3 size={16} />
                <span className="text-xs text-slate-500">Current Close Rate</span>
              </div>
              <p className="text-2xl font-bold text-slate-300 font-mono">
                <PercentCounter value={metrics.currentCloseRate * 100} />
              </p>
            </div>
          </div>
        </div>

        {/* With AI Workforce OS */}
        <div className="glass-panel p-6 md:p-8 space-y-6" style={{ borderColor: `${accent}20` }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <h3 className="text-sm font-semibold uppercase tracking-wider font-display" style={{ color: accent }}>
              With AI Workforce OS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel p-4 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <TrendingUp size={16} />
                <span className="text-xs text-slate-500">Additional Revenue</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400 font-mono">
                +<CurrencyCounter value={roi.gains.totalMonthlyGain} className="text-2xl font-bold text-emerald-400 font-mono" />
              </p>
              <span className="text-xs text-slate-600">/month</span>
            </div>

            <div className="glass-panel p-4 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <Zap size={16} />
                <span className="text-xs text-slate-500">Response Time</span>
              </div>
              <p className="text-2xl font-bold text-cyan-400 font-mono">{roi.projectedResponseTime}</p>
            </div>

            <div className="glass-panel p-4 space-y-1">
              <div className="flex items-center gap-2 text-blue-400">
                <BarChart3 size={16} />
                <span className="text-xs text-slate-500">Projected Close Rate</span>
              </div>
              <p className="text-2xl font-bold text-blue-400 font-mono">
                <PercentCounter value={roi.projectedCloseRate * 100} />
              </p>
            </div>

            <div className="glass-panel p-4 space-y-1">
              <div className="flex items-center gap-2 text-violet-400">
                <Users size={16} />
                <span className="text-xs text-slate-500">FTE Equivalent Savings</span>
              </div>
              <p className="text-2xl font-bold text-violet-400 font-mono">
                <AnimatedCounter value={roi.fteEquivalent} decimals={1} /> <span className="text-sm">FTE</span>
              </p>
            </div>
          </div>

          {/* Payback highlight */}
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: `${accent}10`, border: `1px solid ${accent}20` }}>
            <p className="text-sm text-slate-400">System pays for itself in</p>
            <p className="text-3xl font-bold font-mono mt-1" style={{ color: accent }}>
              <AnimatedCounter value={roi.paybackDays} /> <span className="text-lg">days</span>
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setActiveTab('command')}
          className="w-full glass-panel glass-panel-hover p-4 flex items-center justify-between group"
          data-testid="continue-to-command-btn"
        >
          <div>
            <p className="text-sm font-semibold text-white">Continue to Your AI Team</p>
            <p className="text-xs text-slate-500">See the full Command Center with your numbers</p>
          </div>
          <ArrowRight size={20} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
}
