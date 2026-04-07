import { useDemo } from '../context/DemoContext';
import { loadLawFirmProfile, formatProfileForDisplay } from '../utils/profileLoader';
import { Building2, MapPin, Scale, Trophy, Users, DollarSign, Briefcase, Target, Lightbulb, Zap, Star, TrendingUp, CheckCircle2, Wind, Smile, Phone, Activity, Heart, Clock, TrendingDown, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const BARIATRIC_METRICS = [
  { label: 'Avg Surgery Revenue', value: '$20,000', color: '#2E86C1' },
  { label: 'Weekend Blackout', value: '60 hrs', color: '#E74C3C' },
  { label: 'Pre-Op Dropout', value: '40%', color: '#E74C3C' },
  { label: 'Post-Op Gone Yr 2', value: '93.5%', color: '#E74C3C' },
  { label: 'GLP-1 Volume Drop', value: '−46%', color: '#E67E22' },
  { label: 'No-Show Rate', value: '22%', color: '#E74C3C' },
  { label: 'Body Contouring Upside', value: '$50K+/yr', color: '#27AE60' },
  { label: 'Decision Timeline', value: '3–6 months', color: '#2E86C1' },
];

const NEEDLEPOINT_METRICS = [
  { label: 'Avg Order Value', value: '$85', color: '#C4A35A' },
  { label: 'Cart Abandonment', value: '68%', color: '#E74C3C' },
  { label: 'Repeat Customer Rate', value: '28%', color: '#E74C3C' },
  { label: 'Google Reviews', value: '47', color: '#E67E22' },
  { label: 'Email Open Rate', value: '22%', color: '#E67E22' },
  { label: 'Monthly Orders', value: '320', color: '#C4A35A' },
  { label: 'Support Tickets/Mo', value: '180', color: '#E74C3C' },
  { label: 'Email Subscribers', value: '12,000', color: '#27AE60' },
  { label: 'Cart Recovery Opportunity', value: '$5.7K/mo', color: '#27AE60' },
  { label: 'Repeat Rate Target', value: '45%', color: '#27AE60' },
];

function BariatricMetricsTicker() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    ref.current = setInterval(() => setActive(p => (p + 1) % BARIATRIC_METRICS.length), 2200);
    return () => clearInterval(ref.current);
  }, []);
  const m = BARIATRIC_METRICS[active];
  return (
    <div className="flex items-center gap-2 h-6 overflow-hidden">
      <span className="text-lg font-bold transition-all duration-500" style={{ color: m.color }}>{m.value}</span>
      <span className="text-xs text-slate-400 transition-all duration-500">{m.label}</span>
    </div>
  );
}

function NeedlepointMetricsTicker() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    ref.current = setInterval(() => setActive(p => (p + 1) % NEEDLEPOINT_METRICS.length), 2200);
    return () => clearInterval(ref.current);
  }, []);
  const m = NEEDLEPOINT_METRICS[active];
  return (
    <div className="flex items-center gap-2 h-6 overflow-hidden">
      <span className="text-lg font-bold transition-all duration-500" style={{ color: m.color }}>{m.value}</span>
      <span className="text-xs text-slate-400 transition-all duration-500">{m.label}</span>
    </div>
  );
}

