# School Management System

A full-stack School Management System built with **Next.js**, featuring student, teacher, class, attendance, and grade management — with data persisted in a database via **Prisma ORM**.

## Features

1. **Student Management** — Add, edit, delete, and view student records
2. **Teacher Management** — Add, edit, delete, and view teacher records
3. **Class/Course Management** — Create classes and assign teachers to them
4. **Attendance Management** — Record and track student attendance (Present/Absent/Late)
5. **Grades/Marks Management** — Record exam marks per student and subject

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (via [Neon](https://neon.tech)) / SQLite (local dev), managed with **Prisma ORM**
- **Deployment:** Vercel

## Getting Started (Local Development)

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/school-management-system.git
cd school-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables — create a `.env` file in the root:
```
DATABASE_URL="file:./dev.db"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/            # Backend API routes (students, teachers, classes, attendance, grades)
│   ├── students/        # Student management page
│   ├── teachers/        # Teacher management page
│   ├── classes/          # Class management page
│   ├── attendance/       # Attendance management page
│   ├── grades/           # Grades management page
│   ├── layout.tsx        # Root layout with sidebar navigation
│   └── page.tsx          # Dashboard
├── lib/
│   └── prisma.ts         # Prisma client instance
prisma/
└── schema.prisma         # Database schema (models)
```

## Database Schema

- **Student** — fullName, admissionNo, dateOfBirth, gender, address, phone, class relation
- **Teacher** — fullName, email, phone, subject
- **Class** — name, grade, teacher relation, students relation
- **Attendance** — student relation, date, status
- **Grade** — student relation, subject, marks, examName

## Author

Developed as an academic assignment project.