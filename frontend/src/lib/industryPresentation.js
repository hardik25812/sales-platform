const defaultPrimaryMetrics = [
  { key: 'monthlyLeads', label: 'Monthly Leads', min: 10, max: 1000, step: 5, format: 'number' },
  { key: 'avgJobValue', label: 'Average Job/Deal Value', min: 100, max: 100000, step: 100, format: 'currency' },
  { key: 'employees', label: 'Number of Employees', min: 1, max: 100, step: 1, format: 'number' },
  { key: 'currentCloseRate', label: 'Current Close Rate', min: 0.05, max: 0.5, step: 0.01, format: 'percent' },
  { key: 'currentResponseTime', label: 'Avg Response Time (hours)', min: 0.5, max: 24, step: 0.1, format: 'hours' },
  { key: 'monthlyAdSpend', label: 'Monthly Ad Spend', min: 0, max: 50000, step: 250, format: 'currency' },
];

const defaultOptionalMetrics = [
  { key: 'noShowRate', label: 'No-Show Rate', min: 0, max: 40, step: 1, format: 'percentageNumber' },
  { key: 'missedCallsEstimate', label: 'Monthly Missed Calls', min: 0, max: 500, step: 5, format: 'number' },
];

const discoveryConfig = {
  medspa: {
    primary: [
      { key: 'monthlyLeads', label: 'Monthly New Inquiries', min: 20, max: 600, step: 5, format: 'number' },
      { key: 'avgJobValue', label: 'Average Treatment Value', min: 100, max: 10000, step: 50, format: 'currency' },
      { key: 'employees', label: 'Providers + Front Desk Team', min: 2, max: 50, step: 1, format: 'number' },
      { key: 'currentCloseRate', label: 'Consult-to-Booking Rate', min: 0.05, max: 0.7, step: 0.01, format: 'percent' },
      { key: 'currentResponseTime', label: 'Avg Reply Time to DMs/Leads', min: 0.1, max: 24, step: 0.1, format: 'hours' },
      { key: 'monthlyAdSpend', label: 'Monthly Promo Spend', min: 0, max: 50000, step: 250, format: 'currency' },
    ],
    optional: [
      { key: 'noShowRate', label: 'No-Show / Late Cancel Rate', min: 0, max: 40, step: 1, format: 'percentageNumber' },
      { key: 'missedCallsEstimate', label: 'Unhandled DMs / Calls per Month', min: 0, max: 500, step: 5, format: 'number' },
    ],
  },
  hvac: {
    primary: [
      { key: 'monthlyLeads', label: 'Monthly Service Opportunities', min: 20, max: 1000, step: 5, format: 'number' },
      { key: 'avgJobValue', label: 'Average Ticket / Replacement Value', min: 100, max: 30000, step: 100, format: 'currency' },
      { key: 'employees', label: 'Techs + Dispatch Team', min: 2, max: 100, step: 1, format: 'number' },
      { key: 'currentCloseRate', label: 'Repair / Replacement Close Rate', min: 0.05, max: 0.6, step: 0.01, format: 'percent' },
      { key: 'currentResponseTime', label: 'Avg Dispatch Response Time', min: 0.1, max: 24, step: 0.1, format: 'hours' },
      { key: 'monthlyAdSpend', label: 'Monthly Marketing Spend', min: 0, max: 50000, step: 250, format: 'currency' },
    ],
    optional: [
      { key: 'noShowRate', label: 'Booked Call No-Show / Delay Rate', min: 0, max: 40, step: 1, format: 'percentageNumber' },
      { key: 'missedCallsEstimate', label: 'Missed Emergency Calls per Month', min: 0, max: 500, step: 5, format: 'number' },
    ],
  },
  construction: {
    primary: [
      { key: 'monthlyLeads', label: 'Monthly New Opportunities', min: 5, max: 250, step: 1, format: 'number' },
      { key: 'avgJobValue', label: 'Average Project Value', min: 1000, max: 250000, step: 500, format: 'currency' },
      { key: 'employees', label: 'Field + Office Team', min: 1, max: 100, step: 1, format: 'number' },
      { key: 'currentCloseRate', label: 'Bid Win Rate', min: 0.05, max: 0.6, step: 0.01, format: 'percent' },
      { key: 'currentResponseTime', label: 'Avg First Response Time', min: 0.1, max: 72, step: 0.5, format: 'hours' },
      { key: 'monthlyAdSpend', label: 'Monthly Lead Spend', min: 0, max: 50000, step: 250, format: 'currency' },
    ],
    optional: [
      { key: 'projects_active', label: 'Active Projects', min: 1, max: 50, step: 1, format: 'number' },
      { key: 'avg_project_delay_days', label: 'Average Delay Days per Project', min: 0, max: 30, step: 1, format: 'number' },
      { key: 'margin_loss_from_changes', label: 'Margin Loss from Untracked Changes', min: 0, max: 40, step: 1, format: 'percentageNumber' },
    ],
  },
  law_firm: {
    primary: [
      { key: 'monthlyLeads', label: 'Monthly Qualified Inquiries', min: 10, max: 500, step: 5, format: 'number' },
      { key: 'avgJobValue', label: 'Average Case Value', min: 1000, max: 100000, step: 500, format: 'currency' },
      { key: 'employees', label: 'Attorneys + Intake Team', min: 1, max: 100, step: 1, format: 'number' },
      { key: 'currentCloseRate', label: 'Consult-to-Retainer Rate', min: 0.05, max: 0.6, step: 0.01, format: 'percent' },
      { key: 'currentResponseTime', label: 'Avg Intake Response Time', min: 0.1, max: 24, step: 0.1, format: 'hours' },
      { key: 'monthlyAdSpend', label: 'Monthly Intake Marketing Spend', min: 0, max: 50000, step: 250, format: 'currency' },
    ],
    optional: [
      { key: 'noShowRate', label: 'Consult No-Show Rate', min: 0, max: 40, step: 1, format: 'percentageNumber' },
      { key: 'missedCallsEstimate', label: 'Missed Intakes per Month', min: 0, max: 500, step: 5, format: 'number' },
    ],
  },
  dental: {
    primary: [
      { key: 'monthlyLeads', label: 'Monthly New Patient Opportunities', min: 20, max: 800, step: 5, format: 'number' },
      { key: 'avgJobValue', label: 'Average Production per Accepted Case', min: 100, max: 15000, step: 50, format: 'currency' },
      { key: 'employees', label: 'Providers + Front Desk Team', min: 2, max: 80, step: 1, format: 'number' },
      { key: 'currentCloseRate', label: 'Treatment Acceptance Rate', min: 0.05, max: 0.8, step: 0.01, format: 'percent' },
      { key: 'currentResponseTime', label: 'Avg New Patient Response Time', min: 0.1, max: 24, step: 0.1, format: 'hours' },
      { key: 'monthlyAdSpend', label: 'Monthly Patient Acquisition Spend', min: 0, max: 50000, step: 250, format: 'currency' },
    ],
    optional: [
      { key: 'noShowRate', label: 'No-Show / Late Cancel Rate', min: 0, max: 40, step: 1, format: 'percentageNumber' },
      { key: 'missedCallsEstimate', label: 'Missed New Patient Calls per Month', min: 0, max: 500, step: 5, format: 'number' },
    ],
  },
  real_estate: {
    primary: [
      { key: 'monthlyLeads', label: 'Monthly Buyer / Seller Leads', min: 20, max: 1500, step: 5, format: 'number' },
      { key: 'avgJobValue', label: 'Average Commission Value', min: 500, max: 50000, step: 100, format: 'currency' },
      { key: 'employees', label: 'Agents + ISA / Ops Team', min: 1, max: 100, step: 1, format: 'number' },
      { key: 'currentCloseRate', label: 'Lead-to-Close Rate', min: 0.02, max: 0.4, step: 0.01, format: 'percent' },
      { key: 'currentResponseTime', label: 'Avg Portal Lead Response Time', min: 0.1, max: 24, step: 0.1, format: 'hours' },
      { key: 'monthlyAdSpend', label: 'Monthly Lead Gen Spend', min: 0, max: 50000, step: 250, format: 'currency' },
    ],
    optional: [
      { key: 'noShowRate', label: 'Showing / Consult No-Show Rate', min: 0, max: 40, step: 1, format: 'percentageNumber' },
      { key: 'missedCallsEstimate', label: 'Unworked Inquiries per Month', min: 0, max: 500, step: 5, format: 'number' },
    ],
  },
  landscaping: {
    primary: [
      { key: 'monthlyLeads', label: 'Monthly Estimate Opportunities', min: 10, max: 400, step: 5, format: 'number' },
      { key: 'avgJobValue', label: 'Average Project / Contract Value', min: 100, max: 25000, step: 50, format: 'currency' },
      { key: 'employees', label: 'Crew + Office Team', min: 1, max: 80, step: 1, format: 'number' },
      { key: 'currentCloseRate', label: 'Estimate-to-Job Rate', min: 0.05, max: 0.7, step: 0.01, format: 'percent' },
      { key: 'currentResponseTime', label: 'Avg Lead Response Time', min: 0.1, max: 24, step: 0.1, format: 'hours' },
      { key: 'monthlyAdSpend', label: 'Monthly Marketing Spend', min: 0, max: 25000, step: 100, format: 'currency' },
    ],
    optional: [
      { key: 'recurring_contracts', label: 'Active Recurring Contracts', min: 0, max: 500, step: 5, format: 'number' },
      { key: 'monthly_services', label: 'Monthly Service Visits', min: 0, max: 2000, step: 10, format: 'number' },
      { key: 'seasonal_revenue_drop', label: 'Off-Season Revenue Drop', min: 0, max: 60, step: 1, format: 'percentageNumber' },
    ],
  },
  pools: {
    primary: [
      { key: 'monthlyLeads', label: 'Monthly Build / Service Inquiries', min: 5, max: 250, step: 1, format: 'number' },
      { key: 'avgJobValue', label: 'Average Pool Project Value', min: 1000, max: 150000, step: 500, format: 'currency' },
      { key: 'employees', label: 'Sales + Production Team', min: 1, max: 80, step: 1, format: 'number' },
      { key: 'currentCloseRate', label: 'Consult-to-Contract Rate', min: 0.05, max: 0.5, step: 0.01, format: 'percent' },
      { key: 'currentResponseTime', label: 'Avg Inquiry Response Time', min: 0.1, max: 48, step: 0.1, format: 'hours' },
      { key: 'monthlyAdSpend', label: 'Monthly Lead Spend', min: 0, max: 50000, step: 250, format: 'currency' },
    ],
    optional: [
      { key: 'noShowRate', label: 'Design Consult No-Show Rate', min: 0, max: 40, step: 1, format: 'percentageNumber' },
      { key: 'missedCallsEstimate', label: 'Missed Inquiries per Month', min: 0, max: 500, step: 5, format: 'number' },
    ],
  },
};

