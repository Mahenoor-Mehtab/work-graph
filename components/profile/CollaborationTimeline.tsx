import { Collaboration } from '@/types'
import UserAvatar from '@/components/common/UserAvatar'

interface Props {
  collaborations: Collaboration[]
  currentUserId: string
}

export default function CollaborationTimeline({ collaborations, currentUserId }: Props) {
  return (
    <div className="space-y-4">
      {collaborations.length === 0 && (
        <p className="text-zinc-500 text-sm text-center py-8">
          No verified collaborations yet
        </p>
      )}

      {collaborations.map((collab) => {
        const other =
          collab.initiatorId === currentUserId
            ? collab.receiver
            : collab.initiator

        return (
          <div
            key={collab.id}
            className="flex gap-4 border border-zinc-800 rounded-xl p-4 bg-zinc-900/50"
          >
            <div className="flex-shrink-0">
              {other && (
                <UserAvatar name={other.name} avatar={other.avatar} size={40} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-white font-medium truncate">
                  {collab.projectName}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                  collab.status === 'VERIFIED'
                    ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                    : collab.status === 'PENDING'
                    ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                    : 'bg-red-400/10 text-red-400 border border-red-400/20'
                }`}>
                  {collab.status}
                </span>
              </div>

              {other && (
                <p className="text-zinc-400 text-sm mt-0.5">
                  with {other.name}
                </p>
              )}

              <p className="text-zinc-500 text-sm mt-1 line-clamp-2">
                {collab.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {collab.skillsUsed.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="text-zinc-600 text-xs mt-2">
                {new Date(collab.startDate).toLocaleDateString()} —{' '}
                {collab.endDate
                  ? new Date(collab.endDate).toLocaleDateString()
                  : 'Present'}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}