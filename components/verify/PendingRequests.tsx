'use client'

import { useState, useEffect } from 'react'
import { Collaboration } from '@/types'
import CollabRequestCard from './CollabRequestCard'
import LoadingState from '@/components/common/LoadingState'

export default function PendingRequests() {
  const [pending, setPending] = useState<Collaboration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const res = await window.fetch('/api/collaborations')
      const data = await res.json()
      setPending(data.filter((c: Collaboration) => c.status === 'PENDING'))
      setLoading(false)
    }
    fetch()
  }, [])

  async function handleVerify(
    id: string,
    status: 'VERIFIED' | 'REJECTED',
    rating?: number
  ) {
    await window.fetch(`/api/collaborations/${id}/verify`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, rating }),
    })
    setPending((prev) => prev.filter((c) => c.id !== id))
  }

  if (loading) return <LoadingState message="Loading requests..." />

  if (pending.length === 0) {
    return (
      <p className="text-zinc-500 text-sm text-center py-8">
        No pending requests
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {pending.map((collab) => (
        <CollabRequestCard
          key={collab.id}
          collab={collab}
          onVerify={handleVerify}
        />
      ))}
    </div>
  )
}