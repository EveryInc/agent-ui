'use client'
import Sidebar from '@/components/playground/Sidebar/Sidebar'
import { ChatArea } from '@/components/playground/ChatArea'
import WorkflowStateSidebar from '@/components/playground/WorkflowStateSidebar/WorkflowStateSidebar'
import { Suspense } from 'react'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-background/80 flex flex-col md:flex-row h-screen overflow-hidden relative">
        <Sidebar />
        <ChatArea />
        <WorkflowStateSidebar />
      </div>
    </Suspense>
  )
}