export function getDiscoveryMetricGroups(industryId) {
  const config = discoveryConfig[industryId];
  return {
    primary: config?.primary || defaultPrimaryMetrics,
    optional: config?.optional || defaultOptionalMetrics,
  };
}

export function getTeamUnitLabel(industryConfig) {
  return industryConfig?.usesSystemsApproach ? 'systems' : 'agents';
}

export function getTeamCount(industryConfig, departments = []) {
  if (departments.length) {
    return departments.reduce((sum, dept) => sum + (dept.agents?.length || 0), 0);
  }
  return industryConfig?.agents?.length || 0;
}

function buildDefaultPainCards(metrics) {
  const missedLeadCount = Math.round(metrics.missedCallsEstimate || 0);
  const missedCallRevenue = missedLeadCount * (metrics.avgJobValue || 0) * (metrics.currentCloseRate || 0);
  const slowResponseLoss = (metrics.monthlyLeads || 0) * 0.21 * (metrics.avgJobValue || 0) * (metrics.currentCloseRate || 0) * 0.3;
  const noFollowUpLoss = (metrics.monthlyLeads || 0) * 0.48 * (metrics.avgJobValue || 0) * (metrics.currentCloseRate || 0) * 0.25;
  const noShowLoss = (metrics.monthlyLeads || 0) * ((metrics.noShowRate || 0) / 100) * (metrics.avgJobValue || 0) * (metrics.currentCloseRate || 0);
  return [
    { icon: 'PhoneOff', title: 'MISSED INBOUND DEMAND', highlight: `${missedLeadCount}`, description: 'calls, texts, or form leads slip through every month while the team is busy.', calculation: 'Those buyers usually call the next option immediately.', cost: missedCallRevenue, costLabel: 'in opportunities that go to a competitor first', barPercent: Math.min(100, Math.round((missedLeadCount / Math.max(metrics.monthlyLeads || 1, 1)) * 100)) },
    { icon: 'Clock', title: 'SLOW RESPONSE WINDOW', highlight: `${metrics.currentResponseTime || 0} hours`, description: 'your average first response time across new demand.', calculation: 'Fast-response businesses win the highest-intent conversations first.', cost: slowResponseLoss, costLabel: 'lost because someone else responds sooner', barPercent: Math.min(100, Math.round((metrics.currentResponseTime || 0) * 12)) },
    { icon: 'FileX', title: 'UNWORKED OPPORTUNITIES', highlight: `${Math.round((1 - (metrics.currentCloseRate || 0)) * 100)}%`, description: 'of open opportunities never get fully worked into a real buying conversation.', calculation: 'Most deals are lost in the gap between quote, follow-up, and decision support.', cost: noFollowUpLoss, costLabel: 'left sitting in open estimates or stale pipelines', barPercent: Math.round((1 - (metrics.currentCloseRate || 0)) * 100) },
    { icon: 'UserX', title: 'NO-SHOW / DROP-OFF', highlight: `${metrics.noShowRate || 0}%`, description: 'of booked appointments disappear without the right reminders and confirmation flow.', calculation: 'Every empty slot is wasted team time and wasted ad spend.', cost: noShowLoss, costLabel: 'lost in no-shows and preventable drop-offs', barPercent: metrics.noShowRate || 0 },
  ];
}

