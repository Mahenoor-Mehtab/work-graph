import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

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


export async function PATCH(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { username } = await req.json()

    const user = await db.user.update({
      where: { id: session.user.id },
      data: { username },
    })

    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}