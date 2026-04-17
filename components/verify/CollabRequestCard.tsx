import { Collaboration } from '@/types'
import UserAvatar from '@/components/common/UserAvatar'

interface Props {
  collab: Collaboration
  onVerify: (id: string, status: 'VERIFIED' | 'REJECTED', rating?: number) => void
}

export default function CollabRequestCard({ collab, onVerify }: Props) {
  return (
    <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/50">
      <div className="flex items-start gap-3">
        {collab.initiator && (
          <UserAvatar name={collab.initiator.name} avatar={collab.initiator.avatar} size={44} />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium">{collab.projectName}</h3>
            <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/20">
              Pending
            </span>
          </div>
          <p className="text-zinc-400 text-sm mt-0.5">
            from {collab.initiator?.name}
          </p>
          <p className="text-zinc-500 text-sm mt-2 line-clamp-2">
            {collab.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {collab.skillsUsed.map((skill) => (
              <span key={skill} className="text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onVerify(collab.id, 'VERIFIED', 5)}
          className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg py-2 text-sm transition-colors"
        >
          Verify
        </button>
        <button
          onClick={() => onVerify(collab.id, 'REJECTED')}
          className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg py-2 text-sm transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  )
}