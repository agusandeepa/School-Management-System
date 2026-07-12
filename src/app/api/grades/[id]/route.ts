import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// UPDATE a grade record
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { studentId, subject, marks, examName } = body

    const grade = await prisma.grade.update({
      where: { id: parseInt(params.id) },
      data: {
        studentId: parseInt(studentId),
        subject,
        marks: parseFloat(marks),
        examName,
      },
    })

    return NextResponse.json(grade)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update grade record' },
      { status: 500 }
    )
  }
}

// DELETE a grade record
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.grade.delete({
      where: { id: parseInt(params.id) },
    })
    return NextResponse.json({ message: 'Grade record deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete grade record' },
      { status: 500 }
    )
  }
}