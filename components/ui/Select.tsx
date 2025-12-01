import { SelectHTMLAttributes } from "react";

export default function Select({
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`select w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm
      focus:border-blue-600 focus:ring-blue-600 ${className}`}
    >
      {children}
    </select>
  );
}
