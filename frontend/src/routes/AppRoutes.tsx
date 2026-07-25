import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login";
import ReportPage from "../pages/Report";
import SuccessPage from "../pages/Success";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/report"
          element={<ReportPage />}
        />
        <Route
          path="/success"
          element={<SuccessPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}