export const APIRoutes = {
  GetPlaygroundAgents: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/agents`,
  GetPlaygroundTeams: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/teams`,
  AgentRun: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/agents/{agent_id}/runs`,
  TeamRun: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/teams/{team_id}/runs`,
  PlaygroundStatus: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/v1/playground/status`,
  GetPlaygroundSessions: (PlaygroundApiUrl: string, agentId: string) =>
    `${PlaygroundApiUrl}/v1/playground/agents/${agentId}/sessions`,
  GetPlaygroundTeamSessions: (PlaygroundApiUrl: string, teamId: string) =>
    `${PlaygroundApiUrl}/v1/playground/teams/${teamId}/sessions`,
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

  DeletePlaygroundSession: (
    PlaygroundApiUrl: string,
    agentId: string,
    sessionId: string
  ) =>
    `${PlaygroundApiUrl}/v1/playground/agents/${agentId}/sessions/${sessionId}`,

  BranchSession: (PlaygroundApiUrl: string) =>
    `${PlaygroundApiUrl}/sessions/branch`
}
