export interface UserSettingsData {
  userId: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  timezone: string;
  language: string;
  lastBackupAt: string | null;
}

export interface UserSettingsRequest {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  twoFactorAuth?: boolean;
  loginAlerts?: boolean;
  timezone?: string;
  language?: string;
}

export interface ChangePasswordRequest {
  userId: number;
  currentPassword: string;
  newPassword: string;
}
