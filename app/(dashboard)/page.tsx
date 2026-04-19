'use client'

import { motion } from 'framer-motion'
import { useWorkGraph } from '@/hooks/useWorkGraph'
import { authClient } from '@/lib/auth-client'
import WorkGraphCanvas from '@/components/graph/WorkGraphCanvas'
import GraphControls from '@/components/graph/GraphControls'
import LoadingState from '@/components/common/LoadingState'

export default function GraphPage() {
  const { data: session } = authClient.useSession()
  const { graphData, loading } = useWorkGraph(session?.user?.id ?? '')

  if (loading) return <LoadingState message="Building your graph..." />

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">My Work Graph</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Your verified collaboration network
        </p>
      </motion.div>

      <GraphControls
        onFilterChange={(filter) => console.log(filter)}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <WorkGraphCanvas
          data={graphData}
          currentUserId={session?.user?.id ?? ''}
          currentUserName={session?.user?.name ?? ''}
        />
      </motion.div>
    </div>
  )
}