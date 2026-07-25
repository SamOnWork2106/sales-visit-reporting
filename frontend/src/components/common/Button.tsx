import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  children,
  loading = false,
  disabled,
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        rounded-lg
        px-5
        py-3
        font-medium
        transition
        ${
          disabled || loading
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-teal-700 hover:bg-teal-800"
        }
        text-white
        ${className}
      `}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}