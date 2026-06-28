import api from "../api/axios";
import type { AdminDashboardData } from "../types/dashboard";

interface DashboardApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: AdminDashboardData;
}

export const getDashboardStats = async (): Promise<AdminDashboardData> => {
  const response = await api.get<DashboardApiResponse>(
    "/restful/v1/api/admin/dashboard"
  );
  return response.data.data;
};
