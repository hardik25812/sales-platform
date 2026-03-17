import { useEffect, useCallback } from 'react';
import { useDemo } from '../context/DemoContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { ArrowLeft, Search, AlertTriangle, Calendar, LayoutDashboard, GitBranch, Calculator, BookOpen, Rocket, Phone, Monitor, Eye } from 'lucide-react';
import DiscoveryPanel from './DiscoveryPanel';
import PainReveal from './PainReveal';
import DayInYourLife from './DayInYourLife';
import CommandCenter from './CommandCenter';
import WorkflowVisualizer from './WorkflowVisualizer';
import ROICalculator from './ROICalculator';
import CaseStudies from './CaseStudies';
import TrialCTA from './TrialCTA';
import LiveDemo from './LiveDemo';

const TAB_ITEMS = [
  { value: 'discovery', label: 'Your Numbers', icon: Search, key: '1' },
  { value: 'problems', label: 'Problems', icon: AlertTriangle, key: '2' },
  { value: 'day', label: 'Your Day', icon: Calendar, key: '3' },
  { value: 'command', label: 'AI Team', icon: LayoutDashboard, key: '4' },
  { value: 'roi', label: 'ROI', icon: Calculator, key: '5' },
  { value: 'workflow', label: 'How It Works', icon: GitBranch, key: '6' },
  { value: 'cases', label: 'Proof', icon: BookOpen, key: '7' },
  { value: 'trial', label: 'Free Trial', icon: Rocket, key: '8' },
];

export default function DemoLayout() {
  const { industryConfig, companyName, activeTab, setActiveTab, goBack, presentationMode, setPresentationMode } = useDemo();

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    // Number keys for tabs
    const idx = parseInt(e.key) - 1;
    if (idx >= 0 && idx < TAB_ITEMS.length) {
      setActiveTab(TAB_ITEMS[idx].value);
      return;
    }
    if (e.key.toLowerCase() === 'p') setPresentationMode(prev => !prev);
    if (e.key.toLowerCase() === 'f') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    }
    if (e.key.toLowerCase() === 'i') goBack();
  }, [setActiveTab, setPresentationMode, goBack]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!industryConfig) return null;

  return (
    <div className="min-h-screen relative z-10" data-testid="demo-layout">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/[0.06] rounded-none" data-testid="demo-navigation">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex items-center h-14 gap-4">
            {/* Back button + branding */}
            {!presentationMode && (
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={goBack} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors" data-testid="back-button">
                  <ArrowLeft size={18} className="text-slate-400" />
                </button>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">AI Workforce OS</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ backgroundColor: `${industryConfig.color}20`, color: industryConfig.color }}>
                    {industryConfig.name}
                  </span>
                </div>
              </div>
            )}

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="bg-transparent h-auto p-0 gap-1 flex-wrap justify-center">
                {TAB_ITEMS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="data-[state=active]:bg-white/[0.08] data-[state=active]:text-white data-[state=active]:shadow-none bg-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.04] rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                      data-testid={`tab-${tab.value}`}
                    >
                      <Icon size={14} className="mr-1.5" />
                      <span className="hidden md:inline">{tab.label}</span>
                      {!presentationMode && (
                        <span className="hidden lg:inline ml-1.5 text-[10px] font-mono text-slate-600">{tab.key}</span>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>

            {/* Right controls */}
            {!presentationMode && (
              <div className="flex items-center gap-2 shrink-0">
                {companyName && (
                  <span className="text-xs font-mono text-slate-500 hidden lg:block">
                    {companyName}
                  </span>
                )}
                <button
                  onClick={() => setPresentationMode(true)}
                  className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors text-slate-500 hover:text-slate-300"
                  title="Presentation Mode (P)"
                  data-testid="presentation-mode-btn"
                >
                  <Monitor size={16} />
                </button>
              </div>
            )}

            {presentationMode && (
              <button
                onClick={() => setPresentationMode(false)}
                className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors text-slate-500 hover:text-slate-300 shrink-0"
                title="Exit Presentation Mode"
                data-testid="exit-presentation-btn"
              >
                <Eye size={16} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="animate-fade-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          {activeTab === 'discovery' && <DiscoveryPanel />}
          {activeTab === 'problems' && <PainReveal />}
          {activeTab === 'day' && <DayInYourLife />}
          {activeTab === 'command' && <CommandCenter />}
          {activeTab === 'roi' && <ROICalculator />}
          {activeTab === 'workflow' && <WorkflowVisualizer />}
          {activeTab === 'cases' && <CaseStudies />}
          {activeTab === 'trial' && <TrialCTA />}
        </div>
      </main>
    </div>
  );
}
