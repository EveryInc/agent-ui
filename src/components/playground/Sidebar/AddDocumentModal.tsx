'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { TextArea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface AddDocumentModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSave: (name: string, content: string) => void
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  isOpen,
  onOpenChange,
  onSave
}) => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setContent('')
    }
  }, [isOpen])

  const handleSave = () => {
    if (!name.trim() || !content.trim()) {
      console.error('Document name and content cannot be empty')
      toast.error('Document name and content cannot be empty')
      return
    }
    onSave(name.trim(), content.trim())
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Document</DialogTitle>
          <DialogDescription>
            Provide a name and paste the document content.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="doc-name" className="text-right">
              Name
            </Label>
            <Input
              id="doc-name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className="col-span-3"
              placeholder="My Document Name"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="doc-content" className="pt-2 text-right">
              Content
            </Label>
            <TextArea
              id="doc-content"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
              className="col-span-3 min-h-[200px]"
              placeholder="Paste your document text here..."
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="secondary"
            disabled={!name.trim() || !content.trim()}
          >
            <p className="text-black">Save Document</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddDocumentModal
