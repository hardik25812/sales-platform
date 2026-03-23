import { roofingDepartments } from './roofing';
import { medspaDepartments } from './medspa';
import { hvacDepartments } from './hvac';
import { dentalDepartments } from './dental';
import { autoDepartments } from './auto';
import { lawDepartments } from './law';
import { lawFirmSystems } from './law-systems';
import { constructionSystems, constructionMetrics, constructionProblems, constructionWorkflow, constructionPersonalization } from './construction-systems';
import { landscapingSystems, landscapingMetrics, landscapingProblems, landscapingWorkflow, landscapingPersonalization } from './landscaping-systems';

// Map industry IDs to their department configurations
const DEPARTMENT_MAP = {
  roofing: roofingDepartments,
  medspa: medspaDepartments,
  hvac: hvacDepartments,
  dental: dentalDepartments,
  auto_dealership: autoDepartments,
  law_firm: lawDepartments,
};

// Systems-based configurations (for industries that use "systems" instead of "agents")
// This is the new approach that focuses on operational systems rather than generic voice AI agents
const SYSTEMS_MAP = {
  law_firm: lawFirmSystems,
  construction: constructionSystems,
  landscaping: landscapingSystems,
};

// Industry-specific metrics (replaces generic leads/employees)
const METRICS_MAP = {
  construction: constructionMetrics,
  landscaping: landscapingMetrics,
};

// Industry-specific problems (personalized pain points)
const PROBLEMS_MAP = {
  construction: constructionProblems,
  landscaping: landscapingProblems,
};

// Industry-specific workflows (real operational flows)
const WORKFLOW_MAP = {
  construction: constructionWorkflow,
  landscaping: landscapingWorkflow,
};

// Industry-specific personalization
const PERSONALIZATION_MAP = {
  construction: constructionPersonalization,
  landscaping: landscapingPersonalization,
};

// Check if an industry uses systems-based configuration
export function usesSystemsApproach(industryId) {
  return !!SYSTEMS_MAP[industryId];
}

// Get systems for a specific industry (new systems-based approach)
export function getSystems(industryId) {
  return SYSTEMS_MAP[industryId] || null;
}

// Get industry-specific metrics
export function getIndustryMetrics(industryId) {
  return METRICS_MAP[industryId] || null;
}

// Get industry-specific problems
export function getIndustryProblems(industryId) {
  return PROBLEMS_MAP[industryId] || null;
}

// Get industry-specific workflow
export function getIndustryWorkflow(industryId) {
  return WORKFLOW_MAP[industryId] || null;
}

// Get industry-specific personalization
export function getIndustryPersonalization(industryId) {
  return PERSONALIZATION_MAP[industryId] || null;
}

// Get departments for a specific industry
// Falls back to generating departments from the flat agents array if no department config exists
export function getDepartments(industryId, industryConfig) {
  if (DEPARTMENT_MAP[industryId]) {
    return DEPARTMENT_MAP[industryId];
  }

  // Fallback: auto-generate departments from flat agents array
  if (!industryConfig?.agents) return [];

  const deptMap = {};
  industryConfig.agents.forEach((agent) => {
    const deptId = (agent.dept || 'general').toLowerCase().replace(/\s+/g, '_');
    if (!deptMap[deptId]) {
      deptMap[deptId] = {
        id: deptId,
        name: `${agent.dept || 'General'} Department`,
        icon: '📋',
        description: `${agent.dept || 'General'} operations`,
        agents: [],
      };
    }
    // Convert flat agent to department agent format
    deptMap[deptId].agents.push({
      id: agent.name.toLowerCase().replace(/\s+/g, '_'),
      name: agent.name,
      icon: agent.icon || '🤖',
      tagline: agent.description,
      role: agent.dept || 'General',
      outcomes: agent.tasks || [],
      connectsTo: [],
      connectsDescription: [],
      workflow: [],
      sampleOutputs: {},
      valueFormula: null,
      valueLabel: '',
      kpis: [
        { label: agent.kpis?.primary || 'KPI', value: `${agent.metric?.value}${agent.metric?.unit === 'stars' ? '★' : agent.metric?.unit || ''}`, static: true },
        { label: agent.kpis?.secondary || 'Secondary', value: '-', static: true },
      ],
      loadPercent: Math.floor(Math.random() * 30) + 5,
      color: 'blue',
      // Keep original icon name for the existing ICON_MAP
      _originalIcon: agent.icon,
    });
  });

  return Object.values(deptMap);
}

// Calculate agent value from formula and metrics
export function calculateAgentValue(agent, metrics) {
  if (!agent.valueFormula) return 0;
  try {
    const { monthlyLeads, avgJobValue, employees, currentCloseRate, currentResponseTime, monthlyAdSpend, noShowRate, missedCallsEstimate } = metrics;
    // eslint-disable-next-line no-eval
    return Math.round(eval(agent.valueFormula)) || 0;
  } catch {
    return 0;
  }
}

// Calculate total department value
export function calculateDepartmentValue(dept, metrics) {
  return dept.agents.reduce((total, agent) => total + calculateAgentValue(agent, metrics), 0);
}

// Get all agents across all departments (flat list)
export function getAllAgents(departments) {
  return departments.flatMap(dept =>
    dept.agents.map(agent => ({ ...agent, departmentId: dept.id, departmentName: dept.name }))
  );
}

// Find an agent by ID across all departments
export function findAgent(departments, agentId) {
  for (const dept of departments) {
    const agent = dept.agents.find(a => a.id === agentId);
    if (agent) return { ...agent, departmentId: dept.id, departmentName: dept.name };
  }
  return null;
}
