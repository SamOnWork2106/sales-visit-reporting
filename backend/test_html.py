from pathlib import Path
from datetime import date

from app.models.report import EmployeeInfo, Visit, DaySummary, ReportRequest
from app.services.html_template import generate_html

report = ReportRequest(
    employee=EmployeeInfo(
        employeeId="EMP001",
        employeeName="Rahul Sharma",
        managerEmail="manager@example.com",
        date=date.today(),
        city="Delhi",
        totalVisits=1,
    ),
    visits=[
        Visit(
            visitType="Existing Customer",
            clientName="ABC Pvt Ltd",
            location="Delhi",
            personMet="Mr. Sharma",
            designation="Manager",
            decisionMaker="Yes",
            discussionSummary="Discussed pricing.",
            nextAction="Send quotation",
            followUpDate=date.today(),
        )
    ],
    daySummary=DaySummary(
        keyWin="Positive response",
        challenges="Budget approval pending",
        otherRemarks="Need follow-up"
    ),
    aiSummary="Professional AI summary."
)

html = generate_html(report)

Path("preview.html").write_text(html, encoding="utf-8")

print("preview.html created")