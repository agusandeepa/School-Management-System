import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all attendance records
export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany({
      include: { student: true },
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(attendance)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch attendance' },
      { status: 500 }
    )
  }
}

// CREATE a new attendance record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentId, date, status } = body

    if (!studentId || !date || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const record = await prisma.attendance.create({
      data: {
        studentId: parseInt(studentId),
        date: new Date(date),
        status,
      },
    })

    return NextResponse.json(record, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create attendance record' },
      { status: 500 }
    )
  }
}