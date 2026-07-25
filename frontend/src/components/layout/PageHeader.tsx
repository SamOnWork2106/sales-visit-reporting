import { ClipboardList } from "lucide-react";

export default function PageHeader() {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-teal-700 flex items-center justify-center">
          <ClipboardList className="text-white" size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Sales Visit Reporting
          </h1>

          <p className="text-sm text-slate-500">
            Daily Sales Visit Report
          </p>
        </div>
      </div>
    </header>
  );
}