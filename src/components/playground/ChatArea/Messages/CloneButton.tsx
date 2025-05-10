'use client'

import { useState } from 'react'
import { usePlaygroundStore } from '@/store'
import Icon from '@/components/ui/icon'
import Tooltip from '@/components/ui/tooltip'
import { APIRoutes } from '@/api/routes'
import { useQueryState } from 'nuqs'
import useSessionLoader from '@/hooks/useSessionLoader'
import { toast } from 'sonner'

interface CloneButtonProps {
  runId: string
  sessionId: string
}

const CloneButton = ({ runId, sessionId }: CloneButtonProps) => {
  const [isCloning, setIsCloning] = useState(false)
  const { selectedEndpoint } = usePlaygroundStore()
  const { getSession, getSessions } = useSessionLoader()
  const [agentId] = useQueryState('agent', {
    parse: (value) => value || undefined,
    history: 'push'
  })
  const [teamId] = useQueryState('team', {
    parse: (value) => value || undefined,
    history: 'push'
  })

  const handleClone = async () => {
    try {
      setIsCloning(true)
      
      const response = await fetch(APIRoutes.BranchSession(selectedEndpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_session_id: sessionId,
          run_id: runId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to branch session')
      }

      const data = await response.json()
      
      // Update the session list and switch to the new session
      await getSessions(selectedEndpoint)
      getSession(data.session_id, agentId, teamId)
      
      toast.success('Session cloned successfully')
      
    } catch (error) {
      console.error('Error cloning session:', error)
      toast.error('Failed to clone session')
    } finally {
      setIsCloning(false)
    }
  }

  return (
    <Tooltip
      delayDuration={300}
      content={<p className="text-accent">Clone from this message</p>}
      side="top"
    >
      <div
        onClick={handleClone}
        className="flex items-center justify-center rounded-full p-1 text-primary/40 hover:bg-background-secondary hover:text-primary transition-colors"
        aria-label="Clone conversation from this message"
      >
        {isCloning ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/40 border-t-transparent" />
        ) : (
          <Icon type="split" size="xs" />
        )}
      </div>
    </Tooltip>
  )
}

export default CloneButton
