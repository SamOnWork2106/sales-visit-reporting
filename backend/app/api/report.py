from fastapi import APIRouter

from app.models.report import ReportRequest, SubmitResponse
from app.services.report_service import process_report

router = APIRouter(
    prefix="/api/report",
    tags=["Report"]
)

@router.post(
    "/submit-report",
    response_model=SubmitResponse,
)
def submit_report(report: ReportRequest):
    return process_report(report)