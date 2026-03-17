import { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { Phone, Zap, CheckCircle, Loader2 } from 'lucide-react';

export default function LiveDemo() {
  const { industryConfig } = useDemo();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [callStatus, setCallStatus] = useState('idle'); // idle, calling, connected, completed
  const [error, setError] = useState('');

  if (!industryConfig) return null;

  const agents = industryConfig.agents || [];
  const primaryAgent = agents[0];

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError('');
  };

  const handleCall = async () => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setCallStatus('calling');
    setError('');

    // Simulate API call to Retell AI or similar service
    // In production, this would POST to your backend which calls Retell API
    setTimeout(() => {
      setCallStatus('connected');
      setTimeout(() => {
        setCallStatus('completed');
      }, 3000);
    }, 2000);
  };

  const resetDemo = () => {
    setCallStatus('idle');
    setPhoneNumber('');
    setSelectedAgent('');
  };

  return (
    <div className="space-y-8" data-testid="live-demo">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          🎯 Live Agent Demo
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          Experience the AI agent firsthand. Enter your phone number and we'll call you right now 
          to demonstrate the full qualification flow.
        </p>
      </div>

      {/* Demo Panel */}
      <div className="max-w-md mx-auto">
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/[0.06]">
          {callStatus === 'idle' && (
            <div className="space-y-6">
              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">+1</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="555-123-4567"
                    className="w-full pl-12 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-white/[0.15] focus:ring-1 focus:ring-white/[0.1] transition-all font-mono"
                    maxLength={12}
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-xs mt-2">{error}</p>
                )}
              </div>

              {/* Agent Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Select Agent
                </label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-white/[0.15] transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                  }}
                >
                  <option value="" className="bg-[#12121c]">{primaryAgent?.name || 'Lead Response Agent'}</option>
                  {agents.slice(0, 3).map((agent, idx) => (
                    <option key={idx} value={agent.name} className="bg-[#12121c]">
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Call Button */}
              <button
                onClick={handleCall}
                disabled={!phoneNumber}
                className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: phoneNumber 
                    ? `linear-gradient(135deg, ${industryConfig.color}, ${industryConfig.colorSecondary})`
                    : 'rgba(255,255,255,0.1)',
                }}
              >
                <Phone size={20} />
                Call Now
              </button>

              {/* Info */}
              <div className="text-center space-y-2">
                <p className="text-xs text-slate-500">
                  ⚡ Call will ring in ~5 seconds
                </p>
                <p className="text-xs text-slate-600">
                  The AI agent will run the full qualification flow on your phone.
                </p>
              </div>
            </div>
          )}

          {callStatus === 'calling' && (
            <div className="text-center py-8 space-y-4">
              <div className="relative inline-block">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${industryConfig.color}20` }}
                >
                  <Phone size={32} style={{ color: industryConfig.color }} />
                </div>
                <div 
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{ backgroundColor: industryConfig.color }}
                />
              </div>
              <div>
                <p className="text-white font-semibold">Initiating Call...</p>
                <p className="text-slate-400 text-sm">+1 {phoneNumber}</p>
              </div>
              <Loader2 className="animate-spin mx-auto text-slate-400" size={24} />
            </div>
          )}

          {callStatus === 'connected' && (
            <div className="text-center py-8 space-y-4">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: `${industryConfig.color}20` }}
              >
                <Zap size={32} style={{ color: industryConfig.color }} className="animate-pulse" />
              </div>
              <div>
                <p className="text-emerald-400 font-semibold">Call Connected!</p>
                <p className="text-slate-400 text-sm">AI Agent is speaking with you now</p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}

          {callStatus === 'completed' && (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle size={32} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-emerald-400 font-semibold">Demo Complete!</p>
                <p className="text-slate-400 text-sm">That's exactly how your leads will be handled</p>
              </div>
              <button
                onClick={resetDemo}
                className="px-6 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white text-sm transition-all"
              >
                Try Another Demo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* What Happens Section */}
      <div className="max-w-2xl mx-auto">
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 tracking-wider">
            WHAT HAPPENS WHEN WE CALL
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <div className="text-2xl mb-2">1️⃣</div>
              <div className="text-sm font-semibold text-white mb-1">AI Greets You</div>
              <div className="text-xs text-slate-500">Natural, friendly introduction as your company's representative</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <div className="text-2xl mb-2">2️⃣</div>
              <div className="text-sm font-semibold text-white mb-1">Qualifies Your Need</div>
              <div className="text-xs text-slate-500">Asks relevant questions to understand your situation</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <div className="text-2xl mb-2">3️⃣</div>
              <div className="text-sm font-semibold text-white mb-1">Books Appointment</div>
              <div className="text-xs text-slate-500">Schedules next steps and sends confirmation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="text-center">
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          This is a live demonstration using the same AI technology that will handle your leads. 
          Your phone number is only used for this demo and will not be stored.
        </p>
      </div>
    </div>
  );
}
