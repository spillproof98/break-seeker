export default function Badge({
  children,
  color = "blue",
}: {
  children: React.ReactNode;
  color?: "blue" | "green" | "gray";
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    gray: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`badge rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}
