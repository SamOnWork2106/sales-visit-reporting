from pathlib import Path
from pydantic import BaseModel


class EmailData(BaseModel):
    receiver_email: str
    subject: str
    html: str
    pdf_path: Path