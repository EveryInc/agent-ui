import { Document } from '@/store' // Import Document type from store

// Type for the raw document structure from the API
interface RawApiDocument {
  id?: string // Assuming API might now return an ID?
  name: string // Expect name from API
  content: string
  metadata?: Record<string, unknown>
}

/**
 * Fetches documents from the backend API.
 * @param endpoint - The base URL of the API endpoint.
 * @returns A promise that resolves to an array of documents with client-side IDs.
 */
export const listDocumentsAPI = async (
  endpoint: string
): Promise<Document[]> => {
  try {
    const response = await fetch(`${endpoint}/documents`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Failed to fetch documents:', error)
    throw error
  }
}

/**
 * Creates a new document via the backend API.
 * @param endpoint - The base URL of the API endpoint.
 * @param name - The name of the document.
 * @param content - The content of the document to create.
 * @returns A promise that resolves when the document is created.
 */
export const createDocumentAPI = async (
  endpoint: string,
  name: string,
  content: string
): Promise<void> => {
  try {
    const response = await fetch(`${endpoint}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        content: content,
        metadata: {}
      })
    })

    if (!response.ok) {
      let errorBody = null
      try {
        errorBody = await response.json()
      } catch {
        // Removed unused variable name
        // Ignore if response body is not JSON or empty
      }
      throw new Error(
        `HTTP error! status: ${response.status}${errorBody ? ': ' + JSON.stringify(errorBody) : ''}`
      )
    }

    // Check if status is 201 Created
    if (response.status !== 201) {
      console.warn(
        'Create document API returned status',
        response.status,
        'instead of 201'
      )
      // Handle non-201 success cases if necessary
    }

    // No need to return data based on the Python code (returns message)
  } catch (error) {
    console.error('Failed to create document:', error)
    throw error // Re-throw error
  }
}
