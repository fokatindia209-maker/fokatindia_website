export interface MonthlyBookingStat {
  month: string;
  count: number;
}

export interface RecentBookingItem {
  id: number;
  bookingCode: string;
  userName: string;
  bookingStatus: string;
  paymentStatus: string;
  finalAmount: number;
  bookingDate: string;
}

export interface TopVendorItem {
  vendorId: number;
  businessName: string;
  rating: number;
  kycStatus: string;
}

export interface AdminDashboardData {
  totalUsers: number;
  totalVendors: number;
  totalBookings: number;
  totalRevenue: number;
  pendingKycVendors: number;
  pendingBookings: number;
  monthlyBookingStats: MonthlyBookingStat[];
  recentBookings: RecentBookingItem[];
  topVendors: TopVendorItem[];
}
