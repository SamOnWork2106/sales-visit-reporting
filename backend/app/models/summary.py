from pydantic import BaseModel
from .report import EmployeeInfo, Visit, DaySummary
from typing import List


class SummaryRequest(BaseModel):
    employee: EmployeeInfo
    visits: List[Visit]
    daySummary: DaySummary


class SummaryResponse(BaseModel):
    success: bool
    summary: str