import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// UPDATE a student
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { fullName, admissionNo, dateOfBirth, gender, address, phone, classId } = body

    const student = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        fullName,
        admissionNo,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        address,
        phone,
        classId: classId ? parseInt(classId) : null,
      },
    })

    return NextResponse.json(student)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    )
  }
}

// DELETE a student
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.student.delete({
      where: { id: parseInt(id) },
    })
    return NextResponse.json({ message: 'Student deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}