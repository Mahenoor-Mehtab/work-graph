
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { generateSkillGap } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { targetRole } = await req.json()

    if (!targetRole) return NextResponse.json({ error: 'Target role required' }, { status: 400 })

    const skills = await db.userSkill.findMany({
      where: { userId: session.user.id },
    })

    const result = await generateSkillGap(
      skills.map((s) => s.skill),
      targetRole
    )

    const parsed = JSON.parse(result.replace(/```json|```/g, '').trim())

    await db.aIInsight.create({
      data: {
        userId: session.user.id,
        type: 'skill_gap',
        content: parsed,
      },
    })

    return NextResponse.json(parsed)
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}