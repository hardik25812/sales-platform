import { useDemo } from '../context/DemoContext';
import { AnimatedCounter, CurrencyCounter } from './AnimatedCounter';
import { Zap, CalendarCheck, Mail, BarChart3, Shield, Clock, ChevronDown, Rocket } from 'lucide-react';
import { useMemo } from 'react';
import { useState } from 'react';
import { getDepartments } from '../data/departments';
import { getTeamCount, getTeamUnitLabel, getTrialBenefits } from '../lib/industryPresentation';

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left glass-panel p-4 space-y-2 transition-all hover:bg-white/[0.04]"
      data-testid={`faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-white font-medium">{question}</p>
        <ChevronDown size={16} className={`text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && (
        <p className="text-xs text-slate-400 leading-relaxed animate-fade-in">{answer}</p>
      )}
    </button>
  );
}

export default function TrialCTA() {
  const { industryConfig, roi, companyName, selectedIndustryId } = useDemo();
  const departments = useMemo(() => (
    industryConfig ? getDepartments(selectedIndustryId, industryConfig) : []
  ), [selectedIndustryId, industryConfig]);

  if (!industryConfig || !roi) return null;

  const accent = industryConfig.color;
  const teamCount = getTeamCount(industryConfig, departments);
  const teamUnitLabel = getTeamUnitLabel(industryConfig);
  const benefits = getTrialBenefits(selectedIndustryId, roi, teamCount, teamUnitLabel);
  const iconMap = { Zap, CalendarCheck, Mail, BarChart3 };

  return (
    <div className="max-w-3xl mx-auto space-y-8" data-testid="trial-cta">
      {/* Hero CTA */}
      <div className="text-center space-y-6 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel">
          <Rocket size={14} style={{ color: accent }} />
          <span className="text-xs font-mono" style={{ color: accent }}>Ready to Transform {companyName || 'Your Business'}?</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white font-display leading-tight">
          Based on your numbers, here's what<br />
          happens in <span style={{ color: accent }}>7 days</span>
        </h2>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {benefits.map((benefit, i) => {
          const Icon = iconMap[benefit.icon] || Zap;
          return (
            <div
              key={i}
              className="glass-panel p-5 flex items-start gap-4 animate-fade-up"
              style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}15`, color: accent }}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{benefit.text}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">{benefit.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Value Summary */}
      <div className="glass-panel p-6 text-center space-y-4" style={{ borderColor: `${accent}20` }}>
        <p className="text-sm text-slate-400">Your projected monthly impact</p>
        <div className="flex items-center justify-center gap-8">
          <div>
            <p className="text-xs text-slate-500 mb-1">Revenue Gain</p>
            <p className="text-2xl font-bold font-mono" style={{ color: accent }}>
              +<CurrencyCounter value={roi.gains.totalMonthlyGain} className="text-2xl font-bold font-mono" />
            </p>
          </div>
          <div className="w-px h-10 bg-white/[0.08]" />
          <div>
            <p className="text-xs text-slate-500 mb-1">Payback Period</p>
            <p className="text-2xl font-bold font-mono" style={{ color: accent }}>
              <AnimatedCounter value={roi.paybackDays} /> days
            </p>
          </div>
        </div>
      </div>

      {/* CTA Badges */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {['Zero cost', 'Zero risk', 'Zero commitment'].map((text, i) => (
          <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium glass-panel text-slate-300">
            <Shield size={12} className="inline mr-1 text-emerald-400" />
            {text}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          className="px-8 py-4 rounded-xl font-semibold text-white text-sm transition-all hover:scale-[1.02] active:scale-95"
          style={{ background: `linear-gradient(135deg, ${accent}, ${industryConfig.colorSecondary})`, boxShadow: `0 0 30px -8px ${accent}60` }}
          data-testid="start-trial-btn"
        >
          Start Your 7-Day Free Trial
        </button>
        <button
          className="px-8 py-4 rounded-xl font-semibold text-sm glass-panel glass-panel-hover text-slate-300"
          data-testid="book-call-btn"
        >
          Book Strategy Call
        </button>
      </div>

      <p className="text-center text-xs text-slate-600 font-mono">
        Your AI {teamUnitLabel.slice(0, -1)} goes live within 24 hours
      </p>

      {/* FAQ */}
      <div className="space-y-2">
        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider text-center mb-4">Common Questions</p>
        <FAQItem
          question="What happens after 7 days?"
          answer="Choose to continue or walk away. No contracts, no commitments. If you love the results (and you will), we'll set up your ongoing plan."
        />
        <FAQItem
          question={`Will it integrate with my ${industryConfig.integrations?.[0] || 'CRM'}?`}
          answer={`Yes! We support ${(industryConfig.integrations || []).join(', ')} and more. Our team handles all integration setup during onboarding.`}
        />
        <FAQItem
          question="What if it doesn't work for my business?"
          answer="That's exactly what the trial is for. You'll see real results within the first 48 hours. If not, you walk away with zero obligation."
        />
        <FAQItem
          question="How quickly does it go live?"
          answer="Within 24 hours of your discovery call. We handle all setup, training, and integration. Your AI team starts working immediately."
        />
      </div>
    </div>
  );
}
