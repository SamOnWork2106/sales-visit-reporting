# from app.models.summary import SummaryRequest


# def build_summary_prompt(report: SummaryRequest) -> str:

#     visits = ""

#     for index, visit in enumerate(report.visits, start=1):
#         visits += f"""
# Visit {index}

# Visit Type: {visit.visitType}
# Client: {visit.clientName}
# Location: {visit.location}
# Person Met: {visit.personMet}
# Designation: {visit.designation}
# Decision Maker: {visit.decisionMaker}
# Discussion: {visit.discussionSummary}
# Next Action: {visit.nextAction}
# Follow Up: {visit.followUpDate}

# """

#     return f"""
# You are an experienced sales reporting assistant.

# Your task is to generate a professional end-of-day sales visit summary.

# Write in a business tone.

# Maximum 180 words.

# Do not use bullet points.

# Mention:

# Major meetings

# Business opportunities

# Customer responses

# Overall progress

# Next follow-up actions

# Employee

# Name: {report.employee.employeeName}

# City: {report.employee.city}

# Date: {report.employee.date}

# Visits

# {visits}

# Day Summary

# Key Win:
# {report.daySummary.keyWin}

# Challenges:
# {report.daySummary.challenges}

# Remarks:
# {report.daySummary.otherRemarks}
# """

from app.models.summary import SummaryRequest



def build_summary_prompt(report: SummaryRequest) -> str:

    visits = ""

    for index, visit in enumerate(report.visits, start=1):
        visits += f"""
Visit {index}
Visit Type: {visit.visitType}
Client: {visit.clientName}
Location: {visit.location}
Person Met: {visit.personMet}
Designation: {visit.designation}
Discussion: {visit.discussionSummary}
Next Action: {visit.nextAction}
Follow Up: {visit.followUpDate}

"""

    return f"""
You are an internal Sales Reporting Assistant.

Generate ONLY a professional end-of-day sales summary.

Rules:

- Maximum 150 words.
- Return plain text only.
- Do NOT use markdown.
- Do NOT use bullet points.
- Do NOT use headings.
- Do NOT greet anyone.
- Do NOT provide templates.
- Do NOT explain anything.
- Write as if this summary will be emailed to a manager.
- Mention customer interactions, key outcomes, opportunities, challenges and next actions.
- End naturally.

Employee Name:
{report.employee.employeeName}

City:
{report.employee.city}

Date:
{report.employee.date}

Customer Visits:

{visits}

Key Win:
{report.daySummary.keyWin}

Challenges:
{report.daySummary.challenges}

Remarks:
{report.daySummary.otherRemarks}
"""