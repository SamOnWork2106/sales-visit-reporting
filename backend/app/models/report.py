from pydantic import BaseModel
from typing import List
from datetime import date
from pydantic import EmailStr

class Visit(BaseModel):
    visitType: str
    clientName: str
    location: str
    personMet: str
    designation: str
    clientPhoneNumber: str
    discussionSummary: str
    nextAction: str
    followUpDate: date | None = None


class DaySummary(BaseModel):
    keyWin: str
    challenges: str
    otherRemarks: str


class EmployeeInfo(BaseModel):
    employeeId: str
    employeeName: str
    managerEmail: EmailStr
    date: date
    city: str
    totalVisits: int


class ReportRequest(BaseModel):
    employee: EmployeeInfo
    visits: List[Visit]
    daySummary: DaySummary
    aiSummary: str

class SubmitResponse(BaseModel):
    success: bool
    message: str