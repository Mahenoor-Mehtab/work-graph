'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')



  async function handleRegister() {
  setLoading(true)
  setError('')
  const { error, data } = await authClient.signUp.email({
    name: form.name,
    email: form.email,
    password: form.password,
  })
  if (error) {
    setError(error.message ?? 'Something went wrong')
    setLoading(false)
    return
  }

  // username manually save karo
  await fetch('/api/users', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: form.username }),
  })

  router.push('/')
}

  async function handleGoogle() {
    await authClient.signIn.social({ provider: 'google' })
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="border border-zinc-800 rounded-2xl p-8 bg-zinc-900/60 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">
              Work<span className="text-purple-400">Graph</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-2">
              Build your verified career graph
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Full Name</Label>
              <Input
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-zinc-300">Username</Label>
              <Input
                placeholder="johndoe"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-zinc-300">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-zinc-300">Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
              />
            </div>

            <Button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs text-zinc-500">
                <span className="bg-zinc-900 px-2">or continue with</span>
              </div>
            </div>

            <Button
              onClick={handleGoogle}
              variant="outline"
              className="w-full border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 h-11"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </div>

          <p className="text-center text-zinc-500 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  )
}