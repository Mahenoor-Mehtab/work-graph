import { Handle, Position } from '@xyflow/react'

interface Props {
  data: {
    label: string
    trustScore?: number
    username?: string
    isCurrentUser: boolean
  }
}

export default function NodeCard({ data }: Props) {
  return (
    <div className={`px-4 py-3 rounded-xl border shadow-lg min-w-[140px] ${
      data.isCurrentUser
        ? 'bg-purple-600 border-purple-400 text-white'
        : 'bg-zinc-900 border-zinc-700 text-white'
    }`}>
      <Handle type="target" position={Position.Top} className="!bg-purple-500" />

      <p className="font-semibold text-sm text-center">{data.label}</p>

      {data.username && (
        <p className="text-xs text-center mt-0.5 opacity-60">@{data.username}</p>
      )}

      {data.trustScore !== undefined && (
        <div className="mt-2 flex items-center justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs opacity-80">{data.trustScore} trust</span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-purple-500" />
    </div>
  )
}