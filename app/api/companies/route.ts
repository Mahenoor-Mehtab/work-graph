import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const companies = await db.company.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(companies)
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

    const { name, logo, website } = await req.json()

    if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 })

    const company = await db.company.create({
      data: { name, logo, website },
    })

    return NextResponse.json(company, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}