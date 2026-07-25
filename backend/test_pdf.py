from test_html import report
from app.services.pdf_service import generate_pdf

pdf = generate_pdf(report)

print(pdf)