"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const path = usePathname();

  return (
    <aside className="w-full md:w-64 border-r bg-white p-4 space-y-3">
      <h2 className="text-sm font-semibold text-slate-700">Admin Menu</h2>

      <nav className="flex flex-col gap-1 text-sm">
        <Link
          href="/admin/dashboard"
          className={`px-3 py-2 rounded-lg ${
            path === "/admin/dashboard"
              ? "bg-blue-50 text-blue-600"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Dashboard
        </Link>

        <Link
          href="/admin/dashboard/create"
          className={`px-3 py-2 rounded-lg ${
            path === "/admin/dashboard/create"
              ? "bg-blue-50 text-blue-600"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          New Job
        </Link>
      </nav>
    </aside>
  );
}
