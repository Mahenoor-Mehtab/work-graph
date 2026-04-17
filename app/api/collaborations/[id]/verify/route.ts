
import { db } from '@/lib/db'
import { verifyCollabSchema } from '@/lib/validators'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { calculateTrustScore } from '@/lib/trust-score'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const validated = verifyCollabSchema.parse(body)

    const collab = await db.collaboration.findUnique({
      where: { id: params.id },
    })

    if (!collab) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    if (collab.receiverId !== session.user.id)
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const updated = await db.collaboration.update({
      where: { id: params.id },
      data: {
        status: validated.status,
        receiverRating: validated.rating,
        verifiedAt: validated.status === 'VERIFIED' ? new Date() : undefined,
      },
    })

    if (validated.status === 'VERIFIED') {
      const allCollabs = await db.collaboration.findMany({
        where: {
          OR: [
            { initiatorId: collab.initiatorId },
            { receiverId: collab.initiatorId },
          ],
        },
      })

      const newScore = await calculateTrustScore(
        collab.initiatorId,
        allCollabs as any
      )

      await db.user.update({
        where: { id: collab.initiatorId },
        data: { trustScore: newScore },
      })
    }

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}