function buildMedspaPainCards(metrics) {
  const missedInquiryLoss = (metrics.missedCallsEstimate || 0) * (metrics.avgJobValue || 0) * 0.45;
  const consultGapLoss = (metrics.monthlyLeads || 0) * Math.max(0, 0.55 - (metrics.currentCloseRate || 0)) * (metrics.avgJobValue || 0);
  const noShowLoss = (metrics.monthlyLeads || 0) * ((metrics.noShowRate || 0) / 100) * (metrics.avgJobValue || 0);
  const rebookLeakage = (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0) * 0.18;
  return [
    { icon: 'MessageSquareX', title: 'UNANSWERED DMS & CALLS', highlight: `${metrics.missedCallsEstimate || 0}`, description: 'high-intent aesthetic inquiries are missed across Instagram, text, and phone.', calculation: 'Most medspa demand happens after hours or between appointments.', cost: missedInquiryLoss, costLabel: 'lost when a prospect books with the first medspa that replies', barPercent: Math.min(100, Math.round(((metrics.missedCallsEstimate || 0) / Math.max(metrics.monthlyLeads || 1, 1)) * 100)) },
    { icon: 'FileX', title: 'CONSULTS THAT NEVER BOOK', highlight: `${Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100)}%`, description: 'of consultation volume is not converting into paid treatment plans.', calculation: 'Pricing clarity, financing, social proof, and tailored plans change this fast.', cost: consultGapLoss, costLabel: 'lost in consults that cool off after the visit', barPercent: Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100) },
    { icon: 'UserX', title: 'NO-SHOWS & LATE CANCELS', highlight: `${metrics.noShowRate || 0}%`, description: 'of consults or treatment slots disappear without deposits and reminder flows.', calculation: 'Every empty slot hurts provider utilization and same-day revenue.', cost: noShowLoss, costLabel: 'lost from preventable schedule gaps', barPercent: metrics.noShowRate || 0 },
    { icon: 'TrendingDown', title: 'PATIENT LTV LEAKAGE', highlight: 'Repeat care', description: 'patients are not being rebooked into memberships, series, or maintenance visits consistently.', calculation: 'Retention, memberships, and post-care outreach drive the real medspa upside.', cost: rebookLeakage, costLabel: 'left on the table when clients do one visit and disappear', barPercent: 42 },
  ];
}

function buildHvacPainCards(metrics) {
  const missedEmergencyLoss = (metrics.missedCallsEstimate || 0) * (metrics.avgJobValue || 0) * Math.max(metrics.currentCloseRate || 0, 0.18);
  const dispatchDelayLoss = (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0) * 0.08;
  const unsoldEstimateLoss = (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0) * Math.max(0, 0.35 - (metrics.currentCloseRate || 0));
  const agreementLeakage = (metrics.monthlyLeads || 0) * 189 * 0.3;
  return [
    { icon: 'PhoneOff', title: 'MISSED EMERGENCY CALLS', highlight: `${metrics.missedCallsEstimate || 0}`, description: 'high-value service or no-heat / no-cool calls never reach a real booking flow.', calculation: 'After-hours and peak-season demand goes to whoever answers first.', cost: missedEmergencyLoss, costLabel: 'lost when emergency demand hits voicemail', barPercent: Math.min(100, Math.round(((metrics.missedCallsEstimate || 0) / Math.max(metrics.monthlyLeads || 1, 1)) * 100)) },
    { icon: 'Clock', title: 'SLOW DISPATCH SPEED', highlight: `${metrics.currentResponseTime || 0} hours`, description: 'your average response time before a homeowner gets certainty and next steps.', calculation: 'Dispatch speed, ETA visibility, and route agility shape who wins the job.', cost: dispatchDelayLoss, costLabel: 'lost because the office and field are reacting instead of routing', barPercent: Math.min(100, Math.round((metrics.currentResponseTime || 0) * 12)) },
    { icon: 'FileX', title: 'UNSOLD REPLACEMENT QUOTES', highlight: `${Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100)}%`, description: 'of repair and replacement opportunities are not getting closed consistently.', calculation: 'Financing, estimate follow-up, and timing control the replacement game.', cost: unsoldEstimateLoss, costLabel: 'left in unsold estimates and stalled replacement deals', barPercent: Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100) },
    { icon: 'TrendingDown', title: 'AGREEMENT REVENUE LEAKAGE', highlight: 'Memberships', description: 'maintenance plan renewals and post-service upsells are not systemized.', calculation: 'Recurring agreement revenue stabilizes the schedule and boosts lifetime value.', cost: agreementLeakage, costLabel: 'left on the table from weak agreement sales and renewals', barPercent: 38 },
  ];
}

function buildConstructionPainCards(metrics) {
  const projectsActive = metrics.projects_active ?? metrics.projectsActive ?? 0;
  const avgProjectDelayDays = metrics.avg_project_delay_days ?? metrics.avgProjectDelayDays ?? 0;
  const marginLossFromChanges = metrics.margin_loss_from_changes ?? metrics.marginLossFromChanges ?? 0;
  const responseLoss = (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0) * 0.12;
  const bidLoss = (metrics.monthlyLeads || 0) * Math.max(0, 0.4 - (metrics.currentCloseRate || 0)) * (metrics.avgJobValue || 0);
  const marginLeakage = projectsActive * (marginLossFromChanges / 100) * (metrics.avgJobValue || 0);
  const delayCost = projectsActive * avgProjectDelayDays * 500;
  return [
    { icon: 'PhoneOff', title: 'SLOW FIRST RESPONSE', highlight: `${metrics.currentResponseTime || 0} hours`, description: 'new homeowner or commercial inquiries wait too long while the team is in the field.', calculation: 'Fast contact wins site visits. Slow contact gets shopped to another contractor.', cost: responseLoss, costLabel: 'lost because opportunities age before anyone works them', barPercent: Math.min(100, Math.round((metrics.currentResponseTime || 0) * 8)) },
    { icon: 'FileX', title: 'LOW BID WIN RATE', highlight: `${Math.round((metrics.currentCloseRate || 0) * 100)}%`, description: 'too many opportunities are being estimated without a structured close process.', calculation: 'Estimate speed, scope clarity, financing, and selective follow-up all affect wins.', cost: bidLoss, costLabel: 'left in bids that never turn into signed jobs', barPercent: 100 - Math.round((metrics.currentCloseRate || 0) * 100) },
    { icon: 'TrendingDown', title: 'UNTRACKED CHANGE LOSS', highlight: `${marginLossFromChanges}%`, description: 'margin is leaking through verbal scope changes and delayed approvals.', calculation: 'Every undocumented change order eats gross profit you already earned.', cost: marginLeakage, costLabel: 'lost from scope creep and unbilled project changes', barPercent: marginLossFromChanges },
    { icon: 'Clock', title: 'PROJECT DELAY EXPOSURE', highlight: `${avgProjectDelayDays} days`, description: 'average timeline slippage caused by misaligned subs, approvals, and client communication.', calculation: 'Delay costs stack up in overhead, rescheduling, and reputation damage.', cost: delayCost, costLabel: 'burned in preventable schedule drift', barPercent: Math.min(100, avgProjectDelayDays * 5) },
  ];
}

