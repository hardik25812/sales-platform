// ROI Calculation Engine for Sales Experience Platform

export function calculateROI(metrics, industry) {
  const monthlyLeads = metrics.monthlyLeads ?? 0;
  const avgJobValue = metrics.avgJobValue ?? 0;
  const employees = metrics.employees ?? 0;
  const currentCloseRate = metrics.currentCloseRate ?? 0;
  const currentResponseTime = metrics.currentResponseTime ?? 0;
  const monthlyAdSpend = metrics.monthlyAdSpend ?? 0;
  const noShowRate = metrics.noShowRate ?? 0;
  const missedCallsEstimate = metrics.missedCallsEstimate ?? 0;

  const roi = industry.roi;

  // MONEY BEING LOST
  const slowResponseLoss = monthlyLeads * 0.35 * avgJobValue * 0.10;
  const missedCallLoss = missedCallsEstimate * avgJobValue * currentCloseRate;
  const noFollowUpLoss = monthlyLeads * (1 - currentCloseRate) * avgJobValue * 0.08;
  const noShowLoss = (noShowRate / 100) * monthlyLeads * currentCloseRate * avgJobValue;
  const manualLaborWaste = employees * 5000 * 0.15;

  const totalMonthlyLoss = slowResponseLoss + missedCallLoss + noFollowUpLoss + noShowLoss + manualLaborWaste;

  // MONEY GAINED WITH AI
  const conversionLift = monthlyLeads * roi.conversionLift * avgJobValue;
  const recoveredLeads = (slowResponseLoss + missedCallLoss) * 0.40;
  const fteSavings = employees * 5000 * 0.15;
  const noShowReduction = noShowLoss * 0.70;

  const totalMonthlyGain = conversionLift + recoveredLeads + fteSavings + noShowReduction;

  // PAYBACK
  const setupCost = 6000;
  const paybackDays = totalMonthlyGain > 0 ? Math.ceil((setupCost / totalMonthlyGain) * 30) : 999;

  // PROJECTED METRICS
  const projectedCloseRate = currentCloseRate + roi.conversionLift;
  const projectedResponseTime = roi.avgResponseTimeAfter;

  // FTE equivalent
  const fteEquivalent = fteSavings > 0 ? Math.round((fteSavings / 5000) * 10) / 10 : 0;

  // 12-month projection
  const monthlyProjection = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const cumulativeGain = totalMonthlyGain * month;
    const netValue = cumulativeGain - setupCost;
    return {
      month,
      cumulativeGain: Math.round(cumulativeGain),
      netValue: Math.round(netValue),
      monthlyGain: Math.round(totalMonthlyGain)
    };
  });

  // Current vs projected comparison
  const currentMonthlyRevenue = monthlyLeads * currentCloseRate * avgJobValue;
  const projectedMonthlyRevenue = monthlyLeads * projectedCloseRate * avgJobValue;
  const currentOperationalCost = employees * 5000;
  const projectedOperationalCost = currentOperationalCost - fteSavings;

  return {
    losses: {
      slowResponseLoss: Math.round(slowResponseLoss),
      missedCallLoss: Math.round(missedCallLoss),
      noFollowUpLoss: Math.round(noFollowUpLoss),
      noShowLoss: Math.round(noShowLoss),
      manualLaborWaste: Math.round(manualLaborWaste),
      totalMonthlyLoss: Math.round(totalMonthlyLoss)
    },
    gains: {
      conversionLift: Math.round(conversionLift),
      recoveredLeads: Math.round(recoveredLeads),
      fteSavings: Math.round(fteSavings),
      noShowReduction: Math.round(noShowReduction),
      totalMonthlyGain: Math.round(totalMonthlyGain)
    },
    setupCost,
    paybackDays,
    projectedCloseRate: Math.round(projectedCloseRate * 100) / 100,
    projectedResponseTime,
    fteEquivalent,
    annualImpact: Math.round(totalMonthlyGain * 12),
    monthlyProjection,
    comparison: {
      currentMonthlyRevenue: Math.round(currentMonthlyRevenue),
      projectedMonthlyRevenue: Math.round(projectedMonthlyRevenue),
      currentOperationalCost: Math.round(currentOperationalCost),
      projectedOperationalCost: Math.round(projectedOperationalCost),
      currentNetProfit: Math.round(currentMonthlyRevenue - currentOperationalCost),
      projectedNetProfit: Math.round(projectedMonthlyRevenue - projectedOperationalCost + recoveredLeads)
    },
    // Quick summary stats for the discovery panel
    summary: {
      missedOpportunities: Math.round(totalMonthlyLoss),
      additionalRevenue: Math.round(totalMonthlyGain),
      leadsGoingCold: Math.round(monthlyLeads * 0.35 + missedCallsEstimate * 0.5),
      projectedCloseRatePercent: Math.round(projectedCloseRate * 100),
      currentResponseTime: `${currentResponseTime} hours`,
      projectedResponseTime: roi.avgResponseTimeAfter
    }
  };
}

// Format currency
export function formatCurrency(value) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${Math.round(value).toLocaleString()}`;
  return `$${Math.round(value)}`;
}

// Format number with commas
export function formatNumber(value) {
  return Math.round(value).toLocaleString();
}

// Format percentage
export function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}
