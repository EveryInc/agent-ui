import React from 'react'
import { usePlaygroundStore } from '@/store'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useQueryState } from 'nuqs'

// Helper function to check if a value is an object
const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// Helper function to check if a value is an array
const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value)
}

// Component to render any value with collapsible UI
const ValueItem = ({
  name,
  value,
  level = 0
}: {
  name: string
  value: unknown
  level?: number
}) => {
  const [isOpen, setIsOpen] = React.useState(level < 1)

  
  // If value is primitive (not object or array), render directly
  if (!isObject(value) && !isArray(value)) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-1">
        <div className="flex items-center">
          <CollapsibleTrigger className="flex items-center hover:bg-gray-100 rounded p-1 w-full text-left">
            {isOpen ? (
              <ChevronDown className="h-4 w-4 mr-1 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0" />
            )}
            <span className="font-medium">{name}:</span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="pl-4 border-l border-gray-200 ml-2 mt-1">
          <span className="text-sm">{String(value)}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }
  
  // For objects and arrays, use collapsible component
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-1">
      <div className="flex items-center">
        <CollapsibleTrigger className="flex items-center hover:bg-gray-100 rounded p-1 w-full text-left">
          {isOpen ? (
            <ChevronDown className="h-4 w-4 mr-1 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0" />
          )}
          <span className="font-medium">{name}:</span>
          <span className="text-xs text-gray-500 ml-2">
            {isArray(value) ? `Array(${(value as unknown[]).length})` : 'Object'}
          </span>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="pl-4 border-l border-gray-200 ml-2 mt-1">
          {isObject(value) && (
            Object.entries(value as Record<string, unknown>).map(([key, val]) => (
              <ValueItem key={key} name={key} value={val} level={level + 1} />
            ))
          )}
          {isArray(value) && (
            (value as unknown[]).map((item, index) => (
              <ValueItem key={index} name={`[${index}]`} value={item} level={level + 1} />
            ))
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export const SessionState = () => {
  const workflowSessionState = usePlaygroundStore(
    (state) => state.workflowSessionState
  )
  const [workflowId] = useQueryState('workflow')

  // Only show session state for workflows
  if (!workflowId || !workflowSessionState) {
    return null
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2 px-4">Session State</h3>
      <div className="px-4 overflow-y-scroll h-full">
        {Object.entries(workflowSessionState).map(([key, value]) => (
          <ValueItem key={key} name={key} value={value} />
        ))}
      </div>
    </div>
  )
}

export default SessionState
