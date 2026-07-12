import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// UPDATE a class
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, grade, teacherId } = body

    const updatedClass = await prisma.class.update({
      where: { id: parseInt(id) },
      data: {
        name,
        grade,
        teacherId: teacherId ? parseInt(teacherId) : null,
      },
    })

    return NextResponse.json(updatedClass)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update class' },
      { status: 500 }
    )
  }
}

// DELETE a class
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.class.delete({
      where: { id: parseInt(id) },
    })
    return NextResponse.json({ message: 'Class deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete class' },
      { status: 500 }
    )
  }
}