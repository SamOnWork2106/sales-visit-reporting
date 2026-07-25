from pydantic import BaseModel


class LoginRequest(BaseModel):
    employeeId: str
    password: str


class EmployeeResponse(BaseModel):
    employeeId: str
    name: str
    managerEmail: str
    region: str | None = None


class LoginResponse(BaseModel):
    success: bool
    message: str
    employee: EmployeeResponse | None = None