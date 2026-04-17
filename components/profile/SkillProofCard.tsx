import { UserSkill } from '@/types'

interface Props {
  skill: UserSkill
}

export default function SkillProofCard({ skill }: Props) {
  return (
    <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/50 hover:border-purple-500/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-medium">{skill.skill}</h3>
        <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full border border-purple-400/20">
          {skill.proofCount} {skill.proofCount === 1 ? 'proof' : 'proofs'}
        </span>
      </div>

      <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3">
        <div
          className="bg-purple-500 h-1.5 rounded-full transition-all"
          style={{ width: `${Math.min(skill.proofCount * 20, 100)}%` }}
        />
      </div>

      {skill.lastUsed && (
        <p className="text-zinc-500 text-xs mt-2">
          Last used: {new Date(skill.lastUsed).toLocaleDateString()}
        </p>
      )}
    </div>
  )
}