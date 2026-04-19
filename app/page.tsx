'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function LandingPage() {

  const { data: session } = authClient.useSession()
const router = useRouter()

useEffect(() => {
  if (session) {
    router.push('/dashboard')
  }
}, [session])
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Purple Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <span className="text-white font-bold text-xl">
            Work<span className="text-purple-400">Graph</span>
          </span>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-zinc-400 hover:text-white">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/10">
              ✦ Verified Work. Real Trust.
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
          >
            Your career,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              proven by work.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            WorkGraph replaces fake resumes with verified collaboration history.
            Every project. Every skill. Confirmed by the people you worked with.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 h-12 text-base"
              >
                Build Your Graph →
              </Button>
            </Link>
            <Link href="/discover">
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 h-12 text-base"
              >
                Explore Talent
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto px-6 py-12"
        >
          <div className="grid grid-cols-3 gap-6 border border-zinc-800 rounded-2xl p-8 bg-zinc-900/40 backdrop-blur-sm">
            {[
              { value: '10K+', label: 'Verified Professionals' },
              { value: '50K+', label: 'Collaborations Verified' },
              { value: '98%', label: 'Hiring Accuracy' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-zinc-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-10"
          >
            Why WorkGraph?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: '🔗',
                title: 'Verified Collaborations',
                desc: 'Every project confirmed by both parties. No fake experience.',
              },
              {
                icon: '🤖',
                title: 'AI Trust Score',
                desc: 'Gemini AI analyzes your graph and generates a real trust score.',
              },
              {
                icon: '🕸️',
                title: 'Work Graph',
                desc: 'Visualize your entire career as an interactive network graph.',
              },
              {
                icon: '🎯',
                title: 'Smart Matching',
                desc: 'Companies find you based on verified skills, not keywords.',
              },
              {
                icon: '🔒',
                title: 'Anonymous Mode',
                desc: 'Go dark when not looking. Appear only when ready.',
              },
              {
                icon: '📈',
                title: 'Skill Gap Analysis',
                desc: 'AI tells you exactly what to learn for your dream role.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/40 hover:border-purple-500/40 transition-colors"
              >
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="text-white font-semibold mt-3 mb-1">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-2xl mx-auto px-6 py-20 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to prove your work?
          </h2>
          <p className="text-zinc-400 mb-8">
            Join thousands of professionals building verified careers.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-10 h-12 text-base"
            >
              Get Started Free →
            </Button>
          </Link>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 py-6 text-center text-zinc-600 text-sm">
          © 2026 WorkGraph. Built with ❤️ in India.
        </footer>
      </div>
    </main>
  )
}