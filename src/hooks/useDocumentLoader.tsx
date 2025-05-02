'use client'

import { useCallback } from 'react'
import { usePlaygroundStore } from '@/store'
import { listDocumentsAPI, createDocumentAPI } from '@/api/documents'
import { toast } from 'sonner'

export const useDocumentLoader = () => {
  const selectedEndpoint = usePlaygroundStore((state) => state.selectedEndpoint)
  const setDocumentsData = usePlaygroundStore((state) => state.setDocumentsData)
  const setIsDocumentsLoading = usePlaygroundStore(
    (state) => state.setIsDocumentsLoading
  )

  const loadDocuments = useCallback(async () => {
    if (!selectedEndpoint) {
      // Don't attempt to load if no endpoint is selected
      setDocumentsData(null)
      return
    }

    console.log('Loading documents for endpoint:', selectedEndpoint)
    setIsDocumentsLoading(true)
    setDocumentsData(null) // Clear previous data
    try {
      const documents = await listDocumentsAPI(selectedEndpoint)
      console.log('[useDocumentLoader] Fetched documents:', documents)
      setDocumentsData(documents)
    } catch (error) {
      console.error('Error loading documents:', error)
      toast.error('Error loading documents')
      setDocumentsData(null) // Set to null or [] on error?
    } finally {
      setIsDocumentsLoading(false)
    }
  }, [selectedEndpoint, setDocumentsData, setIsDocumentsLoading])

  const addDocument = useCallback(
    async (name: string, content: string) => {
      if (!selectedEndpoint) {
        toast.error('Cannot add document: No endpoint selected')
        return
      }

      const toastId = toast.loading('Adding document...')
      try {
        await createDocumentAPI(selectedEndpoint, name, content)
        toast.success('Document added successfully', { id: toastId })
        await loadDocuments()
      } catch (error) {
        console.error('Error adding document:', error)
        toast.error(
          `Error adding document: ${error instanceof Error ? error.message : 'Unknown error'}`,
          {
            id: toastId
          }
        )
      }
    },
    [selectedEndpoint, loadDocuments]
  )

  return { loadDocuments, addDocument }
}
