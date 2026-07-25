from app.services.gemini_service import generate_summary

response = generate_summary(
    "Write a professional summary for a sales executive who visited three customers today."
)

print(response)