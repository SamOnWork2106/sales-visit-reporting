import api from "./api";

export const generateSummary = async (data: any) => {
  const response = await api.post(
    "/report/generate-summary",
    data
  );

  return response.data;
};

export const submitReport = async (data: any) => {
  const response = await api.post(
    "/report/submit-report",
    data
  );

  return response.data;
};