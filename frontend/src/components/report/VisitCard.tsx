import type { UseFormRegister } from "react-hook-form";
import type { ReportForm } from "../../types/report";
import Card from "../common/card";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import { Building2 } from "lucide-react";

interface Props {
  index: number;
  register: UseFormRegister<ReportForm>;
  remove: (index: number) => void;
  canRemove: boolean;
}

export default function VisitCard({
  index,
  register,
  remove,
  canRemove,
}: Props) {
  return (
    <Card
        title={
          <div className="flex items-center gap-2">
            <Building2 size={20} />
            Customer Visits
          </div>
        }
      >

      <div className="flex justify-between items-center">

        <h3 className="text-lg font-semibold">
          Visit #{index + 1}
        </h3>

        {canRemove && (
          <Button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Remove
          </Button>
        )}

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <Input
          placeholder="Visit Type"
          {...register(`visits.${index}.visitType`)}
          className="border rounded-lg p-3"
        />

        <Input
          placeholder="Company Name *"
          {...register(`visits.${index}.clientName`)}
          className="border rounded-lg p-3"
        />

        <Input
          placeholder="Location"
          {...register(`visits.${index}.location`)}
          className="border rounded-lg p-3"
        />

        <Input
          placeholder="Person Met *"
          {...register(`visits.${index}.personMet`)}
          className="border rounded-lg p-3"
        />

        <Input
          placeholder="Designation *"
          {...register(`visits.${index}.designation`)}
          className="border rounded-lg p-3"
        />

        <Input
          placeholder="Decision Maker"
          {...register(`visits.${index}.decisionMaker`)}
          className="border rounded-lg p-3"
        />

        <TextArea
          placeholder="Discussion Summary *"
          {...register(`visits.${index}.discussionSummary`)}
          className="border rounded-lg p-3 md:col-span-2"
        />

        <TextArea
          placeholder="Next Action *"
          {...register(`visits.${index}.nextAction`)}
          className="border rounded-lg p-3"
        />

        <Input
          type="date"
          {...register(`visits.${index}.followUpDate`)}
          className="border rounded-lg p-3"
        />

      </div>

    </Card>
  );
}