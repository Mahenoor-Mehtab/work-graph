import { Collaboration } from '@/types'
import { useState, useEffect } from 'react'

export function useCollaborations() {
  const [collabs, setCollabs] = useState<Collaboration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await window.fetch('/api/collaborations')
        const data = await res.json()
        setCollabs(data)
      } catch {
        setError('Failed to fetch')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  async function createCollab(data: Partial<Collaboration>) {
    const res = await window.fetch('/api/collaborations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const newCollab = await res.json()
    setCollabs((prev) => [newCollab, ...prev])
    return newCollab
  }

  return { collabs, loading, error, createCollab }
}