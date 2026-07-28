from google import genai

from app.config.settings import settings


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


def _generate_with_model(prompt: str, model: str) -> str:
    response = client.models.generate_content(
        model=model,
        contents=prompt,
    )

    if not response.text:
        raise RuntimeError(
            f"{model} returned an empty response."
        )

    return response.text.strip()


def generate_summary(prompt: str) -> str:
    try:
        # Try primary model
        return _generate_with_model(
            prompt,
            settings.GEMINI_MODEL,
        )

    except Exception as primary_error:
        print(
            f"Primary Gemini model failed "
            f"({settings.GEMINI_MODEL}): {primary_error}"
        )

        try:
            # Try fallback model
            return _generate_with_model(
                prompt,
                settings.GEMINI_FALLBACK_MODEL,
            )

        except Exception as fallback_error:
            print(
                f"Fallback Gemini model failed "
                f"({settings.GEMINI_FALLBACK_MODEL}): "
                f"{fallback_error}"
            )

            raise RuntimeError(
                "AI summary generation is temporarily unavailable."
            ) from fallback_error