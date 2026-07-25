# Sales Visit Reporting Platform Architecture

# Overview

The Sales Visit Reporting Platform is a lightweight internal Progressive Web Application (PWA) designed for sales executives to submit daily customer visit reports.

The application follows a simple layered architecture with a React frontend and a FastAPI backend. It intentionally avoids a database to minimize infrastructure costs and operational complexity.

The primary goal is to collect sales visit information, generate an AI-powered professional summary, and email the complete report to the assigned manager.

---

# High-Level Architecture

```text
                   +----------------------+
                   |      Sales User      |
                   +----------+-----------+
                              |
                              |
                              ▼
                 Progressive Web Application
                 (React + TypeScript + Vite)
                              |
                 HTTPS REST API Requests
                              |
                              ▼
                  FastAPI Backend (Python)
                              |
      +-----------+-----------+-----------+
      |           |           |           |
      ▼           ▼           ▼           ▼
 Authentication  Gemini     PDF       Gmail SMTP
                Summary   Generation   Email Service
                              |
                              ▼
                    Manager Receives Report
```

---

# Design Principles

The project was designed with the following priorities:

- Fast development
- Zero infrastructure cost
- Mobile-first user experience
- Maintainable codebase
- Clean separation of concerns
- Easy future scalability

---

# System Components

## Frontend

Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- React Router

Responsibilities

- User authentication
- Dynamic report form
- AI summary generation
- Form validation
- Report submission
- Responsive UI
- PWA installation

---

## Backend

Technology Stack

- FastAPI
- Python
- Pydantic

Responsibilities

- Authentication
- AI summary generation
- HTML email generation
- PDF generation
- Email delivery
- Request validation

---

# Folder Structure

## Frontend

```text
frontend/

src/

components/
common/
layout/
report/

pages/
Login/
Report/
Success/

services/

context/

routes/

types/
```

---

## Backend

```text
backend/

app/

api/

services/

models/

config/

main.py
```

---

# Backend Layered Architecture

```text
API Layer

↓

Business Logic Layer

↓

Infrastructure Layer
```

---

## API Layer

Location

```text
app/api/
```

Responsibilities

- Receive HTTP requests
- Validate request models
- Call service layer
- Return HTTP responses

Example

```text
POST /auth/login

POST /report/generate-summary

POST /report/submit-report
```

---

## Service Layer

Location

```text
app/services/
```

Responsibilities

Contains all business logic.

Current services

- auth_service.py
- gemini_service.py
- report_service.py
- email_service.py
- pdf_service.py
- html_template.py

---

## Models

Location

```text
app/models/
```

Responsibilities

Defines request and response schemas.

Example

```text
ReportRequest

EmployeeInfo

Visit

DaySummary

SubmitResponse
```

---

# Request Lifecycle

## Login

```text
User

↓

POST /auth/login

↓

Validate Employee

↓

Return Employee Details

↓

Frontend Stores User
```

---

## Generate AI Summary

```text
User

↓

Generate Summary

↓

POST /report/generate-summary

↓

Gemini Service

↓

Professional Summary

↓

Frontend Displays Summary
```

---

## Submit Report

```text
User

↓

POST /report/submit-report

↓

Generate HTML

↓

Generate PDF

↓

Send Email

↓

Delete Temporary PDF

↓

Return Success
```

---

# Authentication

Authentication uses a configuration file rather than a database.

Employee information is stored in

```text
app/config/employees.json
```

Each employee contains

- Employee ID
- Password
- Employee Name
- Manager Email
- Region

Advantages

- Zero infrastructure cost
- Easy maintenance
- Simple deployment

Future versions can replace this with a database or directory service.

---

# Data Flow

```text
Frontend Form

↓

React Hook Form

↓

Axios

↓

FastAPI

↓

Pydantic Validation

↓

Business Logic

↓

HTML

↓

PDF

↓

SMTP

↓

Manager Email
```

---

# AI Summary Flow

```text
Form Data

↓

Generate Prompt

↓

Google Gemini

↓

Professional Summary

↓

Editable by User

↓

Final Submission
```

---

# Email Generation

The backend generates an HTML email containing

- Employee Information
- Customer Visits
- Day Summary
- AI Summary
- Submission Timestamp

The email is sent using Gmail SMTP with a PDF attachment.

---

# PDF Generation

PDF generation uses ReportLab.

The generated report contains

- Employee Details
- Customer Visits
- Day Summary
- AI Summary

The PDF exists only temporarily.

After the email is sent

```text
Temporary PDF

↓

Delete File
```

---

# Error Handling

Errors are handled at the service layer.

Examples

- Invalid login
- Gemini API failure
- SMTP authentication failure
- Email delivery failure
- PDF generation failure

Meaningful HTTP responses are returned to the frontend.

---

# Security

The application stores secrets in environment variables.

Examples

```text
GEMINI_API_KEY

SMTP_EMAIL

SMTP_PASSWORD
```

Passwords and API keys are never hardcoded.

---

# Scalability

Current Design

- 20–30 users
- No database
- Single backend instance

Future Enhancements

- PostgreSQL
- User management
- Report history
- Analytics dashboard
- Cloud storage
- JWT authentication
- Role-based access control

---

# Deployment

Frontend

- Vercel

Backend

- Railway
- Render

The architecture remains unchanged regardless of deployment platform.

---

# Design Decisions

## Why No Database?

The application only needs to send reports via email.

Managers' inboxes serve as the permanent record.

This reduces

- Cost
- Maintenance
- Complexity

---

## Why FastAPI?

- Fast development
- Automatic API documentation
- Pydantic validation
- Excellent performance

---

## Why React?

- Component-based architecture
- Excellent form handling
- Strong TypeScript support
- PWA compatibility

---

## Why Google Gemini?

- High-quality summarization
- Simple API integration
- Fast response times
- Editable AI output

---

# Conclusion

The architecture focuses on simplicity, maintainability, and low operational cost while delivering a complete end-to-end workflow for sales visit reporting. The clear separation between presentation, business logic, and infrastructure makes the project easy to extend with additional features such as databases, dashboards, analytics, and role-based access control in future versions.