import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
// import type { ReactNode } from 'react' // Removed unused import
import {
  Team,
  type PlaygroundChatMessage,
  type SessionEntry
} from '@/types/playground'

// Define Agent interface as it was
interface Agent {
  value: string
  label: string
  model: {
    provider: string
  }
  storage?: boolean
}

// Define Document type (can be moved to @/types later)
export interface Document {
  id: string // Client-side ID
  name: string // Add name back
  content: string
  metadata?: Record<string, unknown> // Use unknown instead of any
}

// Use the original PlaygroundStore interface structure
export interface PlaygroundStore {
  // Renamed back from PlaygroundState
  hydrated: boolean
  setHydrated: () => void
  streamingErrorMessage: string | null // Allow null based on previous implementation attempt
  setStreamingErrorMessage: (streamingErrorMessage: string | null) => void // Allow null
  endpoints: {
    endpoint: string
    id_playground_endpoint: string
  }[]
  setEndpoints: (
    endpoints: {
      endpoint: string
      id_playground_endpoint: string
    }[]
  ) => void
  isStreaming: boolean
  setIsStreaming: (isStreaming: boolean) => void
  isEndpointActive: boolean
  setIsEndpointActive: (isActive: boolean) => void
  isEndpointLoading: boolean
  setIsEndpointLoading: (isLoading: boolean) => void
  messages: PlaygroundChatMessage[]
  setMessages: (
    messages:
      | PlaygroundChatMessage[]
      | ((prevMessages: PlaygroundChatMessage[]) => PlaygroundChatMessage[])
  ) => void
  hasStorage: boolean
  setHasStorage: (hasStorage: boolean) => void
  chatInputRef: React.RefObject<HTMLTextAreaElement | null>
  selectedEndpoint: string
  setSelectedEndpoint: (selectedEndpoint: string) => void
  agents: Agent[]
  teams: Team[]
  setAgents: (agents: Agent[]) => void
  setTeams: (teams: Team[]) => void
  selectedModel: string | null // Allow null based on previous attempts
  setSelectedModel: (model: string | null) => void // Allow null
  sessionsData: SessionEntry[] | null // Use SessionEntry type
  setSessionsData: (
    sessionsData:
      | SessionEntry[]
      | null // Allow null
      | ((prevSessions: SessionEntry[] | null) => SessionEntry[] | null)
  ) => void
  isSessionsLoading: boolean
  setIsSessionsLoading: (isSessionsLoading: boolean) => void

  // Add documents state here
  documentsData: Document[] | null
  setDocumentsData: (data: Document[] | null) => void
  isDocumentsLoading: boolean
  setIsDocumentsLoading: (isLoading: boolean) => void
}

export const usePlaygroundStore = create<PlaygroundStore>()(
  persist(
    (set) => ({
      // Restore original initial state values
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      streamingErrorMessage: null, // Allow null
      setStreamingErrorMessage: (streamingErrorMessage) =>
        set(() => ({ streamingErrorMessage })),
      endpoints: [],
      setEndpoints: (endpoints) => set(() => ({ endpoints })),
      isStreaming: false,
      setIsStreaming: (isStreaming) => set(() => ({ isStreaming })),
      isEndpointActive: false,
      setIsEndpointActive: (isActive) =>
        set(() => ({ isEndpointActive: isActive })),
      isEndpointLoading: true, // Original value was true
      setIsEndpointLoading: (isLoading) =>
        set(() => ({ isEndpointLoading: isLoading })),
      messages: [],
      setMessages: (messages) =>
        set((state) => ({
          messages:
            typeof messages === 'function' ? messages(state.messages) : messages
        })),
      hasStorage: false,
      setHasStorage: (hasStorage) => set(() => ({ hasStorage })),
      chatInputRef: { current: null }, // Keep as object literal for ref
      selectedEndpoint:
        process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT || 'http://localhost:7777', // Original default
      setSelectedEndpoint: (selectedEndpoint) =>
        set(() => ({ selectedEndpoint })),
      agents: [], // Original was []
      teams: [], // Original was []
      setAgents: (agents) => set({ agents }), // Keep simple setter
      setTeams: (teams) => set({ teams }), // Keep simple setter
      selectedModel: null, // Allow null
      setSelectedModel: (selectedModel) => set(() => ({ selectedModel })),
      sessionsData: null,
      setSessionsData: (sessionsData) =>
        set((state) => ({
          sessionsData:
            typeof sessionsData === 'function'
              ? sessionsData(state.sessionsData) // Use original logic
              : sessionsData
        })),
      isSessionsLoading: false,
      setIsSessionsLoading: (isSessionsLoading) =>
        set(() => ({ isSessionsLoading })),

      // Add documents initial state & setters
      documentsData: null,
      setDocumentsData: (data) => set({ documentsData: data }), // Simple setter
      isDocumentsLoading: false,
      setIsDocumentsLoading: (isLoading) =>
        set({ isDocumentsLoading: isLoading }) // Simple setter consistent with others
    }),
    {
      // Restore original persist options
      name: 'endpoint-storage', // Original name
      storage: createJSONStorage(() => localStorage), // Original storage
      partialize: (state) => ({
        selectedEndpoint: state.selectedEndpoint // Original partialization
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated?.() // Original rehydration logic
      }
    }
  )
)
