export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Break Seekers — All rights reserved.
      </div>
    </footer>
  );
}
