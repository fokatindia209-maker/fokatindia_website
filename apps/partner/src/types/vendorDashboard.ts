export interface VendorMonthlyBookingStat {
  month: string;
  count: number;
}

export interface VendorRecentBookingItem {
  id: number;
  bookingCode: string;
  userName: string;
  bookingStatus: string;
  paymentStatus: string;
  finalAmount: number;
  bookingDate: string;
}

export interface VendorTopSubVendorItem {
  subVendorId: number;
  name: string;
  specialization: string;
  availabilityStatus: string;
  rating: number;
  totalJobs: number;
}

export interface VendorRecentReviewItem {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface VendorDashboardData {
  totalBookings: number;
  totalEarnings: number;
  totalSubVendors: number;
  activeJobs: number;
  completedJobs: number;
  cancelledJobs: number;
  averageRating: number;
  monthlyBookingStats: VendorMonthlyBookingStat[];
  recentBookings: VendorRecentBookingItem[];
  topSubVendors: VendorTopSubVendorItem[];
  recentReviews: VendorRecentReviewItem[];
}