function buildLawPainCards(metrics) {
  const missedIntakeLoss = (metrics.missedCallsEstimate || 0) * (metrics.avgJobValue || 0) * 0.5;
  const intakeDelayLoss = (metrics.monthlyLeads || 0) * 0.18 * (metrics.avgJobValue || 0);
  const retentionLoss = (metrics.monthlyLeads || 0) * Math.max(0, 0.4 - (metrics.currentCloseRate || 0)) * (metrics.avgJobValue || 0);
  const commsLoad = (metrics.employees || 0) * 1200;
  return [
    { icon: 'PhoneOff', title: 'MISSED LEGAL INTAKES', highlight: `${metrics.missedCallsEstimate || 0}`, description: 'qualified case inquiries never make it into a retained-client workflow.', calculation: 'High-value PI, construction, and accident cases are usually won by the first firm that responds.', cost: missedIntakeLoss, costLabel: 'lost in unanswered calls and abandoned forms', barPercent: Math.min(100, Math.round(((metrics.missedCallsEstimate || 0) / Math.max(metrics.monthlyLeads || 1, 1)) * 100)) },
    { icon: 'Clock', title: 'SLOW INTAKE RESPONSE', highlight: `${metrics.currentResponseTime || 0} hours`, description: 'your average delay before a prospect gets guidance and next steps.', calculation: 'Fast intake builds trust before another firm signs the case.', cost: intakeDelayLoss, costLabel: 'lost when a prospect retains faster counsel', barPercent: Math.min(100, Math.round((metrics.currentResponseTime || 0) * 12)) },
    { icon: 'FileX', title: 'CONSULTS NOT RETAINED', highlight: `${Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100)}%`, description: 'of consult volume is not converting into signed retainers consistently.', calculation: 'Retainer speed, case scoring, and post-consult sequencing decide the outcome.', cost: retentionLoss, costLabel: 'left in consults that never become active matters', barPercent: Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100) },
    { icon: 'MessageSquareX', title: 'CLIENT COMMUNICATION LOAD', highlight: `${metrics.employees || 0} staff`, description: 'your team is still handling repetitive status-check work manually.', calculation: 'Proactive updates reduce bar-risk and free staff for higher-value legal work.', cost: commsLoad, costLabel: 'consumed in avoidable status-call and update work', barPercent: Math.min(100, (metrics.employees || 0) * 8) },
  ];
}

function buildDentalPainCards(metrics) {
  const missedPatientLoss = (metrics.missedCallsEstimate || 0) * (metrics.avgJobValue || 0) * 0.4;
  const noShowLoss = (metrics.monthlyLeads || 0) * ((metrics.noShowRate || 0) / 100) * (metrics.avgJobValue || 0);
  const treatmentLeakage = (metrics.monthlyLeads || 0) * Math.max(0, 0.45 - (metrics.currentCloseRate || 0)) * (metrics.avgJobValue || 0);
  const recallLeakage = (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0) * 0.16;
  return [
    { icon: 'PhoneOff', title: 'MISSED NEW PATIENT CALLS', highlight: `${metrics.missedCallsEstimate || 0}`, description: 'high-intent new patient calls and web inquiries are still slipping to other practices.', calculation: 'Evening and lunch-hour demand usually goes to whoever responds first.', cost: missedPatientLoss, costLabel: 'lost when new patients book a faster office', barPercent: Math.min(100, Math.round(((metrics.missedCallsEstimate || 0) / Math.max(metrics.monthlyLeads || 1, 1)) * 100)) },
    { icon: 'UserX', title: 'NO-SHOW CHAIR GAPS', highlight: `${metrics.noShowRate || 0}%`, description: 'chairs go empty because reminders, confirmations, and waitlist fill are too manual.', calculation: 'Every unused chair hour is production you cannot recover later.', cost: noShowLoss, costLabel: 'lost from preventable chair downtime', barPercent: metrics.noShowRate || 0 },
    { icon: 'FileX', title: 'UNACCEPTED TREATMENT', highlight: `${Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100)}%`, description: 'recommended treatment is not being converted with financing, urgency, and follow-up.', calculation: 'Case presentation and post-visit sequencing drive real production lift.', cost: treatmentLeakage, costLabel: 'left in diagnosed treatment that never gets scheduled', barPercent: Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100) },
    { icon: 'TrendingDown', title: 'RECALL / REACTIVATION LEAKAGE', highlight: 'Lapsed recall', description: 'hygiene and overdue patients are not being reactivated consistently.', calculation: 'Existing patients are cheaper to retain than constantly replacing them with new acquisition spend.', cost: recallLeakage, costLabel: 'left in unfinished recall and reactivation volume', barPercent: 35 },
  ];
}

function buildRealEstatePainCards(metrics) {
  const missedLeadLoss = (metrics.missedCallsEstimate || 0) * (metrics.avgJobValue || 0) * 0.35;
  const responseLoss = (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0) * 0.12;
  const nurtureLeakage = (metrics.monthlyLeads || 0) * Math.max(0, 0.18 - (metrics.currentCloseRate || 0)) * (metrics.avgJobValue || 0);
  const databaseLeakage = (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0) * 0.08;
  return [
    { icon: 'PhoneOff', title: 'PORTAL LEADS GO COLD', highlight: `${metrics.currentResponseTime || 0} hours`, description: 'online inquiries are dying before anyone works them properly.', calculation: 'Lead portals reward speed, persistence, and immediate scheduling.', cost: responseLoss, costLabel: 'lost because another agent replies first', barPercent: Math.min(100, Math.round((metrics.currentResponseTime || 0) * 12)) },
    { icon: 'MessageSquareX', title: 'UNWORKED INQUIRIES', highlight: `${metrics.missedCallsEstimate || 0}`, description: 'buyer and seller inquiries are not being nurtured across text, calls, and email.', calculation: 'Most real estate leads need long-tail follow-up before they are ready to move.', cost: missedLeadLoss, costLabel: 'lost when leads sit untouched in the CRM', barPercent: Math.min(100, Math.round(((metrics.missedCallsEstimate || 0) / Math.max(metrics.monthlyLeads || 1, 1)) * 100)) },
    { icon: 'FileX', title: 'SHOWINGS TO CLOSE LEAKAGE', highlight: `${Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100)}%`, description: 'too many active opportunities never reach signed contracts.', calculation: 'Appointment speed, nurture quality, and transaction coordination decide who closes.', cost: nurtureLeakage, costLabel: 'left in nurtures, offers, and stalled opportunities', barPercent: Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100) },
    { icon: 'TrendingDown', title: 'PAST CLIENT DATABASE DECAY', highlight: 'Repeat + referral', description: 'closed clients are not being turned into repeat business and referrals consistently.', calculation: 'The highest-margin real estate growth usually comes from nurture, not fresh cold leads.', cost: databaseLeakage, costLabel: 'left on the table from weak post-close nurture', barPercent: 32 },
  ];
}

