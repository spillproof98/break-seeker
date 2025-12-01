import { InputHTMLAttributes } from "react";

export default function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`input border-slate-300 w-full rounded-lg border px-3 py-2 text-sm
      focus:border-blue-600 focus:ring-blue-600 ${className}`}
    />
  );
}
