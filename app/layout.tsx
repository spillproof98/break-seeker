import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Break Seekers - Job Board",
  description: "LinkedIn-style job board built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/jobs" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                B
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Break Seekers
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <Link
                href="/jobs"
                className="hover:text-blue-600 transition-colors"
              >
                Jobs
              </Link>
              <Link
                href="/jobs/saved"
                className="hover:text-blue-600 transition-colors"
              >
                Saved
              </Link>
              <Link
                href="/admin"
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                Admin
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