function buildLandscapingPainCards(metrics) {
  const recurringContracts = metrics.recurring_contracts ?? 0;
  const monthlyServices = metrics.monthly_services ?? 0;
  const seasonalRevenueDrop = metrics.seasonal_revenue_drop ?? 0;
  const missedLeadLoss = (metrics.monthlyLeads || 0) * 0.24 * (metrics.avgJobValue || 0);
  const estimateLeakage = (metrics.monthlyLeads || 0) * Math.max(0, 0.45 - (metrics.currentCloseRate || 0)) * (metrics.avgJobValue || 0);
  const contractLeakage = recurringContracts * 0.2 * ((metrics.avgJobValue || 0) * 0.4);
  const routeWaste = monthlyServices * 18;
  return [
    { icon: 'PhoneOff', title: 'MISSED FIELD LEADS', highlight: `${metrics.currentResponseTime || 0} hours`, description: 'new inquiries wait too long because crews are on properties and nobody is working the phone fast enough.', calculation: 'The first landscaper to respond usually wins the site visit.', cost: missedLeadLoss, costLabel: 'lost because busy crews cannot respond in time', barPercent: Math.min(100, Math.round((metrics.currentResponseTime || 0) * 12)) },
    { icon: 'FileX', title: 'UNWON ESTIMATES', highlight: `${Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100)}%`, description: 'quotes are being sent without enough follow-up, optional upsells, and timing pressure.', calculation: 'Detailed quotes and automated reminders recover the jobs sitting in inboxes.', cost: estimateLeakage, costLabel: 'left in stale estimates and unclosed project bids', barPercent: Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100) },
    { icon: 'TrendingDown', title: 'RECURRING REVENUE CHURN', highlight: `${recurringContracts}`, description: 'maintenance clients and seasonal work are not being renewed or upsold proactively.', calculation: 'Recurring contracts smooth the seasonality that makes cash flow unpredictable.', cost: contractLeakage, costLabel: 'lost from lapsed contracts and missed seasonal upsells', barPercent: Math.min(100, Math.round((seasonalRevenueDrop / 60) * 100)) },
    { icon: 'Clock', title: 'ROUTE / WEATHER CHAOS', highlight: `${monthlyServices}`, description: 'too much crew time is being burned on reschedules, route inefficiency, and client updates.', calculation: 'Route optimization and proactive notifications recover hours every week.', cost: routeWaste, costLabel: 'burned in avoidable coordination and drive-time waste', barPercent: 36 },
  ];
}

function buildPoolsPainCards(metrics) {
  const missedLeadLoss = (metrics.missedCallsEstimate || 0) * (metrics.avgJobValue || 0) * 0.2;
  const consultLeakage = (metrics.monthlyLeads || 0) * Math.max(0, 0.22 - (metrics.currentCloseRate || 0)) * (metrics.avgJobValue || 0);
  const proposalLeakage = (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0) * 0.12;
  const serviceLeakage = (metrics.monthlyLeads || 0) * 250;
  return [
    { icon: 'DollarSign', title: 'HIGH-VALUE LEADS LOST', highlight: `${metrics.missedCallsEstimate || 0}`, description: 'pool build and renovation leads are expensive and disappear fast when inquiry handling is slow.', calculation: 'A single lost project can erase weeks of marketing spend.', cost: missedLeadLoss, costLabel: 'lost when premium inquiries slip through the cracks', barPercent: Math.min(100, Math.round(((metrics.missedCallsEstimate || 0) / Math.max(metrics.monthlyLeads || 1, 1)) * 100)) },
    { icon: 'Palette', title: 'DESIGN CONSULT DROP-OFF', highlight: `${Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100)}%`, description: 'too many consults and site visits are not turning into signed contracts.', calculation: 'Homeowners need faster follow-up, clearer scopes, and easier next steps.', cost: consultLeakage, costLabel: 'left in consultations that never become sold jobs', barPercent: Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100) },
    { icon: 'FileX', title: 'PROPOSALS STALL', highlight: 'Follow-up gap', description: 'design packages and proposals are getting sent without enough structured follow-up.', calculation: 'Pool and spa projects need long-cycle nurture, not one-and-done estimate sending.', cost: proposalLeakage, costLabel: 'left in proposals that cool off after the first touch', barPercent: 48 },
    { icon: 'TrendingDown', title: 'POST-BUILD REVENUE LEAKAGE', highlight: 'Service + accessories', description: 'recurring maintenance, upgrades, and seasonal promotions are not being systemized after the install.', calculation: 'The best pool companies monetize the whole lifecycle, not just the build.', cost: serviceLeakage, costLabel: 'left from weak post-build service and upsell motion', barPercent: 28 },
  ];
}

function buildIndoorEnvironmentalPainCards(metrics) {
  const missedInquiryLoss = (metrics.missedCallsEstimate || 0) * (metrics.avgJobValue || 0) * 0.55;
  const reviewGapLoss = (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0) * 0.06;
  const noRetestLoss = (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0) * 0.35;
  const referralLeakage = (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0) * 0.18;
  return [
    { icon: 'PhoneOff', title: 'AFTER-HOURS INQUIRIES LOST', highlight: `${metrics.missedCallsEstimate || 0}`, description: 'health-concern inquiries go unanswered while the inspector is in the field or off the clock.', calculation: 'Worried families book with the first inspector who responds — usually within minutes of their search.', cost: missedInquiryLoss, costLabel: 'in missed after-hours and field-time inquiries going to competitors', barPercent: Math.min(100, Math.round(((metrics.missedCallsEstimate || 0) / Math.max(metrics.monthlyLeads || 1, 1)) * 100)) },
    { icon: 'TrendingDown', title: 'GOOGLE REVIEWS NOT KEEPING PACE', highlight: '40–60%', description: 'of satisfied clients are never systematically asked for a review — leaving Google presence far below what completed jobs deserve.', calculation: 'Trust-based niches like IAQ live and die by Google reviews. Every job without a review is visibility handed to a competitor.', cost: reviewGapLoss, costLabel: 'in lost monthly intakes from stagnant Google review presence', barPercent: 58 },
    { icon: 'FileX', title: 'CLEARANCE RETESTS NOT BOOKED', highlight: `${Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100)}%`, description: 'of clients who receive an action-required report never follow up with a clearance test without a structured prompt.', calculation: 'Post-remediation clearance tests are a natural, high-margin follow-on — but they require the right message at the right time.', cost: noRetestLoss, costLabel: 'in clearance and follow-up tests not booked after action-required results', barPercent: Math.round(Math.max(0, 1 - (metrics.currentCloseRate || 0)) * 100) },
    { icon: 'UserX', title: 'REFERRAL PIPELINE UNTAPPED', highlight: 'Realtors + MDs', description: 'realtor, pediatrician, and remediation contractor referral partners are not being systematically nurtured — the highest-ROI growth channel is sitting idle.', calculation: 'One active realtor partner can send 15–20 inspections per year. Without a system, those relationships fade.', cost: referralLeakage, costLabel: 'in untapped referral revenue from unworked partner relationships', barPercent: 42 },
  ];
}

