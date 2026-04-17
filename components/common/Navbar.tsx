'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session, isPending } = authClient.useSession()

  if (isPending) return null // session load hone tak kuch mat dikhao

  return (
    <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-md fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl">
          Work<span className="text-purple-500">Graph</span>
        </Link>

        <div className="flex items-center gap-6">
          {session ? (
            <>
              <Link href="/graph" className={`text-sm ${pathname === '/graph' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
                My Graph
              </Link>
              <Link href="/discover" className={`text-sm ${pathname === '/discover' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
                Discover
              </Link>
              <Link href="/verify" className={`text-sm ${pathname === '/verify' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
                Verify
              </Link>
              <button
                onClick={() => authClient.signOut()}
                className="text-sm text-zinc-400 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-zinc-400 hover:text-white">
                Login
              </Link>
              <Link href="/register" className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}