import { toast } from 'sonner'

import { APIRoutes } from './routes'

import { Agent, ComboboxAgent, ComboboxWorkflow, SessionEntry, Team, Workflow, WorkflowRenameRequest, WorkflowRunRequest } from '@/types/playground'

export const getPlaygroundAgentsAPI = async (
  endpoint: string
): Promise<ComboboxAgent[]> => {
  const url = APIRoutes.GetPlaygroundAgents(endpoint)
  try {
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      toast.error(`Failed to fetch playground agents: ${response.statusText}`)
      return []
    }
    const data = await response.json()
    // Transform the API response into the expected shape.
    const agents: ComboboxAgent[] = data.map((item: Agent) => ({
      value: item.agent_id || '',
      label: item.name || '',
      model: item.model || '',
      storage: item.storage || false
    }))
    return agents
  } catch {
    toast.error('Error fetching playground agents')
    return []
  }
}

export const getPlaygroundTeamsAPI = async (
  endpoint: string
): Promise<Team[]> => {
  const url = APIRoutes.GetPlaygroundTeams(endpoint)
  try {
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      toast.error(`Failed to fetch playground teams: ${response.statusText}`)
      return []
    }
    return response.json()
  } catch {
    toast.error('Error fetching playground teams')
    return []
  }
}

export const getPlaygroundWorkflowsAPI = async (
  endpoint: string
): Promise<ComboboxWorkflow[]> => {
  const url = APIRoutes.GetPlaygroundWorkflows(endpoint)
  try {
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      toast.error(`Failed to fetch workflows: ${response.statusText}`)
      return []
    }
    const data = await response.json()
    // Transform the API response into the expected shape
    const workflows: ComboboxWorkflow[] = data.map((item: Workflow) => ({
      value: item.workflow_id || '',
      label: item.name || '',
      description: item.description || '',
      parameters: item.parameters || {},
      storage: !!item.storage
    }))
    return workflows
  } catch {
    toast.error('Error fetching workflows')
    return []
  }
}

export const getPlaygroundWorkflowAPI = async (
  endpoint: string,
  workflowId: string
): Promise<Workflow | null> => {
  const url = APIRoutes.GetPlaygroundWorkflow(endpoint, workflowId)
  try {
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      toast.error(`Failed to fetch workflow: ${response.statusText}`)
      return null
    }
    return response.json()
  } catch {
    toast.error('Error fetching workflow')
    return null
  }
}

export const getPlaygroundStatusAPI = async (base: string): Promise<number> => {
  const response = await fetch(APIRoutes.PlaygroundStatus(base), {
    method: 'GET'
  })
  return response.status
}

export const getAllPlaygroundSessionsAPI = async (
  base: string,
  agentId: string
): Promise<SessionEntry[]> => {
  try {
    const response = await fetch(
      APIRoutes.GetPlaygroundSessions(base, agentId),
      {
        method: 'GET'
      }
    )
    if (!response.ok) {
      if (response.status === 404) {
        // Return empty array when storage is not enabled
        return []
      }
      throw new Error(`Failed to fetch sessions: ${response.statusText}`)
    }
    return response.json()
  } catch {
    return []
  }
}

export const getAllPlaygroundTeamSessionsAPI = async (
  base: string,
  teamId: string
): Promise<SessionEntry[]> => {
  try {
    const response = await fetch(
      APIRoutes.GetPlaygroundTeamSessions(base, teamId),
      {
        method: 'GET'
      }
    )
    if (!response.ok) {
      if (response.status === 404) {
        return []
      }
      throw new Error(`Failed to fetch team sessions: ${response.statusText}`)
    }
    return response.json()
  } catch {
    return []
  }
}

export const getAllPlaygroundWorkflowSessionsAPI = async (
  base: string,
  workflowId: string
): Promise<SessionEntry[]> => {
  try {
    const url = APIRoutes.GetPlaygroundWorkflowSessions(base, workflowId)
    // We don't add user_id parameter as requested
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      if (response.status === 404) {
        return []
      }
      throw new Error(`Failed to fetch workflow sessions: ${response.statusText}`)
    }
    return response.json()
  } catch {
    return []
  }
}

export const getPlaygroundSessionAPI = async (
  base: string,
  agentId: string,
  sessionId: string
) => {
  const response = await fetch(
    APIRoutes.GetPlaygroundSession(base, agentId, sessionId),
    {
      method: 'GET'
    }
  )
  return response.json()
}

export const getPlaygroundTeamSessionAPI = async (
  base: string,
  teamId: string,
  sessionId: string
) => {
  const response = await fetch(
    APIRoutes.GetPlaygroundTeamSession(base, teamId, sessionId),
    {
      method: 'GET'
    }
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch team session: ${response.statusText}`)
  }
  return response.json()
}

export const getPlaygroundWorkflowSessionAPI = async (
  base: string,
  workflowId: string,
  sessionId: string
) => {
  const url = APIRoutes.GetPlaygroundWorkflowSession(base, workflowId, sessionId)
  // We don't add user_id parameter as requested
  const response = await fetch(url, { method: 'GET' })
  if (!response.ok) {
    throw new Error(`Failed to fetch workflow session: ${response.statusText}`)
  }
  return response.json()
}

// New API function to get workflow session state
export const getWorkflowSessionStateAPI = async (
  base: string,
  workflowId: string,
  sessionId: string
): Promise<Record<string, unknown>> => {
  try {
    const url = APIRoutes.GetWorkflowSessionState(base, workflowId, sessionId)
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      throw new Error(`Failed to fetch workflow session state: ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching workflow session state:', error)
    return {}
  }
}

export const deletePlaygroundSessionAPI = async (
  base: string,
  agentId: string,
  sessionId: string
) => {
  const response = await fetch(
    APIRoutes.DeletePlaygroundSession(base, agentId, sessionId),
    {
      method: 'DELETE'
    }
  )
  return response
}

export const deletePlaygroundWorkflowSessionAPI = async (
  base: string,
  workflowId: string,
  sessionId: string
) => {
  const response = await fetch(
    APIRoutes.DeletePlaygroundWorkflowSession(base, workflowId, sessionId),
    {
      method: 'DELETE'
    }
  )
  return response
}

export const renameWorkflowSessionAPI = async (
  base: string,
  workflowId: string,
  sessionId: string,
  name: string
) => {
  const response = await fetch(
    APIRoutes.RenameWorkflowSession(base, workflowId, sessionId),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name } as WorkflowRenameRequest)
    }
  )
  return response
}

export const runWorkflowAPI = async (
  base: string,
  workflowId: string,
  payload: WorkflowRunRequest
) => {
  const response = await fetch(
    APIRoutes.WorkflowRun(base, workflowId),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  )
  if (!response.ok) {
    throw new Error(`Failed to run workflow: ${response.statusText}`)
  }
  
  // Check if the response is a stream
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('text/event-stream')) {
    return response
  }
  
  return response.json()
}
