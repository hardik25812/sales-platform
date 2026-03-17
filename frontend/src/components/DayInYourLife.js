import { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { formatCurrency } from '../lib/formatters';
import { Search, FileText, AlertTriangle, Clock, Phone, Mail, Calendar, Bell, CheckCircle, XCircle, Zap, MessageSquare } from 'lucide-react';

const ICON_MAP = {
  '🔍': Search,
  '📝': FileText,
  '⚠️': AlertTriangle,
  '😫': Clock,
  '📞': Phone,
  '❌': XCircle,
  '💸': XCircle,
  '⚡': Zap,
  '✅': CheckCircle,
  '📱': MessageSquare,
  '📧': Mail,
  '📅': Calendar,
  '🔔': Bell,
};

// Default day stories for industries
const DEFAULT_DAY_STORIES = {
  roofing: {
    before: [
      { time: '7:02 AM', event: 'Homeowner finds roof leak after weekend storm', detail: 'Searches "roof repair near me" on Google', icon: '🔍' },
      { time: '7:03 AM', event: 'Fills out your website form', detail: '', icon: '📝' },
      { time: '7:03 AM', event: 'Form sits in your inbox', detail: "Nobody's in the office yet.", icon: '⚠️', status: 'warning' },
      { time: '8:15 AM', event: 'Office manager arrives', detail: '14 voicemails, 23 emails. Your form is #19 in the queue.', icon: '😫', status: 'warning' },
      { time: '10:30 AM', event: 'Finally sees the form. Calls back.', detail: 'No answer. Leaves voicemail.', icon: '📞', status: 'danger' },
      { time: '10:32 AM', event: 'Homeowner already booked competitor', detail: 'They responded in 3 minutes.', icon: '❌', status: 'lost' },
      { time: 'RESULT', event: '$14,000 job — LOST', detail: 'This happens 3-4 times per week.', icon: '💸', status: 'lost' },
    ],
    after: [
      { time: '7:02 AM', event: 'Homeowner finds roof leak after weekend storm', detail: 'Searches "roof repair near me" on Google', icon: '🔍' },
      { time: '7:03 AM', event: 'Fills out your website form', detail: '', icon: '📝' },
      { time: '7:03 AM', event: 'AI Lead Agent activates instantly', detail: 'Reads submission: storm damage, residential, urgent', icon: '⚡', status: 'active' },
      { time: '7:04 AM', event: 'Homeowner gets personalized text', detail: '"Hi John, we received your request about storm damage at 142 Oak St..."', icon: '📱', status: 'success' },
      { time: '7:04 AM', event: 'Detailed email sent', detail: 'What to expect, insurance guide, credentials', icon: '📧', status: 'success' },
      { time: '7:04 AM', event: 'Inspection auto-booked', detail: 'Tomorrow 9 AM, confirmed', icon: '📅', status: 'success' },
      { time: '7:05 AM', event: 'You get a notification', detail: 'New qualified lead: John Smith, storm damage, $14K est. Booked.', icon: '🔔', status: 'success' },
      { time: 'RESULT', event: '$14,000 job — SECURED', detail: 'In 2 minutes. While you were still in bed.', icon: '✅', status: 'won' },
    ],
  },
  medspa: {
    before: [
      { time: '9:14 PM', event: 'Jessica sees your Instagram ad for lip fillers', detail: 'Impulse decision after seeing results photos', icon: '🔍' },
      { time: '9:15 PM', event: 'Sends you a DM asking about pricing', detail: '"How much for lip filler? Do you have availability this week?"', icon: '📝' },
      { time: '9:15 PM', event: 'DM sits unread', detail: 'Your front desk left at 6pm.', icon: '⚠️', status: 'warning' },
      { time: '9:47 PM', event: 'Jessica DMs two other medspas', detail: 'Looking for someone who responds.', icon: '😫', status: 'warning' },
      { time: '10:02 PM', event: 'Competitor responds instantly', detail: '"Hi Jessica! We have openings Thursday. Want me to book you?"', icon: '📞', status: 'danger' },
      { time: '10:05 PM', event: 'Jessica books with competitor', detail: '$650 appointment gone.', icon: '❌', status: 'lost' },
      { time: 'NEXT DAY', event: 'You respond to her DM at 9am', detail: '"Hi! Thanks for reaching out..." — Too late.', icon: '💸', status: 'lost' },
    ],
    after: [
      { time: '9:14 PM', event: 'Jessica sees your Instagram ad for lip fillers', detail: 'Impulse decision after seeing results photos', icon: '🔍' },
      { time: '9:15 PM', event: 'Sends you a DM asking about pricing', detail: '"How much for lip filler? Do you have availability this week?"', icon: '📝' },
      { time: '9:15 PM', event: 'AI Booking Agent responds instantly', detail: '"Hi Jessica! Lip filler starts at $550. I have Thursday 2pm or Friday 11am open..."', icon: '⚡', status: 'active' },
      { time: '9:16 PM', event: 'Jessica picks Thursday 2pm', detail: 'AI confirms and collects $100 deposit', icon: '📱', status: 'success' },
      { time: '9:17 PM', event: 'Confirmation + prep instructions sent', detail: 'What to avoid before treatment, what to expect', icon: '📧', status: 'success' },
      { time: '9:17 PM', event: 'Appointment in your calendar', detail: 'With deposit secured and notes attached', icon: '📅', status: 'success' },
      { time: 'RESULT', event: '$650 appointment — BOOKED', detail: 'In 2 minutes. While you were at dinner.', icon: '✅', status: 'won' },
    ],
  },
  hvac: {
    before: [
      { time: '2:14 AM', event: 'Homeowner wakes up — house is freezing', detail: 'Furnace stopped working in the middle of winter', icon: '🔍' },
      { time: '2:15 AM', event: 'Calls your emergency line', detail: 'Goes to voicemail.', icon: '📝' },
      { time: '2:16 AM', event: 'Leaves a message', detail: '"Please call me back, it\'s an emergency!"', icon: '⚠️', status: 'warning' },
      { time: '2:20 AM', event: 'Calls two other HVAC companies', detail: 'Desperate for someone to answer.', icon: '😫', status: 'warning' },
      { time: '2:22 AM', event: 'Competitor answers with live dispatch', detail: '"We can have someone there by 7am."', icon: '📞', status: 'danger' },
      { time: '7:30 AM', event: 'You see the voicemail', detail: 'Call back — they already have someone there.', icon: '❌', status: 'lost' },
      { time: 'RESULT', event: '$4,500 emergency repair — LOST', detail: 'Plus potential $8K replacement sale.', icon: '💸', status: 'lost' },
    ],
    after: [
      { time: '2:14 AM', event: 'Homeowner wakes up — house is freezing', detail: 'Furnace stopped working in the middle of winter', icon: '🔍' },
      { time: '2:15 AM', event: 'Calls your emergency line', detail: 'AI Emergency Agent answers instantly', icon: '📝' },
      { time: '2:15 AM', event: 'AI triages the emergency', detail: '"I understand your furnace stopped. Let me get you help right away."', icon: '⚡', status: 'active' },
      { time: '2:16 AM', event: 'On-call tech notified', detail: 'AI texts your on-call tech with details', icon: '📱', status: 'success' },
      { time: '2:17 AM', event: 'Customer gets confirmation', detail: '"Our tech Mike will call you within 15 minutes."', icon: '📧', status: 'success' },
      { time: '2:25 AM', event: 'Tech calls customer', detail: 'Troubleshoots over phone, schedules 7am visit', icon: '📅', status: 'success' },
      { time: 'RESULT', event: '$4,500 repair + $8K replacement — SECURED', detail: 'Customer for life. All while you slept.', icon: '✅', status: 'won' },
    ],
  },
  dental: {
    before: [
      { time: '6 months ago', event: 'Patient completes cleaning', detail: 'Hygienist says "See you in 6 months!"', icon: '🔍' },
      { time: '5 months later', event: 'No reminder sent', detail: 'Patient forgets about appointment.', icon: '⚠️', status: 'warning' },
      { time: '7 months later', event: 'Patient thinks "I should schedule..."', detail: 'Gets busy, forgets again.', icon: '😫', status: 'warning' },
      { time: '14 months later', event: 'Patient has tooth pain', detail: 'Searches for dentist — finds new one closer to work.', icon: '📞', status: 'danger' },
      { time: 'RESULT', event: 'Patient lost forever', detail: 'Lifetime value: $15,000+', icon: '💸', status: 'lost' },
    ],
    after: [
      { time: '6 months ago', event: 'Patient completes cleaning', detail: 'AI Recall Agent notes next appointment due date', icon: '🔍' },
      { time: '5.5 months later', event: 'AI sends friendly reminder', detail: '"Hi Sarah! Time for your 6-month cleaning. I have Tuesday 2pm or Thursday 10am..."', icon: '⚡', status: 'active' },
      { time: 'Same day', event: 'Patient books via text', detail: 'No phone call needed', icon: '📱', status: 'success' },
      { time: '2 days before', event: 'Confirmation reminder sent', detail: 'With pre-visit instructions', icon: '📧', status: 'success' },
      { time: 'Appointment day', event: 'Patient shows up', detail: 'Chair is filled, hygienist is productive', icon: '📅', status: 'success' },
      { time: 'RESULT', event: 'Patient retained for life', detail: 'Lifetime value: $15,000+ secured', icon: '✅', status: 'won' },
    ],
  },
};

export default function DayInYourLife() {
  const { industryConfig, companyName, metrics } = useDemo();
  const [viewMode, setViewMode] = useState('before');

  if (!industryConfig) return null;

  // Get day story from config or use default
  const dayStory = industryConfig.dayStory || DEFAULT_DAY_STORIES[industryConfig.id] || DEFAULT_DAY_STORIES.roofing;
  const story = viewMode === 'before' ? dayStory.before : dayStory.after;

  const getStatusStyles = (status) => {
    switch (status) {
      case 'warning':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'danger':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'lost':
        return 'bg-red-500/20 border-red-500/40 text-red-400';
      case 'active':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'success':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'won':
        return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400';
      default:
        return 'bg-white/[0.03] border-white/[0.06] text-slate-300';
    }
  };

  const getTimelineColor = (status) => {
    if (viewMode === 'before') {
      if (status === 'lost' || status === 'danger') return 'bg-red-500';
      if (status === 'warning') return 'bg-amber-500';
      return 'bg-slate-600';
    } else {
      if (status === 'won' || status === 'success') return 'bg-emerald-500';
      if (status === 'active') return 'bg-blue-500';
      return 'bg-slate-600';
    }
  };

  return (
    <div className="space-y-8" data-testid="day-in-your-life">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          A Day in {companyName ? `${companyName}'s` : 'Your'} Life
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          See how a single lead flows through your business
        </p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center">
        <div className="glass-panel p-1 rounded-xl inline-flex">
          <button
            onClick={() => setViewMode('before')}
            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
              viewMode === 'before'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            📅 YOUR BUSINESS TODAY
          </button>
          <button
            onClick={() => setViewMode('after')}
            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
              viewMode === 'after'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            ⚡ WITH YOUR AI TEAM
          </button>
        </div>
      </div>

      {/* Day Label */}
      <div className="text-center">
        <div 
          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
            viewMode === 'before' 
              ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          }`}
        >
          {viewMode === 'before' 
            ? `A TYPICAL DAY AT ${companyName || 'YOUR COMPANY'}` 
            : `WITH YOUR AI TEAM`}
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div 
            className={`absolute left-[60px] md:left-[80px] top-0 bottom-0 w-0.5 ${
              viewMode === 'before' ? 'bg-gradient-to-b from-slate-600 via-amber-500 to-red-500' : 'bg-gradient-to-b from-slate-600 via-blue-500 to-emerald-500'
            }`}
          />

          {/* Timeline items */}
          <div className="space-y-4">
            {story.map((item, index) => {
              const IconComponent = ICON_MAP[item.icon] || FileText;
              return (
                <div
                  key={index}
                  className="relative flex gap-4 md:gap-6"
                  style={{
                    animation: `fadeSlideIn 0.4s ease-out ${index * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  {/* Time */}
                  <div className="w-[50px] md:w-[70px] shrink-0 text-right">
                    <span className={`text-xs md:text-sm font-mono ${
                      item.time === 'RESULT' ? 'font-bold text-white' : 'text-slate-500'
                    }`}>
                      {item.time}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="relative z-10 shrink-0">
                    <div className={`w-3 h-3 rounded-full ${getTimelineColor(item.status)} ring-4 ring-[#0a0a12]`} />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-4 ${index === story.length - 1 ? 'pb-0' : ''}`}>
                    <div className={`p-4 rounded-xl border ${getStatusStyles(item.status)}`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          viewMode === 'before' 
                            ? (item.status === 'lost' || item.status === 'danger' ? 'bg-red-500/20' : 'bg-white/[0.06]')
                            : (item.status === 'won' || item.status === 'success' ? 'bg-emerald-500/20' : 'bg-white/[0.06]')
                        }`}>
                          <IconComponent size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm md:text-base">{item.event}</div>
                          {item.detail && (
                            <div className="text-xs md:text-sm text-slate-400 mt-1">{item.detail}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className={`glass-panel p-6 rounded-2xl border-2 max-w-2xl mx-auto ${
        viewMode === 'before' 
          ? 'border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent' 
          : 'border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent'
      }`}>
        <div className="text-center space-y-3">
          {viewMode === 'before' ? (
            <>
              <div className="text-red-400 font-semibold">THIS HAPPENS EVERY DAY</div>
              <p className="text-slate-400 text-sm">
                Based on your numbers, you're losing approximately{' '}
                <span className="text-red-400 font-bold">
                  {formatCurrency(metrics.avgJobValue * 3)} - {formatCurrency(metrics.avgJobValue * 5)}
                </span>{' '}
                per week to scenarios exactly like this.
              </p>
            </>
          ) : (
            <>
              <div className="text-emerald-400 font-semibold">THIS IS YOUR NEW REALITY</div>
              <p className="text-slate-400 text-sm">
                Every lead captured. Every opportunity converted. 24/7/365.{' '}
                <span className="text-emerald-400 font-bold">While you focus on what matters.</span>
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
