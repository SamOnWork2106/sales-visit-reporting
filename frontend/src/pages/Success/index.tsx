import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-lg w-full text-center">

        <CheckCircle2
          size={72}
          className="mx-auto text-green-600 mb-6"
        />

        <h1 className="text-3xl font-bold text-slate-800">
          Report Submitted Successfully
        </h1>

        <p className="text-slate-600 mt-4">
          Your daily sales visit report has been emailed successfully to the manager.
        </p>

        <div className="mt-8">
          <Button
            onClick={() => navigate("/report")}
          >
            Submit Another Report
          </Button>
        </div>

      </div>
    </div>
  );
}