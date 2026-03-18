import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { getIndustry } from '../data/industries';
import { calculateROI } from '../lib/calculations';

const DemoContext = createContext(null);

export function DemoProvider({ children }) {
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [activeTab, setActiveTab] = useState('discovery');
  const [presentationMode, setPresentationMode] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [liveData, setLiveData] = useState(null);
  const [liveLoading, setLiveLoading] = useState(false);

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
      setMetrics({
        monthlyLeads: config.defaults.monthlyLeads,
        avgJobValue: config.defaults.avgJobValue,
        employees: config.defaults.employees,
        currentCloseRate: config.defaults.currentCloseRate,
        currentResponseTime: config.defaults.currentResponseTime,
        monthlyAdSpend: config.defaults.monthlyAdSpend,
        noShowRate: config.defaults.noShowRate,
        missedCallsEstimate: config.defaults.missedCallsEstimate
      });
      setActiveTab('discovery');
    }
  }, []);

  const updateMetric = useCallback((key, value) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
  }, []);

  const roi = useMemo(() => {
    if (!industryConfig) return null;
    return calculateROI(metrics, industryConfig);
  }, [metrics, industryConfig]);

  const goBack = useCallback(() => {
    setSelectedIndustryId(null);
    setCompanyName('');
    setContactName('');
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
    goBack
  }), [selectedIndustryId, industryConfig, companyName, contactName, metrics, updateMetric, selectIndustry, roi, activeTab, presentationMode, liveMode, liveData, liveLoading, goBack]);

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