export function getPainCards(industryId, metrics) {
  if (industryId === 'medspa') return buildMedspaPainCards(metrics);
  if (industryId === 'hvac') return buildHvacPainCards(metrics);
  if (industryId === 'construction') return buildConstructionPainCards(metrics);
  if (industryId === 'law_firm') return buildLawPainCards(metrics);
  if (industryId === 'dental') return buildDentalPainCards(metrics);
  if (industryId === 'real_estate') return buildRealEstatePainCards(metrics);
  if (industryId === 'landscaping') return buildLandscapingPainCards(metrics);
  if (industryId === 'pools') return buildPoolsPainCards(metrics);
  if (industryId === 'indoor_environmental') return buildIndoorEnvironmentalPainCards(metrics);
  return buildDefaultPainCards(metrics);
}

function buildDefaultCommandStats(roi) {
  return [
    { label: 'Monthly Revenue Potential', value: roi.gains.totalMonthlyGain, type: 'currency', color: 'text-emerald-400', icon: 'TrendingUp' },
    { label: 'Projected Close Rate', value: roi.projectedCloseRate * 100, type: 'percent', color: 'text-blue-400', icon: 'Target' },
    { label: 'Response Time', display: roi.projectedResponseTime, color: 'text-cyan-400', icon: 'Zap' },
    { label: 'FTE Savings', value: roi.fteEquivalent, type: 'number', suffix: ' FTE', color: 'text-violet-400', icon: 'Users' },
  ];
}

function buildConstructionStats(roi, metrics) {
  const projectsActive = metrics.projects_active ?? metrics.projectsActive ?? 0;
  const marginLossFromChanges = metrics.margin_loss_from_changes ?? metrics.marginLossFromChanges ?? 0;
  return [
    { label: 'Captured Revenue', value: roi.gains.totalMonthlyGain, type: 'currency', color: 'text-emerald-400', icon: 'TrendingUp' },
    { label: 'Projected Bid Win Rate', value: roi.projectedCloseRate * 100, type: 'percent', color: 'text-blue-400', icon: 'Target' },
    { label: 'Active Projects', value: projectsActive, type: 'number', suffix: ' live', color: 'text-cyan-400', icon: 'HardHat' },
    { label: 'Margin at Risk', value: projectsActive * (marginLossFromChanges / 100) * (metrics.avgJobValue || 0), type: 'currency', color: 'text-violet-400', icon: 'BarChart3' },
  ];
}

function buildMedspaStats(roi, metrics) {
  return [
    { label: 'Monthly Revenue Lift', value: roi.gains.totalMonthlyGain, type: 'currency', color: 'text-emerald-400', icon: 'TrendingUp' },
    { label: 'Projected Booking Rate', value: roi.projectedCloseRate * 100, type: 'percent', color: 'text-blue-400', icon: 'Target' },
    { label: 'First Reply Speed', display: roi.projectedResponseTime, color: 'text-cyan-400', icon: 'Zap' },
    { label: 'Recovered No-Shows', value: (metrics.monthlyLeads || 0) * ((metrics.noShowRate || 0) / 100), type: 'number', suffix: ' appts', color: 'text-violet-400', icon: 'CalendarCheck' },
  ];
}

function buildHvacStats(roi, metrics) {
  return [
    { label: 'Monthly Revenue Lift', value: roi.gains.totalMonthlyGain, type: 'currency', color: 'text-emerald-400', icon: 'TrendingUp' },
    { label: 'Projected Close Rate', value: roi.projectedCloseRate * 100, type: 'percent', color: 'text-blue-400', icon: 'Target' },
    { label: 'Dispatch Speed', display: roi.projectedResponseTime, color: 'text-cyan-400', icon: 'Zap' },
    { label: 'Agreement Revenue', value: (metrics.monthlyLeads || 0) * 0.3 * 189, type: 'currency', color: 'text-violet-400', icon: 'Wrench' },
  ];
}

function buildLawStats(roi) {
  return [
    { label: 'Recovered Case Value', value: roi.gains.totalMonthlyGain, type: 'currency', color: 'text-emerald-400', icon: 'TrendingUp' },
    { label: 'Projected Retainer Rate', value: roi.projectedCloseRate * 100, type: 'percent', color: 'text-blue-400', icon: 'Target' },
    { label: 'Intake Speed', display: roi.projectedResponseTime, color: 'text-cyan-400', icon: 'Zap' },
    { label: 'Staff Time Saved', value: roi.fteEquivalent, type: 'number', suffix: ' FTE', color: 'text-violet-400', icon: 'Users' },
  ];
}

function buildDentalStats(roi, metrics) {
  return [
    { label: 'Recovered Production', value: roi.gains.totalMonthlyGain, type: 'currency', color: 'text-emerald-400', icon: 'TrendingUp' },
    { label: 'Projected Acceptance', value: roi.projectedCloseRate * 100, type: 'percent', color: 'text-blue-400', icon: 'Target' },
    { label: 'Chair Fill Speed', display: roi.projectedResponseTime, color: 'text-cyan-400', icon: 'Zap' },
    { label: 'Saved Chair Visits', value: (metrics.monthlyLeads || 0) * ((metrics.noShowRate || 0) / 100), type: 'number', suffix: ' visits', color: 'text-violet-400', icon: 'CalendarCheck' },
  ];
}

function buildRealEstateStats(roi, metrics) {
  return [
    { label: 'Commission Lift', value: roi.gains.totalMonthlyGain, type: 'currency', color: 'text-emerald-400', icon: 'TrendingUp' },
    { label: 'Projected Close Rate', value: roi.projectedCloseRate * 100, type: 'percent', color: 'text-blue-400', icon: 'Target' },
    { label: 'Lead Response Speed', display: roi.projectedResponseTime, color: 'text-cyan-400', icon: 'Zap' },
    { label: 'Nurture Capacity', value: metrics.monthlyLeads || 0, type: 'number', suffix: ' leads', color: 'text-violet-400', icon: 'Users' },
  ];
}

function buildLandscapingStats(roi, metrics) {
  return [
    { label: 'Monthly Revenue Lift', value: roi.gains.totalMonthlyGain, type: 'currency', color: 'text-emerald-400', icon: 'TrendingUp' },
    { label: 'Projected Win Rate', value: roi.projectedCloseRate * 100, type: 'percent', color: 'text-blue-400', icon: 'Target' },
    { label: 'Lead Response Speed', display: roi.projectedResponseTime, color: 'text-cyan-400', icon: 'Zap' },
    { label: 'Recurring Contracts', value: metrics.recurring_contracts ?? 0, type: 'number', suffix: ' active', color: 'text-violet-400', icon: 'RefreshCw' },
  ];
}

function buildPoolsStats(roi, metrics) {
  return [
    { label: 'Monthly Revenue Lift', value: roi.gains.totalMonthlyGain, type: 'currency', color: 'text-emerald-400', icon: 'TrendingUp' },
    { label: 'Projected Contract Rate', value: roi.projectedCloseRate * 100, type: 'percent', color: 'text-blue-400', icon: 'Target' },
    { label: 'Inquiry Response Speed', display: roi.projectedResponseTime, color: 'text-cyan-400', icon: 'Zap' },
    { label: 'Pipeline Value', value: (metrics.monthlyLeads || 0) * (metrics.avgJobValue || 0), type: 'currency', color: 'text-violet-400', icon: 'Waves' },
  ];
}

