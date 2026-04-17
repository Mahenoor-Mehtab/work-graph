import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { model } from '@/lib/ai'

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const cached = await db.aIInsight.findFirst({
      where: {
        userId: session.user.id,
        type: 'general',
        generatedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    })

    if (cached) return NextResponse.json(cached.content)

    const collabs = await db.collaboration.findMany({
      where: {
        OR: [
          { initiatorId: session.user.id },
          { receiverId: session.user.id },
        ],
        status: 'VERIFIED',
      },
    })

    const skills = await db.userSkill.findMany({
      where: { userId: session.user.id },
    })

    const prompt = `
      Analyze this professional's work graph:
      - Total verified collaborations: ${collabs.length}
      - Skills: ${skills.map((s) => s.skill).join(', ')}
      - Projects: ${collabs.map((c) => c.projectName).join(', ')}
      
      Provide insights in JSON:
      {
        "strengths": string[],
        "improvements": string[],
        "opportunities": string[],
        "careerPath": string
      }
    `

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const content = JSON.parse(text.replace(/```json|```/g, '').trim())

    await db.aIInsight.create({
      data: {
        userId: session.user.id,
        type: 'general',
        content,
      },
    })

    return NextResponse.json(content)
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}