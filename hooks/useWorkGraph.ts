
import { useState, useEffect } from 'react'
import { GraphData } from '@/types/graph'
import { buildGraphData } from '@/lib/graph-utils'

export function useWorkGraph(userId: string) {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    async function fetch() {
      try {
        const [collabRes, usersRes] = await Promise.all([
          window.fetch('/api/collaborations'),
          window.fetch('/api/users'),
        ])

        const collabs = await collabRes.json()
        const users = await usersRes.json()

        const data = buildGraphData(userId, collabs, users)
        setGraphData({
          ...data,
          edges: data.edges.map(edge => ({ ...edge, verified: true }))
        })
      } catch {
        setError('Failed to fetch graph')
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [userId])

  return { graphData, loading, error }
}