
'use client'

import { useAIInsights } from '@/hooks/useAIInsights'
import LoadingState from '@/components/common/LoadingState'

export default function AIInsightsPanel() {
  const { insights, loading, error } = useAIInsights()

  if (loading) return <LoadingState message="AI analyzing your graph..." />
  if (error) return <p className="text-red-400 text-sm">{error}</p>
  if (!insights) return null

  return (
    <div className="space-y-4">
      <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-4">
        <h3 className="text-green-400 font-medium text-sm mb-2">Strengths</h3>
        <ul className="space-y-1">
          {insights.strengths.map((s, i) => (
            <li key={i} className="text-zinc-300 text-sm flex gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-yellow-500/20 bg-yellow-500/5 rounded-xl p-4">
        <h3 className="text-yellow-400 font-medium text-sm mb-2">Improvements</h3>
        <ul className="space-y-1">
          {insights.improvements.map((s, i) => (
            <li key={i} className="text-zinc-300 text-sm flex gap-2">
              <span className="text-yellow-400 mt-0.5">→</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-purple-500/20 bg-purple-500/5 rounded-xl p-4">
        <h3 className="text-purple-400 font-medium text-sm mb-2">Opportunities</h3>
        <ul className="space-y-1">
          {insights.opportunities.map((s, i) => (
            <li key={i} className="text-zinc-300 text-sm flex gap-2">
              <span className="text-purple-400 mt-0.5">★</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-zinc-700 bg-zinc-900/50 rounded-xl p-4">
        <h3 className="text-zinc-300 font-medium text-sm mb-2">Career Path</h3>
        <p className="text-zinc-400 text-sm">{insights.careerPath}</p>
      </div>
    </div>
  )
}