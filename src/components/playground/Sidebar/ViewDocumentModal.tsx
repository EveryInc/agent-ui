'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose // Import DialogClose for easy closing
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area' // To handle potentially long content
import type { Document } from '@/store' // Import Document type

interface ViewDocumentModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  document: Document | null // The document to display
}

const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({
  isOpen,
  onOpenChange,
  document
}) => {
  if (!document) {
    return null // Don't render anything if no document is selected
  }

  // Use document name for the title
  const modalTitle = document.name || 'View Document' // Use name, fallback if empty

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[80vh] flex-col sm:max-w-[800px]">
        {' '}
        {/* Larger width, max height, flex col */}
        <DialogHeader>
          <DialogTitle className="truncate pr-6">{modalTitle}</DialogTitle>{' '}
          {/* Added truncate & padding */}
          <DialogDescription>Full content of the document.</DialogDescription>
        </DialogHeader>
        {/* Scrollable Content Area */}
        <ScrollArea className="my-4 flex-grow rounded-md border p-4">
          {' '}
          {/* Added flex-grow */}
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {document.content}
          </pre>
        </ScrollArea>
        <DialogFooter className="mt-auto">
          {' '}
          {/* Added mt-auto to push footer down */}
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ViewDocumentModal
