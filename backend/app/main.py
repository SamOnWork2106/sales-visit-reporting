from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.login import router as login_router
from app.api.summary import router as summary_router
from app.api.report import router as report_router

app = FastAPI(
    title="Sales Visit Reporting API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",                 # Local development
        "https://sales-visit-repo.vercel.app/",  # Production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login_router)
app.include_router(summary_router)
app.include_router(report_router)


@app.get("/")
def root():
    return {
        "message": "Sales Visit Reporting API Running"
    }

