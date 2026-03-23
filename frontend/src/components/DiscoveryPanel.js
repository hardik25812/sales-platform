import { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { Slider } from '../components/ui/slider';
import { CurrencyCounter, AnimatedCounter, PercentCounter } from './AnimatedCounter';
import { DollarSign, Clock, PhoneMissed, TrendingUp, Zap, Users, BarChart3, ArrowRight, Search, Loader2, CheckCircle, AlertCircle, Globe } from 'lucide-react';
import { getDiscoveryMetricGroups } from '../lib/industryPresentation';

function MetricInput({ label, value, onChange, min, max, step = 1, prefix = '', suffix = '', format = 'number', accentColor }) {
  const displayValue = format === 'currency'
    ? `$${Math.round(value).toLocaleString()}`
    : format === 'percent'
    ? `${Math.round(value * 100)}%`
    : format === 'percentageNumber'
    ? `${Math.round(value)}%`
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
  const { industryConfig, metrics, updateMetric, roi, companyName, setActiveTab, liveMode, liveData, setLiveData, liveLoading, setLiveLoading, selectedIndustryId, savedProfile } = useDemo();
  const isIET = savedProfile?.firm?.industry_id === 'indoor_environmental';
  
  const [lookupForm, setLookupForm] = useState({
    businessName: '',
    city: '',
    state: '',
    website: '',
  });
  const [lookupError, setLookupError] = useState(null);

  if (!industryConfig || !roi) return null;

  const accent = industryConfig.color;
  const metricGroups = getDiscoveryMetricGroups(selectedIndustryId);

  const handleLiveLookup = async () => {
    if (!lookupForm.businessName) {
      setLookupError('Business name is required');
      return;
    }

    setLiveLoading(true);
    setLookupError(null);

    try {
      // Call analyze-business API (use relative path for Vercel serverless functions)
      const businessRes = await fetch('/api/analyze-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: lookupForm.businessName,
          city: lookupForm.city,
          state: lookupForm.state,
          industry: selectedIndustryId,
        }),
      });
      const businessData = await businessRes.json();

      if (!businessData.success) {
        // Show more helpful error messages
        let errorMsg = businessData.error || 'Failed to fetch business data';
        if (errorMsg.includes('Billing')) {
          errorMsg = 'Google API requires billing enabled. Using demo data instead.';
        } else if (errorMsg.includes('not found')) {
          errorMsg = 'Business not found. Try a different name or check spelling.';
        }
        throw new Error(errorMsg);
      }

      // Call analyze-website API if website provided
      let websiteData = null;
      if (lookupForm.website) {
        const websiteRes = await fetch('/api/analyze-website', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: lookupForm.website }),
        });
        const webResult = await websiteRes.json();
        if (webResult.success) {
          websiteData = webResult.website;
        }
      }

      // Store live data
      setLiveData({
        business: businessData.business,
        website: websiteData,
        marketData: businessData.marketData,
        timestamp: new Date().toISOString(),
      });

      // Auto-populate metrics based on live data
      const business = businessData.business;
      const market = businessData.marketData;

      // Estimate monthly leads from search volume and competitor count
      if (market?.searchVolume && market?.competitorCount) {
        const estimatedLeads = Math.round((market.searchVolume / market.competitorCount) * 0.15);
        updateMetric('monthlyLeads', Math.max(20, Math.min(500, estimatedLeads)));
      }

      // Estimate employees from review count (rough heuristic)
      if (business?.reviews?.count) {
        const reviewCount = business.reviews.count;
        let estimatedEmployees;
        if (reviewCount < 50) estimatedEmployees = 3;
        else if (reviewCount < 200) estimatedEmployees = 8;
        else if (reviewCount < 500) estimatedEmployees = 15;
        else if (reviewCount < 1000) estimatedEmployees = 25;
        else estimatedEmployees = 40;
        updateMetric('employees', estimatedEmployees);
      }

      // Estimate close rate from rating
      if (business?.reviews?.rating) {
        const rating = business.reviews.rating;
        const closeRate = Math.min(0.45, Math.max(0.15, (rating - 3) * 0.15 + 0.20));
        updateMetric('currentCloseRate', closeRate);
      }

      // Estimate missed calls based on after-hours gap
      if (business?.afterHoursGap) {
        const gapPercent = parseInt(business.afterHoursGap) || 30;
        const missedCalls = Math.round(gapPercent * 0.4);
        updateMetric('missedCallsEstimate', Math.max(10, Math.min(50, missedCalls)));
      }

      setLiveLoading(false);
    } catch (err) {
      console.error('Live lookup error:', err);
      setLookupError(err.message || 'Failed to fetch live data. Using demo data.');
      setLiveLoading(false);
    }
  };

  return (
    <div className="space-y-6" data-testid="discovery-panel">
      {isIET && (
        <div className="glass-panel p-5 md:p-6 border" style={{ borderColor: `${accent}35`, background: `linear-gradient(135deg, ${accent}10 0%, rgba(255,255,255,0.02) 100%)` }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/iet-logo.webp"
                alt="Indoor Environmental Testing"
                className="h-14 md:h-16 w-auto object-contain"
              />
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.22em]" style={{ color: accent }}>Indoor Environmental Testing, Inc.</p>
                <h2 className="text-xl md:text-2xl font-bold text-white">We Detect What You Suspect</h2>
                <p className="text-sm text-slate-400">Mold inspections, air quality testing, EMF evaluation, and commercial air testing — modeled with live demo metrics.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono border" style={{ borderColor: `${accent}30`, backgroundColor: `${accent}12`, color: accent }}>Nashville, TN</span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono border" style={{ borderColor: `${accent}30`, backgroundColor: `${accent}12`, color: accent }}>Madison, WI</span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono border text-slate-300 border-white/10 bg-white/[0.03]">20+ years</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Panel - Inputs */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel p-6 space-y-1.5">
          <h2 className="text-lg font-semibold text-white font-display">Discovery Inputs</h2>
          <p className="text-xs text-slate-500">Adjust sliders as your prospect shares their metrics</p>
        </div>

        {/* Live Business Lookup - Only visible in Live Mode */}
        {liveMode && (
          <div className="glass-panel p-6 space-y-4" style={{ borderColor: `${accent}30` }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Live Business Lookup</h3>
            </div>
            <p className="text-xs text-slate-500">Pull real data from Google Places & website analysis</p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Business Name *</label>
                <input
                  type="text"
                  value={lookupForm.businessName}
                  onChange={(e) => setLookupForm(prev => ({ ...prev, businessName: e.target.value }))}
                  className="glass-input w-full rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., Elite Roofing Co"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1.5 block">City</label>
                  <input
                    type="text"
                    value={lookupForm.city}
                    onChange={(e) => setLookupForm(prev => ({ ...prev, city: e.target.value }))}
                    className="glass-input w-full rounded-lg px-3 py-2 text-sm"
                    placeholder="Austin"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1.5 block">State</label>
                  <input
                    type="text"
                    value={lookupForm.state}
                    onChange={(e) => setLookupForm(prev => ({ ...prev, state: e.target.value }))}
                    className="glass-input w-full rounded-lg px-3 py-2 text-sm"
                    placeholder="TX"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Website (optional)</label>
                <div className="relative">
                  <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={lookupForm.website}
                    onChange={(e) => setLookupForm(prev => ({ ...prev, website: e.target.value }))}
                    className="glass-input w-full rounded-lg px-3 py-2 pl-9 text-sm"
                    placeholder="www.example.com"
                  />
                </div>
              </div>

              <button
                onClick={handleLiveLookup}
                disabled={liveLoading || !lookupForm.businessName}
                className="w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  background: liveLoading ? '#334155' : `linear-gradient(135deg, ${accent}, ${industryConfig.colorSecondary || accent})`,
                  color: 'white'
                }}
              >
                {liveLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    Analyze Business
                  </>
                )}
              </button>

              {lookupError && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <AlertCircle size={14} className="text-rose-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-rose-300">{lookupError}</p>
                </div>
              )}

              {liveData && (
                <div className="space-y-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-emerald-300 font-semibold">{liveData.business.name}</p>
                      <p className="text-xs text-emerald-400/70 mt-0.5">{liveData.business.address}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {liveData.business.phone && (
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="text-slate-500">📞</span>
                        <span>{liveData.business.phone}</span>
                      </div>
                    )}
                    {liveData.business.website && (
                      <div className="flex items-center gap-1.5 text-slate-300 truncate">
                        <span className="text-slate-500">🌐</span>
                        <a href={liveData.business.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate">
                          Website
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Reviews */}
                  {liveData.business.reviews && (
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-white font-semibold">{liveData.business.reviews.rating?.toFixed(1)}</span>
                      </div>
                      <span className="text-slate-400">({liveData.business.reviews.count?.toLocaleString()} reviews)</span>
                      {liveData.business.reviews.recentSentiment && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          liveData.business.reviews.recentSentiment === 'positive' ? 'bg-emerald-500/20 text-emerald-400' :
                          liveData.business.reviews.recentSentiment === 'mixed' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-rose-500/20 text-rose-400'
                        }`}>
                          {liveData.business.reviews.recentSentiment}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Hours & Gap */}
                  {liveData.business.afterHoursGap && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-orange-400">⏰</span>
                      <span className="text-orange-300">{liveData.business.afterHoursGap}</span>
                    </div>
                  )}

                  {/* Market Data */}
                  {liveData.marketData && (
                    <div className="pt-2 border-t border-emerald-500/20">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Market Intelligence</p>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-800/50 rounded p-2">
                          <p className="text-white font-semibold text-sm">{liveData.marketData.searchVolume?.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-500">Monthly Searches</p>
                        </div>
                        <div className="bg-slate-800/50 rounded p-2">
                          <p className="text-white font-semibold text-sm">{liveData.marketData.competitorCount}</p>
                          <p className="text-[10px] text-slate-500">Competitors</p>
                        </div>
                        <div className="bg-slate-800/50 rounded p-2">
                          <p className="text-white font-semibold text-sm">${liveData.marketData.estimatedCPC}</p>
                          <p className="text-[10px] text-slate-500">Avg CPC</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

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

          {metricGroups.primary.map((metric) => (
            <MetricInput
              key={metric.key}
              label={metric.label}
              value={metrics[metric.key] ?? 0}
              onChange={(v) => updateMetric(metric.key, v)}
              min={metric.min}
              max={metric.max}
              step={metric.step}
              format={metric.format}
              accentColor={accent}
            />
          ))}
        </div>

        {/* Optional metrics */}
        <div className="glass-panel p-6 space-y-5">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Optional Metrics</p>
          {metricGroups.optional.map((metric) => (
            <MetricInput
              key={metric.key}
              label={metric.label}
              value={metrics[metric.key] ?? 0}
              onChange={(v) => updateMetric(metric.key, v)}
              min={metric.min}
              max={metric.max}
              step={metric.step}
              format={metric.format}
              accentColor={accent}
            />
          ))}
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
    </div>
  );
}
