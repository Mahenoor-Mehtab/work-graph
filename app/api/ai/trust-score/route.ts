import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { calculateTrustScore } from '@/lib/trust-score'

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const collabs = await db.collaboration.findMany({
      where: {
        OR: [
          { initiatorId: session.user.id },
          { receiverId: session.user.id },
        ],
      },
    })

    const score = await calculateTrustScore(
      session.user.id,
      collabs as any
    )

    await db.user.update({
      where: { id: session.user.id },
      data: { trustScore: score },
    })

    return NextResponse.json({ score })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}