# Sales Visit Reporting Platform

A mobile-first Progressive Web Application (PWA) that enables sales executives to submit their daily visit reports. The application generates a professional AI-powered summary, creates a PDF report, and emails the complete report to the assigned manager.

The project is designed as a lightweight internal business application for organizations with approximately 20–30 sales executives.

---

# Features

- Employee authentication
- Mobile-first responsive interface
- Progressive Web App (PWA)
- Dynamic customer visit management
- AI-generated professional sales summary using Google Gemini
- Professional HTML email generation
- Automatic PDF generation
- Gmail SMTP integration
- Editable manager email
- No database required
- Zero infrastructure cost
- Clean and maintainable architecture

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS v4
- React Hook Form
- React Router
- Axios
- React Hot Toast
- Lucide React
- Vite PWA Plugin

---

## Backend

- FastAPI
- Python
- Pydantic
- ReportLab
- Gmail SMTP
- Google Gemini API

---

# Project Structure

```text
sales-visit-reporting/

├── frontend/
│
│   ├── src/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│
│   ├── app/
│   │
│   ├── requirements.txt
│   ├── test_gemini.py
│   ├── test_html.py
│   └── test_pdf.py
│
├── README.md
├── architecture.md
├── API.md
└── .gitignore
```

---

# Application Workflow

```text
Login

↓

Fill Employee Information

↓

Add Customer Visits

↓

Generate AI Summary

↓

Review / Edit Summary

↓

Submit Report

↓

Backend

↓

Generate HTML Email

↓

Generate PDF

↓

Send Email

↓

Success Screen
```

---

# Backend Architecture

```text
Frontend

↓

FastAPI

↓

Authentication

↓

Generate AI Summary

↓

Generate HTML

↓

Generate PDF

↓

Send Email

↓

Return Success
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>

cd sales-visit-reporting
```

---

# Backend Setup

Create virtual environment

```bash
python -m venv .venv
```

Activate

### Windows

```bash
.venv\Scripts\activate
```

### Linux / macOS

```bash
source .venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
uvicorn app.main:app --reload
```

Backend

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

# Frontend Setup

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

---

# Environment Variables

Create

```text
backend/.env
```

Example

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-3.6-flash

SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-16-character-app-password
```

---

# Gmail SMTP Setup

1. Enable Two-Factor Authentication for your Gmail account.
2. Open Google Account → Security.
3. Generate a 16-character App Password.
4. Copy the App Password into:

```env
SMTP_PASSWORD=
```

Do **not** use your normal Gmail password.

---

# Google Gemini Setup

1. Create an API key from Google AI Studio.
2. Add the key to:

```env
GEMINI_API_KEY=
```

The application uses the configured Gemini model to generate professional sales summaries.

---

# API Endpoints

Authentication

```
POST /auth/login
```

Generate AI Summary

```
POST /report/generate-summary
```

Submit Report

```
POST /report/submit-report
```

Detailed request and response examples are available in **API.md**.

---

# Form Sections

## Employee Information

- Employee ID
- Employee Name
- Manager Email
- Date
- City

---

## Customer Visit

Each visit contains:

- Visit Type
- Client Name
- Location
- Person Met
- Designation
- Decision Maker
- Discussion Summary
- Next Action
- Follow-up Date

Unlimited visits can be added.

---

## Day Summary

- Key Win
- Challenges
- Other Remarks

---

## AI Summary

Generated using Google Gemini.

Users can review and edit the generated summary before submission.

---

# Report Submission

After submission, the backend:

1. Receives report data.
2. Generates an HTML email.
3. Generates a PDF report.
4. Sends the email to the manager.
5. Deletes the temporary PDF.
6. Returns a success response.

No report data is permanently stored.

---

# Security

- Employee authentication
- Environment-based secrets
- Gmail App Password authentication
- No hard-coded credentials
- Temporary PDF cleanup after submission

---

# Future Improvements

- Database integration
- Dashboard for managers
- Report history
- Analytics
- Push notifications
- Offline PWA support
- Multi-company support
- Role-based access control
- Email templates with company branding
- Cloud file storage

---

# Screenshots

Add screenshots here after deployment.

Example

```
screenshots/

login.png

report-form.png

generate-summary.png

success-page.png

email-preview.png
```

---

# Deployment

Frontend

- Vercel

Backend

- Railway
- Render

---

# Documentation

Additional project documentation:

- architecture.md
- API.md

---

# License

This project was developed as an internal business application for sales visit reporting.