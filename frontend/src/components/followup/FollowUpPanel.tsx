import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Bell,
  CalendarDays,
  Check,
  Phone,
  User,
  X,
} from "lucide-react";

import type {
  FollowUpReminder,
} from "../../types/followUp";

import {
  cleanupOldFollowUps,
  dismissFollowUp,
  getFollowUpCategory,
  getPendingFollowUps,
  markFollowUpCompleted,
} from "../../services/followUpService";


interface Props {
  employeeId: string;
}


export default function FollowUpPanel({
  employeeId,
}: Props) {

  const [reminders, setReminders] =
    useState<FollowUpReminder[]>([]);

  const [open, setOpen] =
    useState(false);


  const loadReminders =
    useCallback(async () => {

      try {
        await cleanupOldFollowUps();

        const data =
          await getPendingFollowUps(
            employeeId
          );

        setReminders(data);

      } catch (error) {
        console.error(
          "Failed to load follow-ups:",
          error
        );
      }

    }, [employeeId]);


  useEffect(() => {
    if (!employeeId) {
      return;
    }

    void loadReminders();

  }, [employeeId, loadReminders]);


  const handleComplete = async (
    id: string
  ) => {
    await markFollowUpCompleted(id);
    await loadReminders();
  };


  const handleDismiss = async (
    id: string
  ) => {
    await dismissFollowUp(id);
    await loadReminders();
  };


  const activeCount =
    reminders.filter((reminder) => {
      const category =
        getFollowUpCategory(reminder);

      return (
        category === "today" ||
        category === "overdue"
      );
    }).length;


  return (
    <div className="mb-6">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          rounded-lg
          bg-white
          border border-slate-200
          px-4 py-3
          shadow-sm
          hover:bg-slate-50
        "
      >
        <Bell size={20} />

        <span className="font-medium">
          Follow-ups
        </span>

        {activeCount > 0 && (
          <span
            className="
              min-w-6 h-6
              flex items-center justify-center
              rounded-full
              bg-red-600
              text-white
              text-xs
              font-semibold
              px-2
            "
          >
            {activeCount}
          </span>
        )}

      </button>


      {open && (
        <div
          className="
            mt-3
            rounded-xl
            bg-white
            border border-slate-200
            shadow-sm
            p-5
          "
        >

          <div className="flex justify-between items-center mb-4">

            <div>
              <h2 className="text-lg font-semibold">
                Follow-up Reminders
              </h2>

              <p className="text-sm text-slate-500">
                Due, overdue and upcoming customer follow-ups
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-slate-500"
            >
              <X size={20} />
            </button>

          </div>


          {reminders.length === 0 ? (

            <p className="text-slate-500 text-sm">
              No pending follow-ups.
            </p>

          ) : (

            <div className="space-y-4">

              {reminders.map((reminder) => {

                const category =
                  getFollowUpCategory(
                    reminder
                  );

                return (
                  <div
                    key={reminder.id}
                    className="
                      border border-slate-200
                      rounded-lg
                      p-4
                    "
                  >

                    <div
                      className="
                        flex
                        justify-between
                        gap-3
                        mb-3
                      "
                    >

                      <div>
                        <h3 className="font-semibold">
                          {reminder.clientName}
                        </h3>

                        <span
                          className={
                            category === "overdue"
                              ? "text-red-600 text-sm font-medium"
                              : category === "today"
                              ? "text-amber-600 text-sm font-medium"
                              : "text-emerald-700 text-sm font-medium"
                          }
                        >
                          {category === "overdue"
                            ? "Overdue"
                            : category === "today"
                            ? "Due Today"
                            : "Upcoming"}
                        </span>
                      </div>

                      <div
                        className="
                          flex items-center
                          gap-1
                          text-sm
                          text-slate-500
                        "
                      >
                        <CalendarDays size={16} />

                        {reminder.followUpDate}
                      </div>

                    </div>


                    <div
                      className="
                        space-y-2
                        text-sm
                        text-slate-600
                      "
                    >

                      <div className="flex items-center gap-2">
                        <User size={16} />
                        {reminder.personMet}
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        {reminder.clientPhoneNumber}
                      </div>

                      <p>
                        <strong>Next Action:</strong>{" "}
                        {reminder.nextAction}
                      </p>

                    </div>


                    <div
                      className="
                        flex flex-wrap
                        gap-3
                        mt-4
                      "
                    >

                      <button
                        type="button"
                        onClick={() =>
                          handleComplete(
                            reminder.id
                          )
                        }
                        className="
                          flex items-center
                          gap-2
                          rounded-lg
                          bg-teal-700
                          text-white
                          px-3 py-2
                          text-sm
                        "
                      >
                        <Check size={16} />

                        Mark Completed
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDismiss(
                            reminder.id
                          )
                        }
                        className="
                          rounded-lg
                          border
                          border-slate-300
                          px-3 py-2
                          text-sm
                        "
                      >
                        Dismiss
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>
      )}

    </div>
  );
}