function buildIndoorEnvironmentalStats(roi, metrics) {
  return [
    { label: 'Monthly Revenue Lift', value: roi.gains.totalMonthlyGain, type: 'currency', color: 'text-emerald-400', icon: 'TrendingUp' },
    { label: 'Projected Booking Rate', value: roi.projectedCloseRate * 100, type: 'percent', color: 'text-teal-400', icon: 'Target' },
    { label: 'First Response Speed', display: roi.projectedResponseTime, color: 'text-cyan-400', icon: 'Zap' },
    { label: 'Clearance Retests Booked', value: Math.round((metrics.monthlyLeads || 0) * 0.41), type: 'number', suffix: ' /mo', color: 'text-violet-400', icon: 'RefreshCw' },
  ];
}

export function getCommandStats(industryId, roi, metrics) {
  if (industryId === 'construction') return buildConstructionStats(roi, metrics);
  if (industryId === 'medspa') return buildMedspaStats(roi, metrics);
  if (industryId === 'hvac') return buildHvacStats(roi, metrics);
  if (industryId === 'law_firm') return buildLawStats(roi);
  if (industryId === 'dental') return buildDentalStats(roi, metrics);
  if (industryId === 'real_estate') return buildRealEstateStats(roi, metrics);
  if (industryId === 'landscaping') return buildLandscapingStats(roi, metrics);
  if (industryId === 'pools') return buildPoolsStats(roi, metrics);
  if (industryId === 'indoor_environmental') return buildIndoorEnvironmentalStats(roi, metrics);
  return buildDefaultCommandStats(roi);
}

