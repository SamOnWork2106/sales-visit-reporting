import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea(props: Props) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-slate-300 px-4 py-3
      focus:outline-none focus:ring-2 focus:ring-teal-600
      ${props.className ?? ""}`}
    />
  );
}