'use client'

import { useState } from 'react'

interface Props {
  onFilterChange: (filter: {
    minTrustScore: number
    skill: string
  }) => void
}

export default function GraphControls({ onFilterChange }: Props) {
  const [minTrust, setMinTrust] = useState(0)
  const [skill, setSkill] = useState('')

  function handleApply() {
    onFilterChange({ minTrustScore: minTrust, skill })
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
      <div className="flex items-center gap-2">
        <label className="text-zinc-400 text-xs whitespace-nowrap">
          Min Trust
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={minTrust}
          onChange={(e) => setMinTrust(Number(e.target.value))}
          className="w-24 accent-purple-500"
        />
        <span className="text-white text-xs w-6">{minTrust}</span>
      </div>

      <div className="h-4 w-px bg-zinc-700" />

      <input
        placeholder="Filter by skill..."
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
      />

      <button
        onClick={handleApply}
        className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
      >
        Apply
      </button>
    </div>
  )
}