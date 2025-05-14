import { useState } from 'react'
import { useQueryState } from 'nuqs'
import { cn } from '@/lib/utils'
import SessionState from '../Sidebar/SessionState/SessionState'

const WorkflowStateSidebar = () => {
  const [workflowId] = useQueryState('workflow')
  const [sessionId] = useQueryState('session')
  const [isOpen, setIsOpen] = useState(true)
  
  // Only show the sidebar if we have a workflow session
  if (!workflowId || !sessionId) {
    return null
  }
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  
  return (
    <div 
      className={cn(
        "fixed right-0 top-0 h-full bg-background-secondary border-l border-border transition-all duration-300 z-10",
        isOpen ? "w-80" : "w-10"
      )}
    >
      {/* Toggle button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-background-secondary border border-border rounded-full p-1 z-20"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={cn("transition-transform duration-300", isOpen ? "rotate-0" : "rotate-180")}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      
      {/* Content */}
      <div className={cn("h-full overflow-auto pt-6", !isOpen && "hidden")}>
        <SessionState />
      </div>
    </div>
  )
}

export default WorkflowStateSidebar
