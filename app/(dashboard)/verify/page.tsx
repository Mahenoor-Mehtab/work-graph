'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PendingRequests from '@/components/verify/PendingRequests'
import VerificationModal from '@/components/verify/VerificationModal'
import { useCollaborations } from '@/hooks/useCollaborations'
import { Button } from '@/components/ui/button'

export default function VerifyPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const { createCollab } = useCollaborations()

  async function handleSubmit(data: any) {
    await createCollab(data)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Verify Collaborations</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Manage your collaboration requests
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          + Add Collaboration
        </Button>
      </motion.div>

      <PendingRequests />

      <VerificationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}