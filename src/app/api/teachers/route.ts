import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all teachers
export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      include: { classes: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(teachers)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    )
  }
}

// CREATE a new teacher
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, subject } = body

    if (!fullName || !email || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const teacher = await prisma.teacher.create({
      data: { fullName, email, phone, subject },
    })

    return NextResponse.json(teacher, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create teacher' },
      { status: 500 }
    )
  }
}