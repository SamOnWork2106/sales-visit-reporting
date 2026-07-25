import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
EMPLOYEE_FILE = BASE_DIR / "config" / "employees.json"


def load_employees():
    with open(EMPLOYEE_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def authenticate(employee_id: str, password: str):
    employees = load_employees()

    for employee in employees:
        if (
            employee["employeeId"] == employee_id
            and employee["password"] == password
        ):
            return employee

    return None