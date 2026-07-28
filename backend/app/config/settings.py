from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    GEMINI_MODEL = os.getenv(
        "GEMINI_MODEL",
        "models/gemini-3.6-flash"
    )

    GEMINI_FALLBACK_MODEL = os.getenv(
        "GEMINI_FALLBACK_MODEL",
        "models/gemini-3.5-flash"
    )

    SMTP_EMAIL = os.getenv("SMTP_EMAIL")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

    RESEND_API_KEY = os.getenv("RESEND_API_KEY")

    SECRET_KEY = os.getenv("SECRET_KEY")


settings = Settings()