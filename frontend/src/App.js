import "@/App.css";
import { DemoProvider, useDemo } from './context/DemoContext';
import IndustrySelector from './components/IndustrySelector';
import DemoLayout from './components/DemoLayout';

function AppContent() {
  const { selectedIndustryId, industryConfig } = useDemo();

  // Determine orb colors based on industry
  const orbColor1 = industryConfig?.color || '#5b8def';
  const orbColor2 = industryConfig?.colorSecondary || '#a78bfa';

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#050508' }}>
      {/* Background Orbs */}
      <div className="orb orb-1" style={{ backgroundColor: orbColor1 }} />
      <div className="orb orb-2" style={{ backgroundColor: orbColor2 }} />
      <div className="orb orb-3" style={{ backgroundColor: orbColor1 }} />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Content */}
      <div className="relative z-10">
        {!selectedIndustryId ? <IndustrySelector /> : <DemoLayout />}
      </div>
    </div>
  );
}

function App() {
  return (
    <DemoProvider>
      <AppContent />
    </DemoProvider>
  );
}

export default App;
