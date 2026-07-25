export interface EmployeeInfo {
  employeeId: string;
  employeeName: string;
  managerEmail: string;
  date: string;
  city: string;
  totalVisits: number;
}

export interface Visit {
  visitType: string;
  clientName: string;
  location: string;
  personMet: string;
  designation: string;
  decisionMaker: string;
  discussionSummary: string;
  nextAction: string;
  followUpDate: string;
}

export interface DaySummary {
  keyWin: string;
  challenges: string;
  otherRemarks: string;
}

export interface ReportForm {
  employee: EmployeeInfo;
  visits: Visit[];
  daySummary: DaySummary;
  aiSummary: string;
}