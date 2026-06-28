import api from "../api/axios";
import type { VendorDashboardData } from "../types/vendorDashboard";

export async function getVendorDashboardStats(vendorId: number): Promise<VendorDashboardData> {
  const res = await api.get(`/restful/v1/api/vendor/dashboard/${vendorId}`);
  return res.data.data as VendorDashboardData;
}
