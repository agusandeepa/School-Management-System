import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all classes
export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: { teacher: true, students: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(classes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch classes' },
      { status: 500 }
    )
  }
}

// CREATE a new class
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, grade, teacherId } = body

    if (!name || !grade) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newClass = await prisma.class.create({
      data: {
        name,
        grade,
        teacherId: teacherId ? parseInt(teacherId) : null,
      },
    })

    return NextResponse.json(newClass, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create class' },
      { status: 500 }
    )
  }
}