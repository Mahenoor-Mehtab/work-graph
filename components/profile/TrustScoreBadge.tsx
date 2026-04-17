interface Props {
  score: number
}

export default function TrustScoreBadge({ score }: Props) {
  const getColor = () => {
    if (score >= 80) return 'text-green-400 border-green-400/30 bg-green-400/10'
    if (score >= 60) return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'
    if (score >= 40) return 'text-orange-400 border-orange-400/30 bg-orange-400/10'
    return 'text-red-400 border-red-400/30 bg-red-400/10'
  }

  const getLabel = () => {
    if (score >= 80) return 'Highly Trusted'
    if (score >= 60) return 'Trusted'
    if (score >= 40) return 'Building Trust'
    return 'New'
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getColor()}`}>
      <div className="relative w-8 h-8">
        <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
          <circle
            cx="16" cy="16" r="12"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.2}
            strokeWidth="3"
          />
          <circle
            cx="16" cy="16" r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${(score / 100) * 75.4} 75.4`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">
          {score}
        </span>
      </div>
      <span className="text-sm font-medium">{getLabel()}</span>
    </div>
  )
}