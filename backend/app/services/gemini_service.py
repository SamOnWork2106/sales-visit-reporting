from google import genai

from app.config.settings import settings

client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


def generate_summary(prompt: str) -> str:
    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
        )
        return response.text.strip()
    except Exception as e:
        raise RuntimeError(f"Gemini summary generation failed: {e}")