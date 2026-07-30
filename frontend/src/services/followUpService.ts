import { getFollowUpDB } from "../db/followUpDB";

import type {
  FollowUpReminder,
} from "../types/followUp";

import type {
  ReportForm,
  Visit,
} from "../types/report";


function createReminder(
  employeeId: string,
  visit: Visit
): FollowUpReminder {
  return {
    id: crypto.randomUUID(),

    employeeId,

    clientName: visit.clientName,
    personMet: visit.personMet,
    clientPhoneNumber: visit.clientPhoneNumber,

    nextAction: visit.nextAction,
    followUpDate: visit.followUpDate,

    status: "pending",

    createdAt: new Date().toISOString(),
  };
}


export async function saveReportFollowUps(
  report: ReportForm
): Promise<void> {
  const visitsWithFollowUp = report.visits.filter(
    (visit) => Boolean(visit.followUpDate)
  );

  if (visitsWithFollowUp.length === 0) {
    return;
  }

  const db = await getFollowUpDB();

  const transaction = db.transaction(
    "reminders",
    "readwrite"
  );

  for (const visit of visitsWithFollowUp) {
    const reminder = createReminder(
      report.employee.employeeId,
      visit
    );

    await transaction.store.put(reminder);
  }

  await transaction.done;
}


export async function getEmployeeFollowUps(
  employeeId: string
): Promise<FollowUpReminder[]> {
  const db = await getFollowUpDB();

  return db.getAllFromIndex(
    "reminders",
    "by-employee",
    employeeId
  );
}



// Due, Overdue, Upcoming + Cleanup

export type FollowUpCategory =
  | "overdue"
  | "today"
  | "upcoming";


function getLocalDateString(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


export function getFollowUpCategory(
  reminder: FollowUpReminder
): FollowUpCategory {
  const today = getLocalDateString();

  if (reminder.followUpDate < today) {
    return "overdue";
  }

  if (reminder.followUpDate === today) {
    return "today";
  }

  return "upcoming";
}


export async function getPendingFollowUps(
  employeeId: string
): Promise<FollowUpReminder[]> {
  const reminders =
    await getEmployeeFollowUps(employeeId);

  return reminders
    .filter(
      (reminder) => reminder.status === "pending"
    )
    .sort((a, b) =>
      a.followUpDate.localeCompare(b.followUpDate)
    );
}


export async function markFollowUpCompleted(
  id: string
): Promise<void> {
  const db = await getFollowUpDB();

  const reminder = await db.get(
    "reminders",
    id
  );

  if (!reminder) {
    return;
  }

  reminder.status = "completed";
  reminder.completedAt = new Date().toISOString();

  await db.put(
    "reminders",
    reminder
  );
}


export async function dismissFollowUp(
  id: string
): Promise<void> {
  const db = await getFollowUpDB();

  const reminder = await db.get(
    "reminders",
    id
  );

  if (!reminder) {
    return;
  }

  reminder.status = "dismissed";
  reminder.dismissedAt = new Date().toISOString();

  await db.put(
    "reminders",
    reminder
  );
}



// 90-day cleanup
const COMPLETED_RETENTION_DAYS = 90;


function getDaysAgoDateString(
  days: number
): string {
  const date = new Date();

  date.setDate(
    date.getDate() - days
  );

  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


export async function cleanupOldFollowUps():
  Promise<void> {

  const db = await getFollowUpDB();

  const reminders =
    await db.getAll("reminders");

  const cutoff =
    getDaysAgoDateString(
      COMPLETED_RETENTION_DAYS
    );

  const transaction = db.transaction(
    "reminders",
    "readwrite"
  );

  for (const reminder of reminders) {

    if (
      reminder.status === "completed" &&
      reminder.completedAt
    ) {
      const completedDate =
        reminder.completedAt.slice(0, 10);

      if (completedDate < cutoff) {
        await transaction.store.delete(
          reminder.id
        );
      }
    }

    if (
      reminder.status === "dismissed" &&
      reminder.dismissedAt
    ) {
      const dismissedDate =
        reminder.dismissedAt.slice(0, 10);

      if (dismissedDate < cutoff) {
        await transaction.store.delete(
          reminder.id
        );
      }
    }
  }

  await transaction.done;
}