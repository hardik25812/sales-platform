import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { getIndustry } from '../data/industries';
import { calculateROI } from '../lib/calculations';
import { loadLawFirmProfile } from '../utils/profileLoader';

const DemoContext = createContext(null);

function getMetricAliases(industryId, key, value) {
  if (industryId !== 'construction' && industryId !== 'landscaping') return {};
  if (key === 'monthlyLeads') return { monthly_estimates_sent: value };
  if (key === 'avgJobValue') return { avg_job_value: value };
  if (key === 'currentCloseRate') return { estimate_to_job_rate: Math.round(value * 100) };
  return {};
}

export function DemoProvider({ children }) {
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [activeTab, setActiveTab] = useState('discovery');
  const [presentationMode, setPresentationMode] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [liveData, setLiveData] = useState(null);
  const [liveLoading, setLiveLoading] = useState(false);
  const [savedProfile, setSavedProfile] = useState(null);

  // Metrics state
  const [metrics, setMetrics] = useState({
    monthlyLeads: 150,
    avgJobValue: 12000,
    employees: 12,
    currentCloseRate: 0.15,
    currentResponseTime: 4.2,
    monthlyAdSpend: 5000,
    noShowRate: 18,
    missedCallsEstimate: 95
  });

  const industryConfig = useMemo(() => {
    if (!selectedIndustryId) return null;
    return getIndustry(selectedIndustryId);
  }, [selectedIndustryId]);

  const selectIndustry = useCallback((id) => {
    const config = getIndustry(id);
    if (config) {
      setSelectedIndustryId(id);
      setMetrics({ ...config.defaults });
      setSavedProfile(null);
      setActiveTab('discovery');
    }
  }, []);

  const selectSavedProfile = useCallback((profileId) => {
    const profile = loadLawFirmProfile(profileId);
    if (!profile) return;
    const industryId = profile.firm.industry_id || 'law_firm';
    const config = getIndustry(industryId);
    if (config) {
      setSelectedIndustryId(industryId);
      setMetrics({ ...config.defaults, ...(profile.metrics || {}) });
      setSavedProfile(profile);
      setCompanyName(profile.firm.name);
      const discoveryOnlyIndustries = ['indoor_environmental'];
      setActiveTab(discoveryOnlyIndustries.includes(industryId) ? 'discovery' : 'profile');
    }
  }, []);

  const updateMetric = useCallback((key, value) => {
    setMetrics(prev => ({
      ...prev,
      [key]: value,
      ...getMetricAliases(selectedIndustryId, key, value),
    }));
  }, [selectedIndustryId]);

  const roi = useMemo(() => {
    if (!industryConfig) return null;
    return calculateROI(metrics, industryConfig);
  }, [metrics, industryConfig]);

  const goBack = useCallback(() => {
    setSelectedIndustryId(null);
    setCompanyName('');
    setContactName('');
    setSavedProfile(null);
    setActiveTab('discovery');
  }, []);

  const value = useMemo(() => ({
    selectedIndustryId,
    industryConfig,
    companyName,
    setCompanyName,
    contactName,
    setContactName,
    metrics,
    updateMetric,
    selectIndustry,
    roi,
    activeTab,
    setActiveTab,
    presentationMode,
    setPresentationMode,
    liveMode,
    setLiveMode,
    liveData,
    setLiveData,
    liveLoading,
    setLiveLoading,
    savedProfile,
    setSavedProfile,
    selectSavedProfile,
    goBack
  }), [selectedIndustryId, industryConfig, companyName, contactName, metrics, updateMetric, selectIndustry, selectSavedProfile, roi, activeTab, presentationMode, liveMode, liveData, liveLoading, savedProfile, goBack]);

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider');
  return context;
}
