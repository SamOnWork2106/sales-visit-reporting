from pathlib import Path
import tempfile

from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)

from reportlab.lib.styles import getSampleStyleSheet

from app.models.report import ReportRequest

def generate_pdf(report: ReportRequest) -> Path:

    temp = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    )

    pdf_path = Path(temp.name)

    styles = getSampleStyleSheet()

    doc = SimpleDocTemplate(str(pdf_path))

    story = []

    story.append(
        Paragraph("<b>Daily Sales Visit Report</b>", styles["Heading1"])
    )

    story.append(Spacer(1, 0.3 * inch))

    story.append(
        Paragraph(
            f"<b>Employee:</b> {report.employee.employeeName}",
            styles["BodyText"],
        )
    )

    story.append(
        Paragraph(
            f"<b>Employee ID:</b> {report.employee.employeeId}",
            styles["BodyText"],
        )
    )

    story.append(
        Paragraph(
            f"<b>Date:</b> {report.employee.date}",
            styles["BodyText"],
        )
    )

    story.append(Spacer(1, 0.2 * inch))

    story.append(
        Paragraph("<b>Customer Visits</b>", styles["Heading2"])
    )

    for i, visit in enumerate(report.visits, start=1):

        story.append(
            Paragraph(
                f"<b>{i}. {visit.clientName}</b>",
                styles["BodyText"],
            )
        )

        story.append(
            Paragraph(
                f"Person Met: {visit.personMet}",
                styles["BodyText"],
            )
        )

        story.append(
            Paragraph(
                f"Discussion: {visit.discussionSummary}",
                styles["BodyText"],
            )
        )

        story.append(
            Paragraph(
                f"Next Action: {visit.nextAction}",
                styles["BodyText"],
            )
        )

        story.append(Spacer(1, 0.15 * inch))

    story.append(
        Paragraph("<b>Day Summary</b>", styles["Heading2"])
    )

    story.append(
        Paragraph(report.daySummary.keyWin, styles["BodyText"])
    )

    story.append(
        Paragraph(report.daySummary.challenges, styles["BodyText"])
    )

    story.append(
        Paragraph(report.daySummary.otherRemarks, styles["BodyText"])
    )

    story.append(Spacer(1, 0.25 * inch))

    story.append(
        Paragraph("<b>AI Summary</b>", styles["Heading2"])
    )

    story.append(
        Paragraph(report.aiSummary, styles["BodyText"])
    )

    doc.build(story)

    return pdf_path