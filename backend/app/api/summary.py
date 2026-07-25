from fastapi import APIRouter, HTTPException

from app.models.summary import (
    SummaryRequest,
    SummaryResponse,
)

from app.services.gemini_service import generate_summary

from app.utils.prompt_builder import build_summary_prompt

router = APIRouter(
    prefix="/api/report",
    tags=["Report"]
)


@router.post(
    "/generate-summary",
    response_model=SummaryResponse,
)
def generate_ai_summary(request: SummaryRequest):

    try:
        prompt = build_summary_prompt(request)

        summary = generate_summary(prompt)

        return SummaryResponse(
            success=True,
            summary=summary,
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )