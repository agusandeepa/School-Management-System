import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// UPDATE an attendance record
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { studentId, date, status } = body

    const record = await prisma.attendance.update({
      where: { id: parseInt(params.id) },
      data: {
        studentId: parseInt(studentId),
        date: new Date(date),
        status,
      },
    })

    return NextResponse.json(record)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update attendance record' },
      { status: 500 }
    )
  }
}

// DELETE an attendance record
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.attendance.delete({
      where: { id: parseInt(params.id) },
    })
    return NextResponse.json({ message: 'Attendance record deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete attendance record' },
      { status: 500 }
    )
  }
}