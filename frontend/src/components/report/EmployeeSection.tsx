import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import Card from "../common/card";
import Input from "../common/Input";
import { UserRound } from "lucide-react";

interface Props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
}

export default function EmployeeSection({
  register,
  setValue,
}: Props) {
  const { employee } = useAuth();

  useEffect(() => {
    if (!employee) return;

    setValue("employee.employeeId", employee.employeeId);
    setValue("employee.employeeName", employee.name);
    setValue("employee.managerEmail", employee.managerEmail);

    const today = new Date().toISOString().split("T")[0];
    setValue("employee.date", today);
  }, [employee, setValue]);

  return (
    <Card
        title={
          <div className="flex items-center gap-2">
            <UserRound size={20} />
            Employee Information
          </div>
        }
      >


      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block text-sm font-medium mb-2">
            Employee Name
          </label>

          <Input
            readOnly
            {...register("employee.employeeName")}
            className="bg-slate-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Employee ID
          </label>

          <Input
            readOnly
            {...register("employee.employeeId")}
            className="bg-slate-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Manager Email
          </label>

          <Input
            type="email"
            {...register("employee.managerEmail")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Date
          </label>

          <Input
            readOnly
            {...register("employee.date")}
            className="bg-slate-100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            City / Base Location
          </label>

          <Input
            placeholder="Enter city"
            {...register("employee.city")}
          />
        </div>

      </div>

    </Card>
  );
}