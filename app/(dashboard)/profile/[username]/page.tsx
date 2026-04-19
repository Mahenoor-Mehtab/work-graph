'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import UserAvatar from '@/components/common/UserAvatar'
import TrustScoreBadge from '@/components/profile/TrustScoreBadge'
import SkillProofCard from '@/components/profile/SkillProofCard'
import CollaborationTimeline from '@/components/profile/CollaborationTimeline'
import AIInsightsPanel from '@/components/profile/AIInsightsPanel'
import LoadingState from '@/components/common/LoadingState'

export default function ProfilePage() {
  const { username } = useParams()
  const { data: session } = authClient.useSession()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const res = await window.fetch(`/api/users?username=${username}`)
      const data = await res.json()
      setUser(data)
      setLoading(false)
    }
    fetch()
  }, [username])

  if (loading) return <LoadingState message="Loading profile..." />
  if (!user) return <p className="text-zinc-400 text-center py-20">User not found</p>

  const isOwner = session?.user?.id === user.id
  const allCollabs = [...(user.collaborations ?? []), ...(user.receivedCollabs ?? [])]

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-zinc-800 rounded-2xl p-6 bg-zinc-900/40"
      >
        <div className="flex items-start gap-4">
          <UserAvatar name={user.name} avatar={user.avatar} size={72} />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                {user.username && (
                  <p className="text-zinc-500 text-sm">@{user.username}</p>
                )}
              </div>
              <TrustScoreBadge score={user.trustScore} />
            </div>
            {user.bio && (
              <p className="text-zinc-400 text-sm mt-2">{user.bio}</p>
            )}
            <div className="flex gap-4 mt-3 text-sm text-zinc-500">
              <span>{allCollabs.length} collaborations</span>
              <span>{user.skills?.length ?? 0} verified skills</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      {user.skills?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-white font-semibold mb-4">Verified Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {user.skills.map((skill: any) => (
              <SkillProofCard key={skill.id} skill={skill} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Collaborations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-white font-semibold mb-4">
          Collaboration History
        </h2>
        <CollaborationTimeline
          collaborations={allCollabs}
          currentUserId={user.id}
        />
      </motion.div>

      {/* AI Insights - only for owner */}
      {isOwner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-white font-semibold mb-4">AI Insights</h2>
          <AIInsightsPanel />
        </motion.div>
      )}
    </div>
  )
}