import { useDemo } from '../context/DemoContext';
import { getIndustryList } from '../data/industries';
import { Home, Sparkles, Thermometer, Smile, Car, HardHat, Scale, Building2, TreePine, Waves } from 'lucide-react';

const ICON_MAP = { Home, Sparkles, Thermometer, Smile, Car, HardHat, Scale, Building2, TreePine, Waves };

// Industry-specific hero images
const INDUSTRY_IMAGES = {
  roofing: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600&q=80",
  medspa: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
  hvac: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
  dental: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
  auto_dealership: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
  construction: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  law_firm: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
  real_estate: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  landscaping: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80",
  pools: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80",
};

// Industry-specific taglines (pain-first approach)
const INDUSTRY_TAGLINES = {
  roofing: "Stop losing $14K jobs to missed calls",
  medspa: "Fill every consultation slot automatically",
  hvac: "Never miss an emergency call again",
  dental: "Keep every chair filled, every day",
  auto_dealership: "Turn every lead into a test drive",
  construction: "Win more bids, finish more projects",
  law_firm: "Capture every intake call 24/7",
  real_estate: "Never lose a lead to a faster agent",
  landscaping: "Fill your spring schedule by February",
  pools: "Close more pool builds, automatically",
};

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

      {/* Industry Grid - Updated with images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-6xl w-full">
        {industries.map((ind, i) => {
          const Icon = ICON_MAP[ind.icon] || Home;
          const bgImage = ind.heroImage || INDUSTRY_IMAGES[ind.id];
          const tagline = INDUSTRY_TAGLINES[ind.id] || ind.tagline;
          
          return (
            <button
              key={ind.id}
              onClick={() => selectIndustry(ind.id)}
              className="industry-card relative overflow-hidden rounded-2xl cursor-pointer group animate-fade-up h-48 md:h-56"
              style={{
                '--card-glow': ind.color,
                opacity: 0,
                animationFillMode: 'forwards',
                animationDelay: `${0.1 + i * 0.05}s`
              }}
              data-testid={`industry-card-${ind.id}`}
            >
              {/* Background Image with Blur */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${bgImage})`,
                }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 group-hover:from-black/80 group-hover:via-black/50 transition-all duration-300" />
              
              {/* Colored Glow on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ backgroundColor: ind.color }}
              />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-end p-4 text-center">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg backdrop-blur-sm"
                  style={{ 
                    backgroundColor: `${ind.color}30`, 
                    color: ind.color,
                    boxShadow: `0 0 20px ${ind.color}20`
                  }}
                >
                  <Icon size={24} />
                </div>
                
                {/* Name */}
                <p className="text-base font-bold text-white mb-1 drop-shadow-lg">{ind.name}</p>
                
                {/* Tagline */}
                <p className="text-xs text-white/80 leading-tight max-w-[140px] drop-shadow-md">{tagline}</p>
                
                {/* Agent/System count badge */}
                <div 
                  className="mt-2 px-2 py-0.5 rounded-full text-[10px] font-mono backdrop-blur-sm"
                  style={{ 
                    backgroundColor: `${ind.color}20`, 
                    color: ind.color,
                    border: `1px solid ${ind.color}30`
                  }}
                >
                  {ind.usesSystemsApproach ? `${ind.agentCount} systems` : `${ind.agentCount} AI agents`}
                </div>
              </div>
              
              {/* Border glow on hover */}
              <div 
                className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-opacity-50 transition-all duration-300 pointer-events-none"
                style={{ borderColor: `${ind.color}50` }}
              />
            </button>
          );
        })}
      </div>

    </div>
  );
}
