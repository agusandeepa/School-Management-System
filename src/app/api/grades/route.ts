import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all grade records
export async function GET() {
  try {
    const grades = await prisma.grade.findMany({
      include: { student: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(grades)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch grades' },
      { status: 500 }
    )
  }
}

// CREATE a new grade record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentId, subject, marks, examName } = body

    if (!studentId || !subject || marks === undefined || !examName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const grade = await prisma.grade.create({
      data: {
        studentId: parseInt(studentId),
        subject,
        marks: parseFloat(marks),
        examName,
      },
    })

    return NextResponse.json(grade, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create grade record' },
      { status: 500 }
    )
  }
}