import { useForm } from "react-hook-form";
import { login } from "../../services/authService";
import type { LoginRequest } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginRequest>();
  const { setEmployee } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await login(data);

      if (response.success && response.employee) {
        setEmployee(response.employee);
        navigate("/report");
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">
          Sales Visit Reporting
        </h1>

        <input
          type="text"
          placeholder="Employee ID"
          {...register("employeeId", { required: true })}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800"
        >
          {isSubmitting ? "Signing In..." : "Login"}
        </button>
      </form>
    </div>
  );
}