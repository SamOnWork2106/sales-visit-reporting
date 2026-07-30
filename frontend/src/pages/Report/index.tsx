import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import type { ReportForm } from "../../types/report";

import EmployeeSection from "../../components/report/EmployeeSection";
import VisitSection from "../../components/report/VisitSection";
import DaySummary from "../../components/report/DaySummary";
import AISummary from "../../components/report/AISummary";

import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";

import { submitReport } from "../../services/reportService";
import { saveReportFollowUps } from "../../services/followUpService";
import FollowUpPanel from "../../components/followup/FollowUpPanel";

export default function ReportPage() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<ReportForm>({
    defaultValues: {
      employee: {
        employeeId: "",
        employeeName: "",
        managerEmail: "",
        date: "",
        city: "",
        totalVisits: 0,
      },

      visits: [
        {
          visitType: "",
          clientName: "",
          location: "",
          personMet: "",
          designation: "",
          clientPhoneNumber: "",
          discussionSummary: "",
          nextAction: "",
          followUpDate: "",
        },
      ],

      daySummary: {
        keyWin: "",
        challenges: "",
        otherRemarks: "",
      },

      aiSummary: "",
    },
  });

  const visits = useWatch({
    control,
    name: "visits",
  });

  const employeeId = useWatch({
    control,
    name: "employee.employeeId",
  });

  useEffect(() => {
    setValue("employee.totalVisits", visits.length);
  }, [visits, setValue]);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        if (!isDirty || submitting) return;

        event.preventDefault();

        event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    }, [isDirty, submitting]);

  const onSubmit = async (data: ReportForm) => {
    if (!data.aiSummary.trim()) {
      toast.error("Please generate the AI summary before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      await submitReport(data);

      try {
        await saveReportFollowUps(data);
      } catch (error) {
        console.error(
          "Failed to save follow-up reminders:",
          error
        );

        toast.error(
          "Report submitted, but follow-up reminders could not be saved."
        );
      }

      reset();
      navigate("/success", {
        replace: true,
        state: {
          managerEmail: data.employee.managerEmail,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit report.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <PageHeader />

      <div className="max-w-5xl mx-auto py-8 px-5">
        <FollowUpPanel
          employeeId={employeeId}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <fieldset
            disabled={submitting}
            className="space-y-8"
          >
            <EmployeeSection
              register={register}
              setValue={setValue}
            />

            <VisitSection
              control={control}
              register={register}
            />

            <DaySummary
              register={register}
            />

            <AISummary
              register={register}
              getValues={getValues}
              setValue={setValue}
              watch={watch}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                loading={submitting}
                disabled={submitting}
              >
                {submitting
                  ? "Submitting Report..."
                  : "Submit Report"}
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}