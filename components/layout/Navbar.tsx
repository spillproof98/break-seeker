"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const items = [
    { label: "Jobs", href: "/jobs" },
    { label: "Saved", href: "/jobs/saved" },
    { label: "Admin", href: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/jobs" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            B
          </div>
          <span className="text-lg font-semibold">Break Seekers</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${
                pathname?.startsWith(item.href)
                  ? "text-blue-600 font-medium"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
