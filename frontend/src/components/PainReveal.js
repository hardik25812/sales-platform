import { useDemo } from '../context/DemoContext';
import { formatCurrency, formatPercent } from '../lib/formatters';
import { AnimatedCounter } from './AnimatedCounter';
import { PhoneOff, Clock, FileX, UserX, MessageSquareX, TrendingDown, DollarSign } from 'lucide-react';

const ICON_MAP = {
  PhoneMissed: PhoneOff,
  Clock: Clock,
  FileX: FileX,
  UserX: UserX,
  MessageSquare: MessageSquareX,
  MessageSquareX: MessageSquareX,
  TrendingDown: TrendingDown,
  DollarSign: DollarSign,
  CalendarX: UserX,
  UserMinus: UserX,
  Globe: TrendingDown,
  Car: Clock,
};

export default function PainReveal() {
  const { industryConfig, metrics, roi, companyName } = useDemo();

  if (!industryConfig || !roi) return null;

  const painPoints = industryConfig.painPoints || [];
  
  // Calculate specific pain values based on metrics
  const missedCallsCount = Math.round(metrics.monthlyLeads * (metrics.missedCallsEstimate / 100 || 0.65));
  const missedCallRevenue = missedCallsCount * metrics.avgJobValue * metrics.currentCloseRate;
  const slowResponseLoss = metrics.monthlyLeads * 0.21 * metrics.avgJobValue * metrics.currentCloseRate * 0.3;
  const noFollowUpLoss = metrics.monthlyLeads * 0.48 * metrics.avgJobValue * metrics.currentCloseRate * 0.25;
  const noShowLoss = metrics.monthlyLeads * (metrics.noShowRate / 100) * metrics.avgJobValue * metrics.currentCloseRate;

  const painCards = [
    {
      icon: PhoneOff,
      title: 'MISSED CALLS',
      highlight: `${Math.round(metrics.missedCallsEstimate || 65)}%`,
      description: `of your calls go unanswered when your team is busy with customers.`,
      calculation: `That's ~${missedCallsCount} missed calls/month.`,
      subtext: `At your avg job value of ${formatCurrency(metrics.avgJobValue)}...`,
      cost: missedCallRevenue,
      costLabel: 'in potential revenue calling your competitor instead',
      barPercent: metrics.missedCallsEstimate || 65,
    },
    {
      icon: Clock,
      title: 'SLOW RESPONSE',
      highlight: `${metrics.currentResponseTime} hours`,
      description: `Your avg response time. Industry data: leads that get a response in <5 min are 21x more likely to convert.`,
      calculation: `You're responding ${Math.round(metrics.currentResponseTime * 12)}x slower than what it takes to win the lead.`,
      cost: slowResponseLoss,
      costLabel: 'lost to competitors who respond faster',
      barPercent: Math.min(100, metrics.currentResponseTime * 15),
    },
    {
      icon: FileX,
      title: 'NO FOLLOW-UP',
      highlight: '48%',
      description: `of estimates/quotes never get a single follow-up. It takes 5+ touches to close.`,
      calculation: `You're leaving 40% of your quotes on the table.`,
      cost: noFollowUpLoss,
      costLabel: 'in quotes going cold every month',
      barPercent: 48,
    },
    {
      icon: UserX,
      title: 'NO-SHOWS',
      highlight: `${metrics.noShowRate}%`,
      description: `of scheduled appointments are no-shows without proper reminders.`,
      calculation: `That's ${Math.round(metrics.monthlyLeads * (metrics.noShowRate / 100))} wasted appointment slots per month.`,
      cost: noShowLoss,
      costLabel: 'in lost appointment value',
      barPercent: metrics.noShowRate,
    },
  ];

  const totalMonthlyLoss = missedCallRevenue + slowResponseLoss + noFollowUpLoss + noShowLoss;
  const annualLoss = totalMonthlyLoss * 12;

  return (
    <div className="space-y-8" data-testid="pain-reveal">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {companyName ? `${companyName}'s Current Reality` : 'Your Business Right Now'}
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Based on your numbers, here's what's happening every month
        </p>
      </div>

      {/* Pain Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {painCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="glass-panel p-5 md:p-6 rounded-2xl border border-white/[0.04] hover:border-red-500/20 transition-all duration-300"
              style={{
                animation: `fadeSlideUp 0.5s ease-out ${index * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-500/10 shrink-0">
                  <Icon size={24} className="text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold tracking-wider text-red-400">{card.title}</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">{card.highlight}</div>
                  <p className="text-sm text-slate-400 mb-3">{card.description}</p>
                  <p className="text-xs text-slate-500 mb-4">{card.calculation}</p>
                  
                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-1000"
                        style={{ width: `${card.barPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Cost */}
                  <div className="pt-3 border-t border-white/[0.06]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl md:text-2xl font-bold text-red-400">
                        <AnimatedCounter value={card.cost} prefix="$" />
                      </span>
                      <span className="text-xs text-slate-500">/mo</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{card.costLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Industry-specific pain points */}
      {painPoints.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 tracking-wider">
            {industryConfig.name.toUpperCase()} INDUSTRY CHALLENGES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {painPoints.map((point, index) => {
              const Icon = ICON_MAP[point.icon] || Clock;
              return (
                <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <Icon size={20} className="text-amber-400 mb-2" />
                  <div className="text-lg font-bold text-white mb-1">{point.stat}</div>
                  <div className="text-xs text-slate-400">{point.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Total Loss Summary */}
      <div 
        className="glass-panel p-6 md:p-8 rounded-2xl border-2 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent"
        style={{
          animation: 'fadeSlideUp 0.5s ease-out 0.5s forwards',
          opacity: 0,
        }}
      >
        <div className="text-center space-y-4">
          <div className="text-sm font-semibold text-red-400 tracking-wider">
            TOTAL BEING LEFT ON THE TABLE
          </div>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl md:text-5xl font-bold text-red-400">
              <AnimatedCounter value={totalMonthlyLoss} prefix="$" />
            </span>
            <span className="text-xl text-slate-500">/month</span>
          </div>
          <div className="text-lg text-slate-400">
            That's <span className="text-red-400 font-semibold">{formatCurrency(annualLoss)}</span> per year.
          </div>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            This is revenue that's going to your competitors right now. Every day you wait, 
            another {formatCurrency(totalMonthlyLoss / 30)} walks out the door.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-slate-400 mb-4">Ready to stop the bleeding?</p>
        <button 
          className="px-6 py-3 rounded-xl font-semibold text-white transition-all"
          style={{ 
            background: `linear-gradient(135deg, ${industryConfig.color}, ${industryConfig.colorSecondary})`,
          }}
        >
          See How We Fix This →
        </button>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
