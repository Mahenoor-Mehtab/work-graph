import { useState, useEffect } from 'react'

export function useAIInsights() {
  const [insights, setInsights] = useState<{
    strengths: string[]
    improvements: string[]
    opportunities: string[]
    careerPath: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await window.fetch('/api/ai/insights')
        const data = await res.json()
        setInsights(data)
      } catch {
        setError('Failed to fetch insights')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  async function getSkillGap(targetRole: string) {
    try {
      const res = await window.fetch('/api/ai/skill-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole }),
      })
      return await res.json()
    } catch {
      setError('Failed to fetch skill gap')
    }
  }

  return { insights, loading, error, getSkillGap }
}