import { useDemo } from '../context/DemoContext';
import { loadLawFirmProfile, formatProfileForDisplay } from '../utils/profileLoader';
import { Building2, MapPin, Scale, Trophy, Users, DollarSign, Briefcase, Target, Lightbulb, Zap } from 'lucide-react';

export default function ProfileView() {
  const { industryConfig } = useDemo();

  // Check if this industry has saved profiles
  const savedProfiles = industryConfig?.savedProfiles || [];
  
  // For now, load the first saved profile if available
  const profileId = savedProfiles.length > 0 ? savedProfiles[0].id : null;
  const profile = profileId ? loadLawFirmProfile(profileId) : null;
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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-panel p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Scale size={32} className="text-rose-400" />
              <h1 className="text-3xl font-bold text-white">{profile.firm.name}</h1>
            </div>
            <p className="text-lg text-slate-300">{displayData.tagline}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-rose-400">{displayData.topVerdict}</div>
            <div className="text-sm text-slate-400">Top Verdict</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={16} className="text-blue-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Locations</span>
            </div>
            <div className="text-lg font-semibold text-white">{profile.firm.locations.join(', ')}</div>
          </div>

          <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase size={16} className="text-emerald-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Experience</span>
            </div>
            <div className="text-lg font-semibold text-white">{displayData.experience}</div>
          </div>

          <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-violet-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Attorneys</span>
            </div>
            <div className="text-lg font-semibold text-white">{displayData.attorneys} Attorneys</div>
          </div>

          <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-amber-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Systems</span>
            </div>
            <div className="text-lg font-semibold text-white">{displayData.systemCount} Systems</div>
          </div>
        </div>
      </div>

      {/* Practice Areas */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <Scale size={20} className="text-rose-400" />
          <h2 className="text-xl font-bold text-white">Practice Areas</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.firm.practice_areas.map((area, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Notable Verdicts */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={20} className="text-amber-400" />
          <h2 className="text-xl font-bold text-white">Notable Verdicts</h2>
        </div>
        <div className="space-y-3">
          {profile.firm.notable_verdicts.slice(0, 5).map((verdict, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
            >
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

      {/* Attorneys */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users size={20} className="text-violet-400" />
          <h2 className="text-xl font-bold text-white">Attorneys</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.firm.attorneys.map((attorney, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center"
            >
              <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-2">
                <Users size={20} className="text-violet-400" />
              </div>
              <div className="text-white font-medium">{attorney}</div>
            </div>
          ))}
        </div>
      </div>

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
          {profile.problems.map((problem, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-red-400">{idx + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{problem.title}</h3>
                  <p className="text-sm text-slate-400 mb-2">{problem.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-300 font-mono">
                      Impact: {problem.impact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
          {profile.systems.map((system, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl shrink-0">{system.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{system.name}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Problem It Solves</div>
                      <p className="text-sm text-slate-300">{system.problem_it_solves}</p>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">What It Does</div>
                      <p className="text-sm text-slate-300">{system.what_it_does}</p>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Impact</div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 text-sm font-medium">
                        <Zap size={14} />
                        {system.impact}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personalization */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target size={20} className="text-blue-400" />
          <h2 className="text-xl font-bold text-white">Demo Strategy</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <div className="text-xs text-blue-400 uppercase tracking-wider mb-1">Brand Tone</div>
            <div className="text-white font-medium">{profile.personalization.brand_tone}</div>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <div className="text-xs text-blue-400 uppercase tracking-wider mb-1">Messaging Style</div>
            <div className="text-white font-medium">{profile.personalization.messaging_style}</div>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <div className="text-xs text-blue-400 uppercase tracking-wider mb-1">Recommended Demo Angle</div>
            <div className="text-white">{profile.personalization.demo_angle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
