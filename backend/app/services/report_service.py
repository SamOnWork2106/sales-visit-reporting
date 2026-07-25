from pathlib import Path

from fastapi import HTTPException

from app.models.report import ReportRequest, SubmitResponse
from app.services.html_template import generate_html
from app.services.pdf_service import generate_pdf
from app.services.email_service import send_email
from app.models.email import EmailData

import logging

logger = logging.getLogger(__name__)


def process_report(report: ReportRequest) -> SubmitResponse:
    pdf_path: Path | None = None

    try:
        # Generate email HTML
        html = generate_html(report)

        # Generate PDF
        pdf_path = generate_pdf(report)

        # Send email
        receiver_email = report.employee.managerEmail.strip()
        if not receiver_email:
            raise HTTPException(
                status_code=400,
                detail="Manager email is required."
            )
        email_data = EmailData(
        receiver_email=receiver_email,
            subject=(
                f"Daily Sales Visit Report | "
                f"{report.employee.employeeName} | "
                f"{report.employee.date}"
            ),
            html=html,
            pdf_path=pdf_path,
        )

        send_email(email_data)

        return SubmitResponse(
            success=True,
            message="Report submitted successfully."
        )

    except Exception:
        logger.exception(
            "Failed to submit report for employee %s",
            report.employee.employeeId,
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to submit report."
        )

    finally:
        if pdf_path and pdf_path.exists():
            pdf_path.unlink(missing_ok=True)