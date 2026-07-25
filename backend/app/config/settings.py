from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    GEMINI_MODEL = os.getenv("GEMINI_MODEL", "models/gemini-3.5-flash")

    SMTP_EMAIL = os.getenv("SMTP_EMAIL")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

    SECRET_KEY = os.getenv("SECRET_KEY")


settings = Settings()