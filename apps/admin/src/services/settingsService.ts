import api from "../api/axios";
import type {
  UserSettingsData,
  UserSettingsRequest,
  ChangePasswordRequest,
} from "../types/settings";

interface ApiRes<T> {
  status: string;
  statusCode: number;
  message: string;
  data: T;
}

export const getSettings = async (userId: number): Promise<UserSettingsData> => {
  const res = await api.get<ApiRes<UserSettingsData>>(
    `/restful/v1/api/admin/settings/${userId}`
  );
  return res.data.data;
};

export const updateSettings = async (
  userId: number,
  data: UserSettingsRequest
): Promise<UserSettingsData> => {
  const res = await api.put<ApiRes<UserSettingsData>>(
    `/restful/v1/api/admin/settings/${userId}`,
    data
  );
  return res.data.data;
};

export const changePassword = async (
  data: ChangePasswordRequest
): Promise<string> => {
  const res = await api.put<ApiRes<string>>(
    "/restful/v1/api/admin/settings/password",
    data
  );
  if (res.data.status === "error") throw new Error(res.data.message);
  return res.data.message;
};

export const triggerBackup = async (
  userId: number
): Promise<UserSettingsData> => {
  const res = await api.post<ApiRes<UserSettingsData>>(
    `/restful/v1/api/admin/settings/backup/${userId}`
  );
  return res.data.data;
};
