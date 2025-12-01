export default function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`card rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
