from app.models.report import ReportRequest
from datetime import datetime


def generate_html(report: ReportRequest) -> str:
    visit_rows = ""
    submitted_at = datetime.now().strftime("%d %b %Y %I:%M %p")
    
    for index, visit in enumerate(report.visits, start=1):
        visit_rows += f"""
        <tr>
            <td>{index}</td>
            <td>{visit.clientName}</td>
            <td>{visit.personMet}</td>
            <td>{visit.designation}</td>
            <td>{visit.clientPhoneNumber}</td>
            <td>{visit.discussionSummary}</td>
            <td>{visit.nextAction}</td>
        </tr>
        """
    return f"""
<!DOCTYPE html>
<html>
<head>
<style>
body {{
    font-family: Arial, sans-serif;
    padding:20px;
}}

table {{
    border-collapse: collapse;
    width:100%;
}}

th,td {{
    border:1px solid #ccc;
    padding:8px;
}}

th {{
    background:#0f766e;
    color:white;
}}

.section {{
    margin-top:25px;
}}
</style>
</head>

<body>

<div style="
    background:#0f766e;
    color:white;
    padding:20px;
    text-align:center;
    border-radius:8px;
">

<h2>INTELLIGREEN TECHNOLOGIES</h2>

<h3>Daily Sales Visit Report</h3>

</div>

<h3>Employee Information</h3>



<p><b>Employee:</b> {report.employee.employeeName}</p>
<p><b>Employee ID:</b> {report.employee.employeeId}</p>
<p><b>Date:</b> {report.employee.date}</p>
<p><strong>Submitted At:</strong> {submitted_at}</p>
<p><b>City:</b> {report.employee.city}</p>

<div class="section">

<h3>Customer Visits</h3>

<table>

<tr>
<th>#</th>
<th>Client</th>
<th>Person Met</th>
<th>Designation</th>
<th>Phone Number</th>
<th>Discussion</th>
<th>Next Action</th>
</tr>

{visit_rows}

</table>

</div>

<div class="section">

<h3>Day Summary</h3>

<p><b>Key Win:</b> {report.daySummary.keyWin}</p>

<p><b>Challenges:</b> {report.daySummary.challenges}</p>

<p><b>Remarks:</b> {report.daySummary.otherRemarks}</p>

</div>

<div class="section">

<h3>AI Summary</h3>

<p>{report.aiSummary}</p>

</div>

</body>

</html>
"""