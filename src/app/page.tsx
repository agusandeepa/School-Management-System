import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const studentCount = await prisma.student.count();
  const teacherCount = await prisma.teacher.count();
  const classCount = await prisma.class.count();
  const attendanceCount = await prisma.attendance.count();
  const gradeCount = await prisma.grade.count();

  const stats = [
    { label: "Students", value: studentCount, icon: "👨‍🎓", color: "bg-indigo-500" },
    { label: "Teachers", value: teacherCount, icon: "👩‍🏫", color: "bg-emerald-500" },
    { label: "Classes", value: classCount, icon: "🏛️", color: "bg-violet-500" },
    { label: "Attendance Records", value: attendanceCount, icon: "📅", color: "bg-amber-500" },
    { label: "Grade Records", value: gradeCount, icon: "📝", color: "bg-rose-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome to the School Management System</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4"
          >
            <div className={`${stat.color} text-white text-2xl w-14 h-14 rounded-lg flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Quick Guide</h2>
        <p className="text-gray-500 text-sm">
          Use the sidebar to navigate between Students, Teachers, Classes, Attendance
          and Grades. Each section lets you add, edit, and delete records.
        </p>
      </div>
    </div>
  );
}