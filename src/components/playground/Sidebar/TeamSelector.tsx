'use client'

import * as React from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { usePlaygroundStore } from '@/store'
import { useQueryState } from 'nuqs'
import Icon from '@/components/ui/icon'
import useChatActions from '@/hooks/useChatActions'

// Make sure function is exported
export function TeamSelector() {
  const { teams, setMessages } = usePlaygroundStore()
  const { focusChatInput } = useChatActions()
  const [teamId, setTeamId] = useQueryState('team', {
    // Use 'team' query param
    parse: (value) => value || undefined,
    history: 'push'
  })
  const [, setSessionId] = useQueryState('session')
  const [, setAgentId] = useQueryState('agent')

  // TODO: Add logic if needed when team selection changes or on mount

  const handleOnValueChange = (value: string) => {
    const newTeamId = value === teamId ? null : value // Use null for clearing
    setTeamId(newTeamId)
    setAgentId(null)
    setMessages([]) // Clear messages when team changes
    setSessionId(null) // Clear session when team changes
    // Add any other side effects of selecting a team
    // For example, maybe clear the selected agent?
    // setAgentId(null)?

    // Focus input if a team is selected (optional, adjust as needed)
    if (newTeamId) {
      focusChatInput()
    }
  }

  return (
    <Select
      value={teamId || ''}
      onValueChange={(value) => handleOnValueChange(value)}
    >
      <SelectTrigger className="border-primary/15 bg-primaryAccent h-9 w-full rounded-xl border text-xs font-medium uppercase">
        <SelectValue placeholder="Select Team" />
      </SelectTrigger>
      <SelectContent className="bg-primaryAccent font-dmmono border-none shadow-lg">
        {teams.map((team, index) => (
          <SelectItem
            className="cursor-pointer"
            key={`${team.value}-${index}`}
            value={team.value}
          >
            <div className="flex items-center gap-3 text-xs font-medium uppercase">
              {/* TODO: Add a team icon if available */}
              <Icon type={'agent'} size="xs" /> {/* Using agent icon for now */}
              {team.label}
            </div>
          </SelectItem>
        ))}
        {teams.length === 0 && (
          <SelectItem
            value="no-teams"
            disabled // Disable selection if no teams
            className="cursor-not-allowed select-none text-center"
          >
            No teams found
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )
}
// Ensure no default export exists
