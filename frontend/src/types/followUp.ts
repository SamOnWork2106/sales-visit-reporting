export type FollowUpStatus =
  | "pending"
  | "completed"
  | "dismissed";

export interface FollowUpReminder {
  id: string;

  employeeId: string;

  clientName: string;
  personMet: string;
  clientPhoneNumber: string;

  nextAction: string;
  followUpDate: string;

  status: FollowUpStatus;

  createdAt: string;

  completedAt?: string;
  dismissedAt?: string;

  lastNotifiedDate?: string;
}