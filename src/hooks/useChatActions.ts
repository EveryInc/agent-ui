import { useCallback } from 'react'
import { toast } from 'sonner'

import { usePlaygroundStore } from '../store'

import {
  ComboboxAgent,
  type PlaygroundChatMessage,
  ComboboxTeam
} from '@/types/playground'
import {
  getPlaygroundAgentsAPI,
  getPlaygroundStatusAPI,
  getPlaygroundTeamsAPI
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
  const setSelectedModel = usePlaygroundStore((state) => state.setSelectedModel)
  const [agentId, setAgentId] = useQueryState('agent')
  const [teamId] = useQueryState('team')

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
      let teams: ComboboxTeam[] = []

      if (status === 200) {
        setIsEndpointActive(true)

        const results = await Promise.allSettled([getAgents(), getTeams()])

        if (results[0].status === 'fulfilled') {
          agents = results[0].value
        }
        if (results[1].status === 'fulfilled') {
          teams = results[1].value
        }

        if (agents.length > 0 && !agentId && !teamId) {
          const firstAgent = agents[0]
          setAgentId(firstAgent.value)
          setSelectedModel(firstAgent.model.provider || '')
        }
      } else {
        setIsEndpointActive(false)
      }

      setAgents(agents)
      setTeams(teams)

      return { agents, teams }
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
    setIsEndpointActive,
    setIsEndpointLoading,
    setAgents,
    setTeams,
    setAgentId,
    setSelectedModel,
    agentId,
    teamId
  ])

  return {
    clearChat,
    addMessage,
    getAgents,
    getTeams,
    focusChatInput,
    initializePlayground
  }
}

export default useChatActions
