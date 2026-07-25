import { useState } from "react";

import type {
  UseFormRegister,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import type { ReportForm } from "../../types/report";
import { Sparkles } from "lucide-react";

import { generateSummary } from "../../services/reportService";

import Card from "../common/card";
import TextArea from "../common/TextArea";
import Button from "../common/Button";

interface Props {
  register: UseFormRegister<ReportForm>;
  getValues: UseFormGetValues<ReportForm>;
  setValue: UseFormSetValue<ReportForm>;
  watch: UseFormWatch<ReportForm>;
}

export default function AISummary({
  register,
  getValues,
  setValue,
  watch,
}: Props) {

  const [loading, setLoading] = useState(false);
  const visits = watch("visits");
    const daySummary = watch("daySummary");

    const canGenerate =
    visits.length > 0 &&
    visits.every(
        (visit) =>
        visit.clientName.trim() !== "" &&
        visit.personMet.trim() !== "" &&
        visit.discussionSummary.trim() !== ""
    ) &&
    daySummary.keyWin.trim() !== "";

  const handleGenerate = async () => {

    try {

      setLoading(true);

      const formData = getValues();

      const response = await generateSummary(formData);

      setValue(
        "aiSummary",
        response.summary
      );

    } catch (error) {

      console.error(error);

      alert("Failed to generate summary.");

    } finally {

      setLoading(false);

    }
  };

  return (

    <Card
        title={
            <div className="flex items-center gap-2">
            <Sparkles size={20} />
            AI SUMMARY
            </div>
        }
        >

      <div className="flex justify-between items-center mb-6">

        <Button
        type="button"
        onClick={handleGenerate}
        disabled={!canGenerate || loading}
        className={`px-5 py-2 rounded-lg text-white transition-colors ${
            !canGenerate || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-teal-700 hover:bg-teal-800"
        }`}
        >
          {loading
        ? "Generating AI Summary..."
        : "Generate AI Summary"}
        </Button>

      </div>

      <TextArea
        rows={8}
        {...register("aiSummary")}
        className="w-full border rounded-lg p-4"
        placeholder="AI Summary will appear here..."
      />

    </Card>

  );
}