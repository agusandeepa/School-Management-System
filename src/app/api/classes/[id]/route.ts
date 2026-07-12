import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// UPDATE a class
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, grade, teacherId } = body

    const updatedClass = await prisma.class.update({
      where: { id: parseInt(params.id) },
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.class.delete({
      where: { id: parseInt(params.id) },
    })
    return NextResponse.json({ message: 'Class deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete class' },
      { status: 500 }
    )
  }
}