import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-slate-300 px-4 py-3
      focus:outline-none focus:ring-2 focus:ring-teal-600
      disabled:bg-slate-100
      ${props.className ?? ""}`}
    />
  );
}