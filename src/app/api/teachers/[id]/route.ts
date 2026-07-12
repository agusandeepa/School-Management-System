import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// UPDATE a teacher
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { fullName, email, phone, subject } = body

    const teacher = await prisma.teacher.update({
      where: { id: parseInt(id) },
      data: { fullName, email, phone, subject },
    })

    return NextResponse.json(teacher)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update teacher' },
      { status: 500 }
    )
  }
}

// DELETE a teacher
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.teacher.delete({
      where: { id: parseInt(id) },
    })
    return NextResponse.json({ message: 'Teacher deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete teacher' },
      { status: 500 }
    )
  }
}