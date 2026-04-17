'use client'

import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    receiverUsername: string
    projectName: string
    description: string
    startDate: string
    endDate?: string
    skillsUsed: string[]
  }) => void
}

export default function VerificationModal({ isOpen, onClose, onSubmit }: Props) {
  const [form, setForm] = useState({
    receiverUsername: '',
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    skillsUsed: '',
  })

  if (!isOpen) return null

  function handleSubmit() {
    onSubmit({
      ...form,
      skillsUsed: form.skillsUsed.split(',').map((s) => s.trim()).filter(Boolean),
      endDate: form.endDate || undefined,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-white font-semibold text-lg mb-4">
          Add Collaboration
        </h2>

        <div className="space-y-3">
          <input
            placeholder="Collaborator username"
            value={form.receiverUsername}
            onChange={(e) => setForm({ ...form, receiverUsername: e.target.value })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
          />
          <input
            placeholder="Project name"
            value={form.projectName}
            onChange={(e) => setForm({ ...form, projectName: e.target.value })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
          />
          <textarea
            placeholder="What did you work on together?"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 resize-none"
          />
          <input
            placeholder="Skills used (comma separated)"
            value={form.skillsUsed}
            onChange={(e) => setForm({ ...form, skillsUsed: e.target.value })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            />
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 border border-zinc-700 text-zinc-400 hover:text-white rounded-lg py-2 text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 text-sm transition-colors"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  )
}