import { createContext, useContext, useState} from "react";
import type { ReactNode } from "react";
import type { Employee } from "../types/auth";

interface AuthContextType {
  employee: Employee | null;
  setEmployee: (employee: Employee | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [employee, setEmployee] = useState<Employee | null>(null);

  return (
    <AuthContext.Provider value={{ employee, setEmployee }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}