from app.config.settings import settings
from app.models.email import EmailData

import resend


def send_email(email_data: EmailData) -> None:
    """
    Sends the sales report email with a PDF attachment using Resend.
    """

    resend.api_key = settings.RESEND_API_KEY

    with open(email_data.pdf_path, "rb") as pdf:
        params = {
            "from": "Sales Visit Reporting <onboarding@resend.dev>",
            "to": [email_data.receiver_email],
            "subject": email_data.subject,
            "html": email_data.html,
            "attachments": [
                {
                    "filename": "Sales_Report.pdf",
                    "content": pdf.read(),
                }
            ],
        }

        resend.Emails.send(params)




# import smtplib

# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from email.mime.application import MIMEApplication

# from app.config.settings import settings
# from app.models.email import EmailData


# def send_email(email_data: EmailData) -> None:
#     """
#     Sends the sales report email with a PDF attachment.
#     """

#     # Validate SMTP configuration
#     if not settings.SMTP_EMAIL or not settings.SMTP_PASSWORD:
#         raise ValueError("SMTP credentials are not configured.")

#     # Create email message
#     message = MIMEMultipart()
#     message["Subject"] = email_data.subject
#     message["From"] = settings.SMTP_EMAIL
#     message["To"] = email_data.receiver_email

#     # Attach HTML body
#     message.attach(
#         MIMEText(
#             email_data.html,
#             "html"
#         )
#     )

#     # Attach PDF
#     with email_data.pdf_path.open("rb") as file:
#         attachment = MIMEApplication(
#             file.read(),
#             Name="Sales_Report.pdf"
#         )

#     attachment["Content-Disposition"] = (
#         'attachment; filename="Sales_Report.pdf"'
#     )

#     message.attach(attachment)

#     # Connect to Gmail SMTP Server
#     with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
#         smtp.ehlo()
#         smtp.starttls()
#         smtp.ehlo()

#         smtp.login(
#             settings.SMTP_EMAIL,
#             settings.SMTP_PASSWORD
#         )

#         smtp.send_message(message)