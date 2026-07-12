import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all students
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: { class: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(students)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

// CREATE a new student
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, admissionNo, dateOfBirth, gender, address, phone, classId } = body

    if (!fullName || !admissionNo || !dateOfBirth || !gender) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const student = await prisma.student.create({
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

    return NextResponse.json(student, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    )
  }
}