import { useCallback } from 'react'
import { toast } from 'sonner'

import { usePlaygroundStore } from '../store'

import {
  ComboboxAgent,
  Team,
  type PlaygroundChatMessage,
  type ComboboxWorkflow
} from '@/types/playground'
import {
  getPlaygroundAgentsAPI,
  getPlaygroundStatusAPI,
  getPlaygroundTeamsAPI,
  getPlaygroundWorkflowsAPI
} from '@/api/playground'
import { useQueryState } from 'nuqs'

const useChatActions = () => {
  const { chatInputRef } = usePlaygroundStore()
  const selectedEndpoint = usePlaygroundStore((state) => state.selectedEndpoint)
  const [, setSessionId] = useQueryState('session')
  const setMessages = usePlaygroundStore((state) => state.setMessages)
  const setIsEndpointActive = usePlaygroundStore(
    (state) => state.setIsEndpointActive
  )
  const setIsEndpointLoading = usePlaygroundStore(
    (state) => state.setIsEndpointLoading
  )
  const setAgents = usePlaygroundStore((state) => state.setAgents)
  const setTeams = usePlaygroundStore((state) => state.setTeams)
  const setWorkflows = usePlaygroundStore((state) => state.setWorkflows)
  const setSelectedModel = usePlaygroundStore((state) => state.setSelectedModel)
  const [agentId, setAgentId] = useQueryState('agent')
  const [teamId] = useQueryState('team')
  const [workflowId] = useQueryState('workflow')

  const getStatus = useCallback(async () => {
    try {
      const status = await getPlaygroundStatusAPI(selectedEndpoint)
      return status
    } catch {
      return 503
    }
  }, [selectedEndpoint])

  const getAgents = useCallback(async () => {
    try {
      const agents = await getPlaygroundAgentsAPI(selectedEndpoint)
      return agents
    } catch {
      toast.error('Error fetching agents')
      return []
    }
  }, [selectedEndpoint])

  const getTeams = useCallback(async () => {
    try {
      const teams = await getPlaygroundTeamsAPI(selectedEndpoint)
      return teams
    } catch {
      toast.error('Error fetching teams')
      return []
    }
  }, [selectedEndpoint])

  const getWorkflows = useCallback(async () => {
    try {
      const workflows = await getPlaygroundWorkflowsAPI(selectedEndpoint)
      return workflows
    } catch {
      toast.error('Error fetching workflows')
      return []
    }
  }, [selectedEndpoint])

  const clearChat = useCallback(() => {
    setMessages([])
    setSessionId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const focusChatInput = useCallback(() => {
    setTimeout(() => {
      requestAnimationFrame(() => chatInputRef?.current?.focus())
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addMessage = useCallback(
    (message: PlaygroundChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message])
    },
    [setMessages]
  )

  const initializePlayground = useCallback(async () => {
    setIsEndpointLoading(true)
    try {
      const status = await getStatus()
      let agents: ComboboxAgent[] = []
      let teams: Team[] = []
      let workflows: ComboboxWorkflow[] = []

      if (status === 200) {
        setIsEndpointActive(true)

        const results = await Promise.allSettled([getAgents(), getTeams(), getWorkflows()])

        if (results[0].status === 'fulfilled') {
          agents = results[0].value
        }
        if (results[1].status === 'fulfilled') {
          teams = results[1].value
        }
        if (results[2].status === 'fulfilled') {
          workflows = results[2].value
        }

        if (agents.length > 0 && !agentId && !teamId && !workflowId) {
          const firstAgent = agents[0]
          setAgentId(firstAgent.value)
          setSelectedModel(firstAgent.model.provider || '')
        }
      } else {
        setIsEndpointActive(false)
      }

      setAgents(agents)
      setTeams(teams)
      setWorkflows(workflows)

      return { agents, teams, workflows }
    } catch (error) {
      console.error('Error initializing playground:', error)
      setIsEndpointActive(false)
      setAgents([])
      setTeams([])
    } finally {
      setIsEndpointLoading(false)
    }
  }, [
    getStatus,
    getAgents,
    getTeams,
    getWorkflows,
    setIsEndpointActive,
    setIsEndpointLoading,
    setAgents,
    setTeams,
    setWorkflows,
    setAgentId,
    setSelectedModel,
    agentId,
    teamId,
    workflowId
  ])

  return {
    clearChat,
    addMessage,
    getAgents,
    getTeams,
    getWorkflows,
    focusChatInput,
    initializePlayground
  }
}

export default useChatActions
