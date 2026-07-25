import type { ReactNode } from "react";

interface CardProps {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Card({
  title,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-semibold border-b border-slate-200 pb-3 mb-6">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}