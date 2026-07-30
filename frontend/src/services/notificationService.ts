import type {
  FollowUpReminder,
} from "../types/followUp";

import {
  getFollowUpCategory,
  markFollowUpNotified,
} from "./followUpService";


export function isNotificationSupported(): boolean {
  return "Notification" in window;
}


export function getNotificationPermission():
  NotificationPermission | "unsupported" {

  if (!isNotificationSupported()) {
    return "unsupported";
  }

  return Notification.permission;
}


export async function requestNotificationPermission():
  Promise<NotificationPermission | "unsupported"> {

  if (!isNotificationSupported()) {
    return "unsupported";
  }

  return Notification.requestPermission();
}


function getTodayString(): string {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


export async function notifyDueFollowUps(
  reminders: FollowUpReminder[]
): Promise<void> {

  if (!isNotificationSupported()) {
    return;
  }

  if (Notification.permission !== "granted") {
    return;
  }

  const today = getTodayString();


  for (const reminder of reminders) {

    const category =
      getFollowUpCategory(reminder);


    if (
      category !== "today" &&
      category !== "overdue"
    ) {
      continue;
    }


    if (
      reminder.lastNotifiedDate === today
    ) {
      continue;
    }


    const title =
      category === "today"
        ? "Follow-up Due Today"
        : "Overdue Follow-up";


    const body =
      `${reminder.clientName} — ${reminder.nextAction}`;


    try {

      new Notification(title, {
        body,
        icon: "/icon-192.png",
        tag: `followup-${reminder.id}`,
      });


      await markFollowUpNotified(
        reminder.id,
        today
      );

    } catch (error) {

      console.error(
        "Failed to show follow-up notification:",
        error
      );

    }
  }
}