import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')

    if (username) {
      const user = await db.user.findUnique({
        where: { username },
        include: {
          skills: true,
          collaborations: {
            where: { status: 'VERIFIED' },
            include: { receiver: true },
          },
          receivedCollabs: {
            where: { status: 'VERIFIED' },
            include: { initiator: true },
          },
        },
      })

      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
      return NextResponse.json(user)
    }

    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        trustScore: true,
        bio: true,
      },
      orderBy: { trustScore: 'desc' },
      take: 20,
    })

    return NextResponse.json(users)
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}