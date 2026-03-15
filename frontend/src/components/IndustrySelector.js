import { useDemo } from '../context/DemoContext';
import { getIndustryList } from '../data/industries';
import { Home, Sparkles, Thermometer, Smile, Car, HardHat, Scale, Building2, TreePine, Waves } from 'lucide-react';

const ICON_MAP = { Home, Sparkles, Thermometer, Smile, Car, HardHat, Scale, Building2, TreePine, Waves };

export default function IndustrySelector() {
  const { selectIndustry, companyName, setCompanyName } = useDemo();
  const industries = getIndustryList();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10" data-testid="industry-selector">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-6">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">Sales Experience Platform</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display tracking-tight mb-4">
          AI Workforce <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">OS</span>
        </h1>
        <p className="text-base md:text-lg text-slate-400 max-w-lg mx-auto">
          Select your prospect's industry to launch a personalized demo experience
        </p>
      </div>

      {/* Prospect Name Input */}
      <div className="w-full max-w-md mb-10 animate-fade-up stagger-2" style={{ opacity: 0, animationFillMode: 'forwards' }}>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter prospect company name..."
          className="w-full glass-input rounded-xl px-5 py-3.5 text-center font-mono text-sm"
          data-testid="prospect-name-input"
        />
      </div>

      {/* Industry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-5xl w-full">
        {industries.map((ind, i) => {
          const Icon = ICON_MAP[ind.icon] || Home;
          return (
            <button
              key={ind.id}
              onClick={() => selectIndustry(ind.id)}
              className="industry-card glass-panel glass-panel-hover p-5 flex flex-col items-center gap-3 cursor-pointer group animate-fade-up"
              style={{
                '--card-glow': ind.color,
                opacity: 0,
                animationFillMode: 'forwards',
                animationDelay: `${0.1 + i * 0.05}s`
              }}
              data-testid={`industry-card-${ind.id}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${ind.color}15`, color: ind.color }}
              >
                <Icon size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-white group-hover:text-white/90 transition-colors">{ind.name}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">{ind.agentCount} agents</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-xs text-slate-600 mt-10 font-mono animate-fade-up stagger-8" style={{ opacity: 0, animationFillMode: 'forwards' }}>
        Powered by AI Workforce OS — Internal Sales Tool
      </p>
    </div>
  );
}
