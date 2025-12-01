import { ButtonHTMLAttributes } from "react";

export default function Button({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={`rounded-full px-4 py-2 text-sm font-medium transition active:scale-95
      bg-blue-600 text-white hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}
