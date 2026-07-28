import { useFieldArray } from "react-hook-form";

import VisitCard from "./VisitCard";

import type {
  Control,
  UseFormRegister,
} from "react-hook-form";

import type { ReportForm } from "../../types/report";

interface Props {
  control: Control<ReportForm>;
  register: UseFormRegister<ReportForm>;
}

export default function VisitSection({
  control,
  register,
}: Props) {

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "visits",
  });

  return (
    <div className="space-y-6 mt-8">

        <h2 className="text-2xl font-semibold">
        Customer Visits ({fields.length})
        </h2>
      {fields.map((field, index) => (
       <VisitCard
            key={field.id}
            index={index}
            control={control}
            register={register}
            remove={remove}
            canRemove={fields.length > 1}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            visitType: "",
            clientName: "",
            location: "",
            personMet: "",
            designation: "",
            clientPhoneNumber: "",
            discussionSummary: "",
            nextAction: "",
            followUpDate: "",
          })
        }
        className="bg-teal-700 text-white px-5 py-3 rounded-lg"
      >
        + Add Visit
      </button>

    </div>
  );
}