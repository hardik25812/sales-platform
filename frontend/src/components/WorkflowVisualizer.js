import { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import {
  PhoneIncoming, CalendarCheck, FileText, Star, Truck, Shield, MessageCircle,
  CalendarPlus, Stethoscope, HeartPulse, Award, Crown, AlertTriangle, Wrench,
  MapPin, Smile, ClipboardList, RotateCcw, ShieldCheck, Zap, Phone, RefreshCw,
  TrendingUp, Users, Target, Car, HardHat, MessageSquare, Scale, Building2,
  Heart, FileCheck, DoorOpen, TreePine, Calculator, CloudRain, Waves, Palette,
  Sun, Filter, Bell, Key, CheckCircle, ArrowRight, ChevronRight, Activity
} from 'lucide-react';

const ICON_MAP = {
  PhoneIncoming, CalendarCheck, FileText, Star, Truck, Shield, MessageCircle,
  CalendarPlus, Stethoscope, HeartPulse, Award, Crown, AlertTriangle, Wrench,
  MapPin, Smile, ClipboardList, RotateCcw, ShieldCheck, Zap, Phone, RefreshCw,
  TrendingUp, Users, Target, Car, HardHat, MessageSquare, Scale, Building2,
  Heart, FileCheck, DoorOpen, TreePine, Calculator, CloudRain, Waves, Palette,
  Sun, Filter, Bell, Key, CheckCircle, Activity
};

function buildSavedProfileWorkflow(savedProfile, fallbackWorkflow) {
  const savedIndustryId = savedProfile?.firm?.industry_id;
  if (savedIndustryId !== 'indoor_environmental') return fallbackWorkflow;

  const systems = savedProfile?.systems || [];
  const getSystemName = (id, fallback) => systems.find((system) => system.id === id)?.name || fallback;

  return [
    {
      step: 'Inbound Enquiry',
      system: getSystemName('inquiry_capture_system', '24/7 Inquiry Capture & Booking System'),
      icon: 'PhoneIncoming',
      before: 'New enquiries sit in voicemail, email, or web forms until someone is free to respond.',
      after: 'Inbound enquiries are answered automatically and moved straight into booking.',
      beforeTime: 'Hours later',
      afterTime: 'Within 60–90 seconds',
      dropoff: { before: 30, after: 6 },
    },
    {
      step: 'Booking',
      system: getSystemName('free_trial_ai_team', '7-Day Free Trial AI Operations Team'),
      icon: 'CalendarCheck',
      before: 'Booking requires phone tag and manual back-and-forth to find an inspection slot.',
      after: 'Assessments are booked automatically with confirmations and reminders sent out instantly.',
      beforeTime: '1-2 days',
      afterTime: '2 minutes',
      dropoff: { before: 20, after: 4 },
    },
    {
      step: 'Lead Follow-Up',
      system: getSystemName('report_next步_system', 'Lead Follow-Up, Payments & Client Update System'),
      icon: 'RefreshCw',
      before: 'People who asked questions but did not book are rarely followed up in a consistent way.',
      after: 'Warm leads are followed up automatically until they book or clearly opt out.',
      beforeTime: 'Often never',
      afterTime: 'Same day',
      dropoff: { before: 18, after: 8 },
    },
    {
      step: 'Payments',
      system: getSystemName('report_next步_system', 'Lead Follow-Up, Payments & Client Update System'),
      icon: 'FileText',
      before: 'Open invoices depend on the office manually remembering to chase payment.',
      after: 'Invoice reminders and secure payment links go out automatically until balances are cleared.',
      beforeTime: 'Delayed',
      afterTime: 'Same day',
      dropoff: { before: 12, after: 4 },
    },
    {
      step: 'Client Updates',
      system: getSystemName('report_next步_system', 'Lead Follow-Up, Payments & Client Update System'),
      icon: 'MessageCircle',
      before: 'Clients call in for report status, next steps, and follow-up timing because updates are reactive.',
      after: 'Clients receive proactive updates when reports are in progress, delivered, or waiting on next steps.',
      beforeTime: 'Reactive',
      afterTime: 'Real-time',
      dropoff: { before: 25, after: 5 },
    },
    {
      step: 'Reviews',
      system: getSystemName('review_reputation_system', 'Google Review & Reputation Engine'),
      icon: 'Star',
      before: 'Review requests happen inconsistently, if they happen at all.',
      after: 'Review requests are sent after the core intake and follow-up workflows are already running cleanly.',
      beforeTime: 'Occasional',
      afterTime: 'After each completed job',
      dropoff: { before: 10, after: 3 },
    },
  ];
}

export default function WorkflowVisualizer() {
  const { industryConfig, companyName, savedProfile } = useDemo();
  const [showAfter, setShowAfter] = useState(false);

  if (!industryConfig) return null;

  const accent = industryConfig.color;
  const workflow = buildSavedProfileWorkflow(savedProfile, industryConfig.workflow || []);
  const workflowLabel = industryConfig.usesSystemsApproach ? 'system' : 'agent';
  const summaryLabel = industryConfig.usesSystemsApproach ? 'Total Workflow Friction Reduction' : 'Total Lead Dropoff Reduction';

  return (
    <div className="space-y-6" data-testid="workflow-visualizer">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Workflow Comparison</p>
          <h2 className="text-2xl font-bold text-white font-display">
            {companyName ? `${companyName}'s` : 'Your'} Business Process
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-2 glass-panel px-1 py-1 rounded-xl">
          <button
            onClick={() => setShowAfter(false)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${!showAfter ? 'bg-rose-500/20 text-rose-400' : 'text-slate-500 hover:text-slate-300'}`}
            data-testid="toggle-before"
          >
            Before AI
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${showAfter ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
            style={showAfter ? { backgroundColor: `${accent}20`, color: accent } : {}}
            data-testid="toggle-after"
          >
            With AI
          </button>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-3">
        {workflow.map((step, i) => {
          const Icon = ICON_MAP[step.icon] || Activity;
          const isAfter = showAfter;
          return (
            <div
              key={i}
              className="glass-panel p-5 animate-fade-up"
              style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${i * 0.08}s` }}
              data-testid={`workflow-step-${i}`}
            >
              <div className="flex items-start gap-4">
                {/* Step number + icon */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500"
                    style={{
                      backgroundColor: isAfter ? `${accent}20` : 'rgba(239,68,68,0.12)',
                      color: isAfter ? accent : '#f87171'
                    }}
                  >
                    {isAfter ? <Icon size={20} /> : <Icon size={20} />}
                  </div>
                  <span className="text-[10px] font-mono text-slate-600">Step {i + 1}</span>
                  {i < workflow.length - 1 && (
                    <div className="w-px h-4 bg-white/[0.06]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-sm font-semibold text-white">{step.step}</h3>
                    <ChevronRight size={12} className="text-slate-600" />
                    <span className="text-xs font-mono text-slate-500">{step.agent || step.system || workflowLabel}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {/* Before */}
                    <div className={`rounded-lg p-3 transition-all duration-500 ${!isAfter ? 'bg-rose-500/[0.08] border border-rose-500/20' : 'bg-white/[0.02] border border-white/[0.04] opacity-50'}`}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span className="text-[10px] text-rose-400 font-semibold uppercase tracking-wider">Before</span>
                      </div>
                      <p className="text-xs text-slate-300">{step.before}</p>
                      <p className="text-[10px] text-slate-600 font-mono mt-1">{step.beforeTime}</p>
                      {step.dropoff.before > 0 && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <div className="flex-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                            <div className="h-full rounded-full bg-rose-500/60 transition-all duration-700" style={{ width: `${step.dropoff.before}%` }} />
                          </div>
                          <span className="text-[10px] font-mono text-rose-400">{step.dropoff.before}% drop</span>
                        </div>
                      )}
                    </div>

                    {/* After */}
                    <div className={`rounded-lg p-3 transition-all duration-500 ${isAfter ? 'border' : 'bg-white/[0.02] border border-white/[0.04] opacity-50'}`}
                      style={isAfter ? { backgroundColor: `${accent}08`, borderColor: `${accent}25` } : {}}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: accent }}>After</span>
                      </div>
                      <p className="text-xs text-slate-300">{step.after}</p>
                      <p className="text-[10px] font-mono mt-1" style={{ color: `${accent}99` }}>{step.afterTime}</p>
                      {step.dropoff.after > 0 && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <div className="flex-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${step.dropoff.after}%`, backgroundColor: `${accent}80` }} />
                          </div>
                          <span className="text-[10px] font-mono" style={{ color: accent }}>{step.dropoff.after}% drop</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="glass-panel p-6 text-center">
        <p className="text-sm text-slate-400 mb-2">{summaryLabel}</p>
        <div className="flex items-center justify-center gap-6">
          <div>
            <p className="text-2xl font-bold text-rose-400 font-mono">
              {workflow.reduce((sum, s) => sum + s.dropoff.before, 0)}%
            </p>
            <p className="text-[10px] text-slate-600 uppercase">Before</p>
          </div>
          <ArrowRight size={20} className="text-slate-600" />
          <div>
            <p className="text-2xl font-bold font-mono" style={{ color: accent }}>
              {workflow.reduce((sum, s) => sum + s.dropoff.after, 0)}%
            </p>
            <p className="text-[10px] text-slate-600 uppercase">After</p>
          </div>
        </div>
      </div>
    </div>
  );
}