export default function ProfileView() {
  const { industryConfig, savedProfile: contextProfile } = useDemo();

  // Use the profile loaded from context (via selectSavedProfile) first,
  // then fall back to loading the first saved profile from industryConfig
  const savedProfiles = industryConfig?.savedProfiles || [];
  const fallbackProfileId = savedProfiles.length > 0 ? savedProfiles[0].id : null;
  const profile = contextProfile || (fallbackProfileId ? loadLawFirmProfile(fallbackProfileId) : null);
  const displayData = profile ? formatProfileForDisplay(profile) : null;

  if (!profile) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="glass-panel p-12 text-center">
          <Building2 size={48} className="mx-auto mb-4 text-slate-500" />
          <h2 className="text-2xl font-bold text-white mb-2">No Saved Profile Available</h2>
          <p className="text-slate-400">
            This industry doesn't have any saved profiles yet. Saved profiles provide deeply personalized demos based on specific firm analysis.
          </p>
        </div>
      </div>
    );
  }

  const isIET = profile.firm.industry_id === 'indoor_environmental';
  const isDental = profile.firm.industry_id === 'dental';
  const isBariatric = profile.firm.industry_id === 'bariatric_surgery';
  const isNeedlepoint = profile.firm.industry_id === 'ecommerce_needlepoint';
  const accentColor = isNeedlepoint ? 'text-amber-400' : isDental ? 'text-cyan-400' : isIET ? 'text-teal-400' : isBariatric ? 'text-blue-400' : 'text-rose-400';
  const HeaderIcon = isNeedlepoint ? Sparkles : isDental ? Smile : isIET ? Wind : isBariatric ? Activity : Scale;
  const serviceAreas = profile.firm.practice_areas || profile.firm.services || [];
  const serviceLabel = isNeedlepoint ? 'Products & Services' : isDental ? 'Services' : isIET ? 'Services' : isBariatric ? 'Services' : 'Practice Areas';
  const serviceColorClass = isNeedlepoint
    ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
    : isDental
    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
    : isIET
    ? 'bg-teal-500/10 text-teal-300 border-teal-500/20'
    : isBariatric
    ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
    : 'bg-rose-500/10 text-rose-300 border-rose-500/20';
  const serviceIconColor = isNeedlepoint ? 'text-amber-400' : isDental ? 'text-cyan-400' : isIET ? 'text-teal-400' : isBariatric ? 'text-blue-400' : 'text-rose-400';
  const profileImage = profile.firm.profile_image;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-panel p-8">

        {/* SFSBI — Bariatric brand header */}
        {isBariatric && (
          <div className="mb-6 rounded-2xl border border-blue-500/20 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0D2B4E 0%, #1B4F8A 50%, #0D2B4E 100%)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(46,134,193,0.25) 0%, transparent 70%)' }} />
            <div className="flex items-center justify-between px-8 py-6 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-28 h-16 rounded-xl bg-white/[0.95] flex items-center justify-center p-2 border border-white/30">
                  <img src="/sfsbi-logo.webp" alt="SFSBI" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-blue-300 mb-1">Bariatric Surgery Profile</p>
                  <p className="text-white font-bold text-xl">{profile.firm.name}</p>
                  <p className="text-blue-200/70 text-sm mt-0.5">{profile.firm.positioning}</p>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-end gap-2">
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">$20K–$35K</div>
                  <div className="text-xs text-blue-300">Avg Surgery Value</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-blue-200 tracking-wider">BARIATRIC + COSMETIC</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Art Needlepoint — Ecommerce brand header */}
        {isNeedlepoint && (
          <div className="mb-6 rounded-2xl border border-amber-500/20 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #3D1C1C 0%, #8B1A1A 40%, #5A2D0C 100%)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(196,163,90,0.20) 0%, transparent 70%)' }} />
            <div className="flex items-center justify-between px-8 py-6 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-36 h-16 rounded-xl bg-white/[0.95] flex items-center justify-center p-2 border border-white/30">
                  <img src="/artneedlepoint-logo.png" alt="Art Needlepoint" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-300 mb-1">Ecommerce Profile</p>
                  <p className="text-white font-bold text-xl">{profile.firm.name}</p>
                  <p className="text-amber-200/70 text-sm mt-0.5">{profile.firm.positioning}</p>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-end gap-2">
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">$85</div>
                  <div className="text-xs text-amber-300">Avg Order Value</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-amber-200 tracking-wider">FAMILY-OWNED ECOM</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isIET && !isDental && !isBariatric && !isNeedlepoint && profileImage && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-white/[0.08] relative h-52 md:h-64">
            <img
              src={profileImage}
              alt={profile.firm.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute left-6 bottom-5 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/20 backdrop-blur-sm flex items-center justify-center">
                <Scale size={24} className="text-rose-400" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-rose-300">Personal Injury Profile</p>
                <p className="text-white font-semibold">{profile.firm.name}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <HeaderIcon size={32} className={accentColor} />
              <h1 className="text-3xl font-bold text-white">{(isBariatric || isNeedlepoint) ? profile.firm.short_name || profile.firm.name : profile.firm.name}</h1>
            </div>
            <p className="text-lg text-slate-300">{displayData.tagline}</p>
            {profile.firm.tagline && (
              <p className="text-sm text-slate-500 mt-1 italic">"{profile.firm.tagline}"</p>
            )}
            {isBariatric && (
              <div className="mt-3">
                <BariatricMetricsTicker />
              </div>
            )}
            {isNeedlepoint && (
              <div className="mt-3">
                <NeedlepointMetricsTicker />
              </div>
            )}
          </div>
          {displayData.topVerdict ? (
            <div className="text-right">
              <div className={`text-3xl font-bold ${accentColor}`}>{displayData.topVerdict}</div>
              <div className="text-sm text-slate-400">Top Verdict</div>
            </div>
          ) : isBariatric ? (
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">9</div>
              <div className="text-sm text-slate-400">AI Systems</div>
            </div>
          ) : isNeedlepoint ? (
            <div className="text-right">
              <div className="text-3xl font-bold text-amber-400">7</div>
              <div className="text-sm text-slate-400">AI Systems</div>
            </div>
          ) : (
            <div className="text-right">
              <div className={`text-3xl font-bold ${accentColor}`}>{displayData.experience}</div>
              <div className="text-sm text-slate-400">Experience</div>
            </div>
          )}
        </div>

        {/* Bariatric Quick Stats */}
        {isBariatric && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/15">
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Location</span>
              </div>
              <div className="text-lg font-semibold text-white">Miami, FL</div>
            </div>
            <div className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/15">
              <div className="flex items-center gap-2 mb-1">
                <Phone size={16} className="text-blue-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Phone</span>
              </div>
              <div className="text-lg font-semibold text-white">{profile.firm.phone}</div>
            </div>
            <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/15">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-red-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Weekend Gap</span>
              </div>
              <div className="text-lg font-semibold text-red-300">60 hrs dark</div>
            </div>
            <div className="bg-emerald-500/5 rounded-lg p-4 border border-emerald-500/15">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Cosmetic Upsell</span>
              </div>
              <div className="text-lg font-semibold text-emerald-300">$50K+/yr</div>
            </div>
          </div>
        )}

        {/* Needlepoint Quick Stats */}
        {isNeedlepoint && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-amber-500/5 rounded-lg p-4 border border-amber-500/15">
              <div className="flex items-center gap-2 mb-1">
                <Phone size={16} className="text-amber-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Phone</span>
              </div>
              <div className="text-lg font-semibold text-white">{profile.firm.phone}</div>
            </div>
            <div className="bg-amber-500/5 rounded-lg p-4 border border-amber-500/15">
              <div className="flex items-center gap-2 mb-1">
                <Star size={16} className="text-amber-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Reviews</span>
              </div>
              <div className="text-lg font-semibold text-white">47 reviews</div>
            </div>
            <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/15">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown size={16} className="text-red-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Cart Abandon</span>
              </div>
              <div className="text-lg font-semibold text-red-300">68%</div>
            </div>
            <div className="bg-emerald-500/5 rounded-lg p-4 border border-emerald-500/15">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Recovery Opp.</span>
              </div>
              <div className="text-lg font-semibold text-emerald-300">$5.7K/mo</div>
            </div>
          </div>
        )}

        {/* Non-bariatric/non-needlepoint Quick Stats */}
        {!isBariatric && !isNeedlepoint && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={16} className="text-blue-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Locations</span>
            </div>
            <div className="text-lg font-semibold text-white">{(profile.firm.locations?.length ? profile.firm.locations.join(', ') : null) || profile.firm.service_area || '—'}</div>
          </div>

          <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase size={16} className="text-emerald-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Experience</span>
            </div>
            <div className="text-lg font-semibold text-white">{displayData.experience || '—'}</div>
          </div>

          {isDental ? (
            <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-1">
                <Phone size={16} className="text-cyan-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Chairs</span>
              </div>
              <div className="text-lg font-semibold text-white">{profile.firm.chairs ? `${profile.firm.chairs} Chairs` : '—'}</div>
            </div>
          ) : !isIET ? (
            <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-violet-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Attorneys</span>
              </div>
              <div className="text-lg font-semibold text-white">{displayData.attorneys} Attorneys</div>
            </div>
          ) : (
            <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={16} className="text-teal-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Markets</span>
              </div>
              <div className="text-lg font-semibold text-white">Nashville + Madison</div>
            </div>
          )}

          <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-amber-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Systems</span>
            </div>
            <div className="text-lg font-semibold text-white">{displayData.systemCount} Systems</div>
          </div>
        </div>
        )}
      </div>

      {/* Services / Practice Areas */}
      {serviceAreas.length > 0 && (
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <HeaderIcon size={20} className={serviceIconColor} />
            <h2 className="text-xl font-bold text-white">{serviceLabel}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((area, idx) => (
              <span key={idx} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${serviceColorClass}`}>
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Notable Verdicts — law firm only */}
      {!isIET && !isDental && !isBariatric && !isNeedlepoint && profile.firm.notable_verdicts?.length > 0 && (
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={20} className="text-amber-400" />
            <h2 className="text-xl font-bold text-white">Notable Verdicts</h2>
          </div>
          <div className="space-y-3">
            {profile.firm.notable_verdicts.slice(0, 5).map((verdict, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <DollarSign size={16} className="text-amber-400" />
                  </div>
                  <span className="text-slate-300">{verdict.type}</span>
                </div>
                <div className="text-xl font-bold text-amber-400">
                  ${(verdict.amount / 1000000).toFixed(1)}M
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attorneys — law firm only */}
      {!isIET && !isDental && !isBariatric && !isNeedlepoint && profile.firm.attorneys?.length > 0 && (
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-violet-400" />
            <h2 className="text-xl font-bold text-white">Attorneys</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.firm.attorneys.map((attorney, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
                <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-2">
                  <Users size={20} className="text-violet-400" />
                </div>
                <div className="text-white font-medium">{attorney}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SFSBI Team — bariatric only */}
      {isBariatric && profile.firm.team?.length > 0 && (
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-blue-400" />
            <h2 className="text-xl font-bold text-white">Clinical Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.firm.team.map((member, idx) => {
              const isDoc = member.includes('MD');
              const isRDN = member.includes('RDN');
              const role = isDoc ? 'Bariatric Surgeon' : isRDN ? 'Registered Dietitian · CSOWM' : 'Clinical Staff';
              const roleColor = isDoc ? 'text-blue-400' : isRDN ? 'text-emerald-400' : 'text-slate-400';
              const bgColor = isDoc ? 'bg-blue-500/10 border-blue-500/20' : isRDN ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/[0.03] border-white/[0.06]';
              return (
                <div key={idx} className={`p-4 rounded-lg border text-center ${bgColor}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${isDoc ? 'bg-blue-500/15' : isRDN ? 'bg-emerald-500/15' : 'bg-white/[0.05]'}`}>
                    <Users size={20} className={roleColor} />
                  </div>
                  <div className="text-white font-semibold text-sm">{member}</div>
                  <div className={`text-xs mt-1 ${roleColor}`}>{role}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Identified Problems */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target size={20} className="text-red-400" />
          <h2 className="text-xl font-bold text-white">Identified Operational Problems</h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-red-500/10 text-red-300 border border-red-500/20">
            {displayData.problemCount} Issues
          </span>
        </div>
        <div className="space-y-3">
          {profile.problems.map((problem, idx) => {
            const isFlagship = idx === 0;
            return (
              <div
                key={idx}
                className={isFlagship
                  ? "p-5 rounded-xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/30 to-red-950/20 shadow-lg"
                  : "p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
                }
              >
                {isFlagship && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
                      <Star size={11} className="text-amber-400" fill="currentColor" />
                      <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase">Primary Issue — Start Here</span>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isFlagship ? 'bg-amber-500/15' : 'bg-red-500/10'
                  }`}>
                    <span className={`text-sm font-bold ${isFlagship ? 'text-amber-400' : 'text-red-400'}`}>{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${isFlagship ? 'text-white text-base' : 'text-white'}`}>{problem.title}</h3>
                    <p className="text-sm text-slate-400 mb-2">{problem.description}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded font-mono ${
                        isFlagship ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-red-500/10 text-red-300'
                      }`}>
                        Impact: {problem.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Systems */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={20} className="text-emerald-400" />
          <h2 className="text-xl font-bold text-white">Recommended Systems</h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            {displayData.systemCount} Systems
          </span>
        </div>
        <div className="space-y-4">
          {profile.systems.map((system, idx) => {
            const isFlagship = system.priority === 'flagship';
            return (
              <div
                key={idx}
                className={isFlagship
                  ? "p-6 rounded-xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/30 to-rose-950/20 shadow-lg"
                  : "p-5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
                }
              >
                {isFlagship && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
                      <Star size={11} className="text-amber-400" fill="currentColor" />
                      <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase">Flagship System — Lead With This</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <TrendingUp size={10} className="text-emerald-400" />
                      <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase">Highest Demo Impact</span>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">{system.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-white mb-2 ${isFlagship ? 'text-xl' : 'text-lg'}`}>{system.name}</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Problem It Solves</div>
                        <p className="text-sm text-slate-300">{system.problem_it_solves}</p>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">What It Does</div>
                        {Array.isArray(system.what_it_does) ? (
                          <ul className="space-y-1.5">
                            {system.what_it_does.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-300">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-slate-300">{system.what_it_does}</p>
                        )}
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Impact</div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                          isFlagship
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-300'
                        }`}>
                          <Zap size={14} />
                          {system.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personalization */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target size={20} className="text-blue-400" />
          <h2 className="text-xl font-bold text-white">Demo Strategy</h2>
        </div>
        <div className="space-y-4">
          {profile.personalization.brand_tone && (
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="text-xs text-blue-400 uppercase tracking-wider mb-1">Brand Tone</div>
              <div className="text-white font-medium">{profile.personalization.brand_tone}</div>
            </div>
          )}
          {profile.personalization.messaging_style && (
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="text-xs text-blue-400 uppercase tracking-wider mb-1">Messaging Style</div>
              <div className="text-white font-medium">{profile.personalization.messaging_style}</div>
            </div>
          )}
          {profile.personalization.hook_question && (
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="text-xs text-blue-400 uppercase tracking-wider mb-1">Hook Question — Open With This</div>
              <div className="text-white font-medium italic">"{profile.personalization.hook_question}"</div>
            </div>
          )}
          {profile.personalization.demo_angle && (
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="text-xs text-blue-400 uppercase tracking-wider mb-1">Recommended Demo Angle</div>
              <div className="text-white">{profile.personalization.demo_angle}</div>
            </div>
          )}
          {profile.personalization.value_proposition && (
            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <div className="text-xs text-emerald-400 uppercase tracking-wider mb-1">Value Proposition</div>
              <div className="text-white font-semibold">{profile.personalization.value_proposition}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
