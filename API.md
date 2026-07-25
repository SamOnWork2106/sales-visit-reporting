# Sales Visit Reporting Platform API Documentation

# Overview

This document describes all backend REST APIs used by the Sales Visit Reporting Platform.

Base URL (Development)

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

All requests and responses use JSON.

---

# Authentication

## Login

Authenticate an employee using Employee ID and Password.

### Endpoint

```
POST /auth/login
```

### Request Body

```json
{
  "employeeId": "EMP001",
  "password": "password123"
}
```

---

### Success Response

Status Code

```
200 OK
```

```json
{
  "success": true,
  "message": "Login Successful",
  "employee": {
    "employeeId": "EMP001",
    "name": "Rahul Sharma",
    "managerEmail": "manager@company.com",
    "region": "North"
  }
}
```

---

### Error Response

Status Code

```
401 Unauthorized
```

```json
{
  "detail": "Invalid employee ID or password."
}
```

---

# Generate AI Summary

Generates a professional sales summary using Google Gemini.

### Endpoint

```
POST /report/generate-summary
```

---

### Request Body

```json
{
  "employee": {
    "employeeId": "EMP001",
    "employeeName": "Rahul Sharma",
    "managerEmail": "manager@company.com",
    "date": "2026-07-26",
    "city": "Delhi",
    "totalVisits": 2
  },
  "visits": [
    {
      "visitType": "Existing Customer",
      "clientName": "ABC Pvt Ltd",
      "location": "Delhi",
      "personMet": "Rajesh Gupta",
      "designation": "Purchase Manager",
      "decisionMaker": "Yes",
      "discussionSummary": "Discussed pricing and renewal.",
      "nextAction": "Send quotation",
      "followUpDate": "2026-07-30"
    }
  ],
  "daySummary": {
    "keyWin": "Positive customer response.",
    "challenges": "Budget approval pending.",
    "otherRemarks": "Follow-up required."
  }
}
```

---

### Success Response

Status Code

```
200 OK
```

```json
{
  "summary": "Rahul Sharma completed customer visits focused on pricing discussions, relationship management, and follow-up planning. Overall customer engagement was positive with multiple sales opportunities progressing toward closure."
}
```

---

### Error Response

Status Code

```
500 Internal Server Error
```

```json
{
  "detail": "Unable to generate AI summary."
}
```

---

# Submit Report

Submits the completed report.

The backend performs the following actions:

1. Generate HTML email
2. Generate PDF report
3. Send email to manager
4. Delete temporary PDF
5. Return success response

---

### Endpoint

```
POST /report/submit-report
```

---

### Request Body

```json
{
  "employee": {
    "employeeId": "EMP001",
    "employeeName": "Rahul Sharma",
    "managerEmail": "manager@company.com",
    "date": "2026-07-26",
    "city": "Delhi",
    "totalVisits": 2
  },
  "visits": [
    {
      "visitType": "Existing Customer",
      "clientName": "ABC Pvt Ltd",
      "location": "Delhi",
      "personMet": "Rajesh Gupta",
      "designation": "Purchase Manager",
      "decisionMaker": "Yes",
      "discussionSummary": "Discussed pricing and renewal.",
      "nextAction": "Send quotation",
      "followUpDate": "2026-07-30"
    }
  ],
  "daySummary": {
    "keyWin": "Positive customer response.",
    "challenges": "Budget approval pending.",
    "otherRemarks": "Need follow-up."
  },
  "aiSummary": "Rahul Sharma completed customer visits focused on pricing discussions and relationship building."
}
```

---

### Success Response

Status Code

```
200 OK
```

```json
{
  "success": true,
  "message": "Report submitted successfully."
}
```

---

### Error Response

Status Code

```
500 Internal Server Error
```

```json
{
  "detail": "Unable to submit report."
}
```

---

# Data Models

## EmployeeInfo

| Field | Type | Required |
|-------|------|----------|
| employeeId | string | Yes |
| employeeName | string | Yes |
| managerEmail | string | Yes |
| date | date | Yes |
| city | string | Yes |
| totalVisits | integer | Yes |

---

## Visit

| Field | Type | Required |
|-------|------|----------|
| visitType | string | Yes |
| clientName | string | Yes |
| location | string | Yes |
| personMet | string | Yes |
| designation | string | Yes |
| decisionMaker | string | Yes |
| discussionSummary | string | Yes |
| nextAction | string | Yes |
| followUpDate | date | No |

---

## DaySummary

| Field | Type | Required |
|-------|------|----------|
| keyWin | string | Yes |
| challenges | string | Yes |
| otherRemarks | string | Yes |

---

## ReportRequest

| Field | Type |
|-------|------|
| employee | EmployeeInfo |
| visits | List\<Visit> |
| daySummary | DaySummary |
| aiSummary | string |

---

## SubmitResponse

| Field | Type |
|-------|------|
| success | boolean |
| message | string |

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Request completed successfully |
| 400 | Invalid request data |
| 401 | Authentication failed |
| 422 | Validation error |
| 500 | Internal server error |

---

# Validation Rules

## Login

- Employee ID must exist.
- Password must match.

---

## Generate Summary

- At least one customer visit is required.
- Employee information must be present.
- Day Summary should contain meaningful content.

---

## Submit Report

The report must contain:

- Employee Information
- At least one customer visit
- Day Summary
- AI Summary

The backend generates the email and PDF only after successful validation.

---

# Error Handling

The API returns meaningful error messages for:

- Invalid credentials
- Missing required fields
- Gemini API failures
- PDF generation failures
- SMTP authentication failures
- Email delivery failures

---

# Testing

The API can be tested using:

- FastAPI Swagger UI
- Postman
- Thunder Client
- Frontend React Application

Swagger URL

```
http://localhost:8000/docs
```

---

# Future API Enhancements

Potential future endpoints include:

```
GET    /reports

GET    /reports/{id}

DELETE /reports/{id}

PUT    /reports/{id}

GET    /employees

POST   /employees

PUT    /employees/{id}

DELETE /employees/{id}
```

These endpoints are intentionally omitted from the current MVP because the application does not use persistent storage.

---

# Version

Current API Version

```
v1.0
```
