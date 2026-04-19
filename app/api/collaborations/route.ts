import { db } from '@/lib/db'
import { collaborationSchema } from '@/lib/validators'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

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
      include: {
        initiator: true,
        receiver: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(collabs)
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { receiverUsername, ...rest } = body

    // username se receiver find karo
    const receiver = await db.user.findUnique({
      where: { username: receiverUsername },
    })

    if (!receiver) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const validated = collaborationSchema.parse({
      ...rest,
      receiverId: receiver.id,
    })

    const collab = await db.collaboration.create({
      data: {
        ...validated,
        initiatorId: session.user.id,
        startDate: new Date(validated.startDate),
        endDate: validated.endDate ? new Date(validated.endDate) : undefined,
      },
    })

    return NextResponse.json(collab, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}