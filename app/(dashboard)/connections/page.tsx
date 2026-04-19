'use client'

import { motion } from 'framer-motion'
import { useCollaborations } from '@/hooks/useCollaborations'
import { authClient } from '@/lib/auth-client'
import CollaborationTimeline from '@/components/profile/CollaborationTimeline'
import LoadingState from '@/components/common/LoadingState'

export default function ConnectionsPage() {
  const { data: session } = authClient.useSession()
  const { collabs, loading } = useCollaborations()

  if (loading) return <LoadingState message="Loading connections..." />

  const verified = collabs.filter((c) => c.status === 'VERIFIED')
  const pending = collabs.filter((c) => c.status === 'PENDING')

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Connections</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Your verified collaboration network
        </p>
      </motion.div>

      {/* Verified */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-white font-semibold mb-4">
          Verified ({verified.length})
        </h2>
        <CollaborationTimeline
          collaborations={verified}
          currentUserId={session?.user?.id ?? ''}
        />
      </motion.div>

      {/* Pending */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-white font-semibold mb-4">
          Pending ({pending.length})
        </h2>
        <CollaborationTimeline
          collaborations={pending}
          currentUserId={session?.user?.id ?? ''}
        />
      </motion.div>
    </div>
  )
}