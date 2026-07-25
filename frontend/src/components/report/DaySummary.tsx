import type { UseFormRegister } from "react-hook-form";
import type { ReportForm } from "../../types/report";
import Card from "../common/card";
import TextArea from "../common/TextArea";
import { ChartColumn } from "lucide-react";

interface Props {
  register: UseFormRegister<ReportForm>;
}

export default function DaySummary({
  register,
}: Props) {
  return (
    <Card
        title={
            <div className="flex items-center gap-2">
            <ChartColumn size={20} />
            DAY SUMMARY
            </div>
        }
        >

      <div className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Key Win
          </label>

          <TextArea
            rows={3}
            {...register("daySummary.keyWin")}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Challenges
          </label>

          <TextArea
            rows={3}
            {...register("daySummary.challenges")}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Other Remarks
          </label>

          <TextArea
            rows={3}
            {...register("daySummary.otherRemarks")}
            className="w-full border rounded-lg p-3"
          />
        </div>

      </div>

    </Card>
  );
}