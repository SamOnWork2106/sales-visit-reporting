from fastapi import APIRouter

from app.models.login import (
    LoginRequest,
    LoginResponse,
    EmployeeResponse,
)

from app.services.auth_service import authenticate

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest):

    employee = authenticate(
        request.employeeId,
        request.password,
    )

    if employee is None:
        return LoginResponse(
            success=False,
            message="Invalid Employee ID or Password",
        )

    return LoginResponse(
        success=True,
        message="Login Successful",
        employee=EmployeeResponse(
            employeeId=employee["employeeId"],
            name=employee["name"],
            managerEmail=employee["managerEmail"],
            region=employee.get("region"),
        ),
    )