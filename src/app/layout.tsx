import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Management System",
  description: "Manage students, teachers, classes, attendance and grades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gradient-to-b from-indigo-950 to-slate-900 text-white flex flex-col fixed h-screen">
            <div className="p-6 border-b border-white/10">
              <h1 className="text-xl font-bold tracking-tight">🏫 School MS</h1>
              <p className="text-indigo-300 text-sm mt-1">Management System</p>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:bg-white/10 hover:text-white transition">
                <span>📊</span> Dashboard
              </a>
              <a href="/students" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:bg-white/10 hover:text-white transition">
                <span>👨‍🎓</span> Students
              </a>
              <a href="/teachers" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:bg-white/10 hover:text-white transition">
                <span>👩‍🏫</span> Teachers
              </a>
              <a href="/classes" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:bg-white/10 hover:text-white transition">
                <span>🏛️</span> Classes
              </a>
              <a href="/attendance" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:bg-white/10 hover:text-white transition">
                <span>📅</span> Attendance
              </a>
              <a href="/grades" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:bg-white/10 hover:text-white transition">
                <span>📝</span> Grades
              </a>
            </nav>
            <div className="p-4 border-t border-white/10 text-indigo-300 text-xs">
              © 2026 School MS
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-64 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}