export const APIRoutes = {
  GetPlaygroundAgents: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/agents`,
  GetPlaygroundTeams: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/teams`,
  GetPlaygroundWorkflows: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/workflows`,
  GetPlaygroundWorkflow: (PlaygroundApiUrl: string, workflowId: string) =>
    `${PlaygroundApiUrl}/v1/playground/workflows/${workflowId}`,
  AgentRun: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/agents/{agent_id}/runs`,
  TeamRun: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/teams/{team_id}/runs`,
  WorkflowRun: (PlaygroundApiUrl: string, workflowId: string) =>
    `${PlaygroundApiUrl}/v1/playground/workflows/${workflowId}/runs`,
  PlaygroundStatus: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/status`,
  GetPlaygroundSessions: (PlaygroundApiUrl: string, agentId: string) =>
    `${PlaygroundApiUrl}/v1/playground/agents/${agentId}/sessions`,
  GetPlaygroundTeamSessions: (PlaygroundApiUrl: string, teamId: string) =>
    `${PlaygroundApiUrl}/v1/playground/teams/${teamId}/sessions`,
  GetPlaygroundWorkflowSessions: (
    PlaygroundApiUrl: string,
    workflowId: string
  ) => `${PlaygroundApiUrl}/v1/playground/workflows/${workflowId}/sessions`,
  GetPlaygroundSession: (
    PlaygroundApiUrl: string,
    agentId: string,
    sessionId: string
  ) =>
    `${PlaygroundApiUrl}/v1/playground/agents/${agentId}/sessions/${sessionId}`,
  GetPlaygroundTeamSession: (
    PlaygroundApiUrl: string,
    teamId: string,
    sessionId: string
  ) =>
    `${PlaygroundApiUrl}/v1/playground/teams/${teamId}/sessions/${sessionId}`,
  GetPlaygroundWorkflowSession: (
    PlaygroundApiUrl: string,
    workflowId: string,
    sessionId: string
  ) =>
    `${PlaygroundApiUrl}/v1/playground/workflows/${workflowId}/sessions/${sessionId}`,
  DeletePlaygroundSession: (
    PlaygroundApiUrl: string,
    agentId: string,
    sessionId: string
  ) =>
    `${PlaygroundApiUrl}/v1/playground/agents/${agentId}/sessions/${sessionId}`,
  DeletePlaygroundWorkflowSession: (
    PlaygroundApiUrl: string,
    workflowId: string,
    sessionId: string
  ) =>
    `${PlaygroundApiUrl}/v1/playground/workflows/${workflowId}/sessions/${sessionId}`,
  RenameWorkflowSession: (
    PlaygroundApiUrl: string,
    workflowId: string,
    sessionId: string
  ) =>
    `${PlaygroundApiUrl}/v1/playground/workflows/${workflowId}/sessions/${sessionId}/rename`,
  BranchSession: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/branch-session`,
  GetWorkflowSessionState: (
    PlaygroundApiUrl: string,
    workflowId: string,
    sessionId: string
  ) => `${PlaygroundApiUrl}/workflows/${workflowId}/${sessionId}/state`
}
