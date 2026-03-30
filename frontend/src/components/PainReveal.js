import { useDemo } from '../context/DemoContext';
import { formatCurrency, formatPercent } from '../lib/formatters';
import { AnimatedCounter } from './AnimatedCounter';
import { PhoneOff, Clock, FileX, UserX, MessageSquareX, TrendingDown, DollarSign, Palette, Star } from 'lucide-react';
import { getPainCards } from '../lib/industryPresentation';

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
  const { industryConfig, metrics, roi, companyName, selectedIndustryId, savedProfile } = useDemo();

  if (!industryConfig || !roi) return null;

  const painPoints = industryConfig.painPoints || [];
  const helperPainCards = getPainCards(selectedIndustryId, metrics);
  const cardIconMap = {
    PhoneOff,
    Clock,
    FileX,
    UserX,
    MessageSquareX,
    TrendingDown,
    DollarSign,
    Palette,
    Star,
  };
  const basePainCards = helperPainCards.map((card) => ({
    ...card,
    icon: cardIconMap[card.icon] || Clock,
  }));

  const savedIndustryId = savedProfile?.firm?.industry_id;
  const isDental = savedIndustryId === 'dental';
  const isLawFirm = savedIndustryId === 'law_firm';

  const reputationCard = savedProfile && isLawFirm ? {
    icon: Star,
    title: 'GOOGLE REVIEWS LEFT ON THE TABLE',
    highlight: '50–70%',
    description: 'of settled clients are never systematically asked for a Google review — leaving the firm invisible to the next injured victim searching online.',
    calculation: 'Personal injury intakes start on Google. The firm with more credible reviews wins the call before a consultation is ever booked.',
    cost: Math.round((metrics.monthlyLeads || 20) * (metrics.avgJobValue || 15000) * 0.04),
    costLabel: 'in estimated new intakes lost monthly to competitors with stronger Google presence',
    barPercent: 65,
    isFlagship: true,
  } : null;

  const unansweredCallsCard = isDental ? {
    icon: PhoneOff,
    title: 'UNANSWERED INBOUND CALLS — PATIENTS GOING TO COMPETITORS',
    highlight: '34%',
    description: 'of inbound calls go unanswered during peak hours. Patients who reach voicemail don\'t leave a message — they call the next dentist on Google.',
    calculation: 'With an average new patient value of $4,200 and hundreds of calls per month, every missed call is a lost relationship before it even starts.',
    cost: Math.round((metrics.monthlyLeads || 30) * (metrics.avgJobValue || 4200) * 0.09),
    costLabel: 'in new patient lifetime value lost monthly to unanswered calls alone',
    barPercent: 34,
    isFlagship: true,
  } : null;

  const flagshipCard = unansweredCallsCard || reputationCard;
  const painCards = flagshipCard
    ? [flagshipCard, ...basePainCards.slice(0, 3)]
    : basePainCards.map((card, index) => ({
        ...card,
        isFlagship: index === 0,
      }));

  const totalMonthlyLoss = painCards.reduce((acc, card) => acc + card.cost, 0);
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
          const flagship = !!card.isFlagship;
          return (
            <div
              key={index}
              className={`p-5 md:p-6 rounded-2xl transition-all duration-300 ${
                flagship
                  ? 'border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/30 to-rose-950/20 shadow-lg md:col-span-2'
                  : 'glass-panel border border-white/[0.04] hover:border-red-500/20'
              }`}
              style={{
                animation: `fadeSlideUp 0.5s ease-out ${index * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              {flagship && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
                    <Star size={11} className="text-amber-400" fill="currentColor" />
                    <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase">Primary Issue — Start Here</span>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${flagship ? 'bg-amber-500/10' : 'bg-red-500/10'}`}>
                  <Icon size={24} className={flagship ? 'text-amber-400' : 'text-red-400'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold tracking-wider ${flagship ? 'text-amber-400' : 'text-red-400'}`}>{card.title}</span>
                  </div>
                  <div className={`font-bold text-white mb-2 ${flagship ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>{card.highlight}</div>
                  <p className="text-sm text-slate-400 mb-3">{card.description}</p>
                  <p className="text-xs text-slate-500 mb-4">{card.calculation}</p>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          flagship
                            ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                            : 'bg-gradient-to-r from-red-500 to-red-400'
                        }`}
                        style={{ width: `${card.barPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Cost */}
                  <div className="pt-3 border-t border-white/[0.06]">
                    <div className="flex items-baseline gap-2">
                      <span className={`font-bold ${flagship ? 'text-2xl md:text-3xl text-amber-400' : 'text-xl md:text-2xl text-red-400'}`}>
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