function buildDefaultPipeline(metrics, roi) {
  const leadCount = metrics.monthlyLeads || 0;
  return [
    { name: 'Leads', value: leadCount, pct: 100 },
    { name: 'Contacted', value: Math.round(leadCount * 0.92), pct: 92 },
    { name: 'Qualified', value: Math.round(leadCount * 0.65), pct: 65 },
    { name: 'Proposal', value: Math.round(leadCount * 0.4), pct: 40 },
    { name: 'Closed', value: Math.round(leadCount * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
  ];
}

function buildMedspaPipeline(metrics, roi) {
  const leadCount = metrics.monthlyLeads || 0;
  return [
    { name: 'Inquiries', value: leadCount, pct: 100 },
    { name: 'Qualified', value: Math.round(leadCount * 0.74), pct: 74 },
    { name: 'Consults', value: Math.round(leadCount * 0.52), pct: 52 },
    { name: 'Booked', value: Math.round(leadCount * 0.38), pct: 38 },
    { name: 'Treatments', value: Math.round(leadCount * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
  ];
}

function buildHvacPipeline(metrics, roi) {
  const leadCount = metrics.monthlyLeads || 0;
  return [
    { name: 'Calls', value: leadCount, pct: 100 },
    { name: 'Booked', value: Math.round(leadCount * 0.9), pct: 90 },
    { name: 'Dispatched', value: Math.round(leadCount * 0.82), pct: 82 },
    { name: 'Quoted', value: Math.round(leadCount * 0.42), pct: 42 },
    { name: 'Closed', value: Math.round(leadCount * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
  ];
}

function buildConstructionPipeline(metrics, roi) {
  const leadCount = metrics.monthlyLeads || 0;
  return [
    { name: 'Opportunities', value: leadCount, pct: 100 },
    { name: 'Qualified', value: Math.round(leadCount * 0.88), pct: 88 },
    { name: 'Site Visits', value: Math.round(leadCount * 0.62), pct: 62 },
    { name: 'Estimates', value: Math.round(leadCount * 0.48), pct: 48 },
    { name: 'Won Jobs', value: Math.round(leadCount * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
  ];
}

function buildLawPipeline(metrics, roi) {
  const leadCount = metrics.monthlyLeads || 0;
  return [
    { name: 'Inquiries', value: leadCount, pct: 100 },
    { name: 'Qualified', value: Math.round(leadCount * 0.7), pct: 70 },
    { name: 'Consults', value: Math.round(leadCount * 0.46), pct: 46 },
    { name: 'Retainers', value: Math.round(leadCount * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
    { name: 'Active Cases', value: Math.round(leadCount * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
  ];
}

function buildDentalPipeline(metrics, roi) {
  const leadCount = metrics.monthlyLeads || 0;
  return [
    { name: 'Inquiries', value: leadCount, pct: 100 },
    { name: 'Booked', value: Math.round(leadCount * 0.78), pct: 78 },
    { name: 'Showed', value: Math.round(leadCount * (1 - ((metrics.noShowRate || 0) / 100))), pct: Math.round((1 - ((metrics.noShowRate || 0) / 100)) * 100) },
    { name: 'Diagnosed', value: Math.round(leadCount * 0.52), pct: 52 },
    { name: 'Accepted', value: Math.round(leadCount * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
  ];
}

function buildRealEstatePipeline(metrics, roi) {
  const leadCount = metrics.monthlyLeads || 0;
  return [
    { name: 'Leads', value: leadCount, pct: 100 },
    { name: 'Qualified', value: Math.round(leadCount * 0.68), pct: 68 },
    { name: 'Showings', value: Math.round(leadCount * 0.32), pct: 32 },
    { name: 'Offers', value: Math.round(leadCount * 0.14), pct: 14 },
    { name: 'Closed', value: Math.round(leadCount * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
  ];
}

function buildLandscapingPipeline(metrics, roi) {
  const leadCount = metrics.monthlyLeads || 0;
  return [
    { name: 'Inquiries', value: leadCount, pct: 100 },
    { name: 'Site Visits', value: Math.round(leadCount * 0.72), pct: 72 },
    { name: 'Estimates', value: Math.round(leadCount * 0.6), pct: 60 },
    { name: 'Signed Jobs', value: Math.round(leadCount * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
    { name: 'Recurring Clients', value: metrics.recurring_contracts ?? 0, pct: 55 },
  ];
}

function buildPoolsPipeline(metrics, roi) {
  const leadCount = metrics.monthlyLeads || 0;
  return [
    { name: 'Inquiries', value: leadCount, pct: 100 },
    { name: 'Qualified', value: Math.round(leadCount * 0.7), pct: 70 },
    { name: 'Design Consults', value: Math.round(leadCount * 0.46), pct: 46 },
    { name: 'Proposals', value: Math.round(leadCount * 0.28), pct: 28 },
    { name: 'Signed Builds', value: Math.round(leadCount * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
  ];
}

function buildIndoorEnvironmentalPipeline(metrics, roi) {
  const leadCount = metrics.monthlyLeads || 0;
  return [
    { name: 'Inquiries', value: leadCount, pct: 100 },
    { name: 'Booked', value: Math.round(leadCount * 0.82), pct: 82 },
    { name: 'Inspections Done', value: Math.round(leadCount * 0.76), pct: 76 },
    { name: 'Action Required', value: Math.round(leadCount * 0.48), pct: 48 },
    { name: 'Clearance Tests', value: Math.round(leadCount * roi.projectedCloseRate), pct: Math.round(roi.projectedCloseRate * 100) },
  ];
}

export function getPipelineStages(industryId, metrics, roi) {
  if (industryId === 'medspa') return buildMedspaPipeline(metrics, roi);
  if (industryId === 'hvac') return buildHvacPipeline(metrics, roi);
  if (industryId === 'construction') return buildConstructionPipeline(metrics, roi);
  if (industryId === 'law_firm') return buildLawPipeline(metrics, roi);
  if (industryId === 'dental') return buildDentalPipeline(metrics, roi);
  if (industryId === 'real_estate') return buildRealEstatePipeline(metrics, roi);
  if (industryId === 'landscaping') return buildLandscapingPipeline(metrics, roi);
  if (industryId === 'pools') return buildPoolsPipeline(metrics, roi);
  if (industryId === 'indoor_environmental') return buildIndoorEnvironmentalPipeline(metrics, roi);
  return buildDefaultPipeline(metrics, roi);
}

export function getCommandCenterTitle(industryConfig) {
  return industryConfig?.usesSystemsApproach ? 'AI Operating System' : 'AI Workforce';
}

export function getCommandCenterTagline(industryConfig) {
  return industryConfig?.usesSystemsApproach ? 'Your operating systems' : 'Your AI team';
}

export function getTrialBenefits(industryId, roi, teamCount, teamUnitLabel) {
  if (industryId === 'construction') {
    return [
      { icon: 'Zap', text: 'Every new opportunity answered while you are in the field', detail: roi.projectedResponseTime },
      { icon: 'CalendarCheck', text: 'Estimates, approvals, and updates move without bottlenecks', detail: `${teamCount} ${teamUnitLabel} running` },
      { icon: 'Mail', text: 'Clients and subs stay aligned without constant status calls', detail: 'Project updates + approvals automated' },
      { icon: 'BarChart3', text: 'Margin, schedule, and pipeline visibility in one place', detail: 'Operations dashboard live' },
    ];
  }
  if (industryId === 'medspa') {
    return [
      { icon: 'Zap', text: 'Every DM, text, and call answered fast enough to win the consult', detail: roi.projectedResponseTime },
      { icon: 'CalendarCheck', text: 'Consults booked, deposits collected, and no-shows reduced', detail: `${teamCount} ${teamUnitLabel} working` },
      { icon: 'Mail', text: 'Post-consult, post-care, and rebooking journeys stay active', detail: 'Membership + recall automation' },
      { icon: 'BarChart3', text: 'Provider utilization, conversion, and retention tracked daily', detail: 'Clinic dashboard live' },
    ];
  }
  if (industryId === 'hvac') {
    return [
      { icon: 'Zap', text: 'Emergency calls answered before they hit the next contractor', detail: roi.projectedResponseTime },
      { icon: 'CalendarCheck', text: 'Dispatch, routing, and replacement follow-up stay coordinated', detail: `${teamCount} ${teamUnitLabel} active` },
      { icon: 'Mail', text: 'Maintenance renewals and seasonal demand are worked automatically', detail: 'Agreements + campaigns on autopilot' },
      { icon: 'BarChart3', text: 'Dispatch health, tech productivity, and revenue stay visible', detail: 'Field ops dashboard live' },
    ];
  }
  if (industryId === 'dental') {
    return [
      { icon: 'Zap', text: 'New patient calls, reminders, and recall workflows run without staff bottlenecks', detail: roi.projectedResponseTime },
      { icon: 'CalendarCheck', text: 'Chairs stay fuller with reminders, waitlist fill, and recall automation', detail: `${teamCount} ${teamUnitLabel} active` },
      { icon: 'Mail', text: 'Treatment plans and reactivation sequences keep production moving', detail: 'Recall + treatment follow-up automated' },
      { icon: 'BarChart3', text: 'Production, no-shows, and acceptance stay visible by day', detail: 'Practice dashboard live' },
    ];
  }
  if (industryId === 'real_estate') {
    return [
      { icon: 'Zap', text: 'Portal leads get worked while competitors are still calling back', detail: roi.projectedResponseTime },
      { icon: 'CalendarCheck', text: 'Showings, follow-ups, and transaction milestones stay coordinated', detail: `${teamCount} ${teamUnitLabel} active` },
      { icon: 'Mail', text: 'Long-tail nurture and past-client check-ins never stop', detail: 'Nurture + post-close automation running' },
      { icon: 'BarChart3', text: 'Lead quality, pipeline health, and close velocity stay visible', detail: 'Broker dashboard live' },
    ];
  }
  if (industryId === 'landscaping') {
    return [
      { icon: 'Zap', text: 'Every inquiry is answered even when crews are out in the field', detail: roi.projectedResponseTime },
      { icon: 'CalendarCheck', text: 'Estimates, route updates, and recurring service reminders stay on track', detail: `${teamCount} ${teamUnitLabel} active` },
      { icon: 'Mail', text: 'Seasonal promotions and contract renewals run automatically', detail: 'Renewals + weather messaging automated' },
      { icon: 'BarChart3', text: 'Routes, crew utilization, and revenue health stay visible', detail: 'Operations dashboard live' },
    ];
  }
  if (industryId === 'pools') {
    return [
      { icon: 'Zap', text: 'High-value pool and spa leads are captured before they go cold', detail: roi.projectedResponseTime },
      { icon: 'CalendarCheck', text: 'Design consults, project updates, and service schedules stay coordinated', detail: `${teamCount} ${teamUnitLabel} active` },
      { icon: 'Mail', text: 'Proposal follow-up and post-build lifecycle campaigns keep running', detail: 'Consult + service nurture automated' },
      { icon: 'BarChart3', text: 'Pipeline value, build progress, and retention stay visible', detail: 'Project dashboard live' },
    ];
  }
  if (industryId === 'indoor_environmental') {
    return [
      { icon: 'Zap', text: 'Every health-concern inquiry answered in <60 seconds — day or night', detail: roi.projectedResponseTime },
      { icon: 'CalendarCheck', text: 'Site assessments booked, confirmed, and reminded without phone tag', detail: `${teamCount} ${teamUnitLabel} active` },
      { icon: 'Star', text: 'Post-report review requests sent at peak gratitude — every single job', detail: '3x review velocity in 90 days' },
      { icon: 'BarChart3', text: 'Referral partners nurtured, clearance tests booked, seasonal campaigns running', detail: 'Full lifecycle automated' },
    ];
  }
  return [
    { icon: 'Zap', text: 'Every lead responded to in <60 seconds', detail: roi.projectedResponseTime },
    { icon: 'CalendarCheck', text: 'Appointments auto-booked 24/7', detail: `${teamCount} ${teamUnitLabel} working` },
    { icon: 'Mail', text: 'Follow-up sequences running on autopilot', detail: '5-touch automated sequence' },
    { icon: 'BarChart3', text: 'Real-time dashboard showing every lead', detail: 'Full Command Center access' },
  ];
}
