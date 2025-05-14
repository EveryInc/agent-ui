'use client'

import ChatInput from './ChatInput'
import MessageArea from './MessageArea'
import useWorkflowStateRefresh from '@/hooks/useWorkflowStateRefresh'

const ChatArea = () => {
  // Use the workflow state refresh hook to periodically update the workflow state
  useWorkflowStateRefresh()
  
  return (
    <main className="relative m-1.5 flex flex-grow flex-col rounded-xl bg-background w-full">
      {/* Mobile padding adjustment for when hamburger menu is visible */}
      <div className="md:hidden h-10"></div>
      <MessageArea />
      <div className="sticky bottom-0 ml-2 md:ml-9 px-2 md:px-4 pb-2">
        <ChatInput />
      </div>
    </main>
  )
}

export default ChatArea
