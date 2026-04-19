'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User } from '@/types'
import UserAvatar from '@/components/common/UserAvatar'
import TrustScoreBadge from '@/components/profile/TrustScoreBadge'
import LoadingState from '@/components/common/LoadingState'

export default function DiscoverPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetch() {
      const res = await window.fetch('/api/users')
      const data = await res.json()
      setUsers(data)
      setLoading(false)
    }
    fetch()
  }, [])

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.username?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <LoadingState message="Discovering talent..." />

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Discover</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Find verified professionals
        </p>
      </motion.div>

      {/* Search */}
      <motion.input
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        placeholder="Search by name or username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
      />

      {/* Users Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/40 hover:border-purple-500/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <UserAvatar name={user.name} avatar={user.avatar} size={48} />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user.name}</p>
                {user.username && (
                  <p className="text-zinc-500 text-sm">@{user.username}</p>
                )}
              </div>
            </div>

            {user.bio && (
              <p className="text-zinc-400 text-sm mt-3 line-clamp-2">
                {user.bio}
              </p>
            )}

            <div className="mt-3">
              <TrustScoreBadge score={user.trustScore} />
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <p className="text-zinc-500 text-sm col-span-3 text-center py-8">
            No users found
          </p>
        )}
      </div>
    </div>
  )
}