import { useState, useEffect } from 'react'

export function useTrustScore() {
  const [score, setScore] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await window.fetch('/api/ai/trust-score')
        const data = await res.json()
        setScore(data.score)
      } catch {
        setError('Failed to fetch')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  async function refresh() {
    setLoading(true)
    try {
      const res = await window.fetch('/api/ai/trust-score')
      const data = await res.json()
      setScore(data.score)
    } catch {
      setError('Failed to refresh')
    } finally {
      setLoading(false)
    }
  }

  return { score, loading, error, refresh }
}