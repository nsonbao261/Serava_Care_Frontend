import {
   CheckCircle,
   XCircle,
   AlertCircle,
   RefreshCw,
   Video,
   Building2,
   Stethoscope,
   Heart,
} from 'lucide-react'

export const ACCESS_TOKEN = 'serava_care_access_token'
export const REFRESH_TOKEN = 'serava_care_refresh_token'
export const COOKIE_USER_DATA = 'user_data'

export const DATE_FORMAT = 'dd-MM-yyyy'

// Booking status configuration
export const BOOKING_STATUS_CONFIG = {
   pending: {
      label: 'Chờ xác nhận',
      color: 'bg-yellow-100 text-yellow-800',
      icon: AlertCircle
   },
   confirmed: {
      label: 'Đã xác nhận',
      color: 'bg-blue-100 text-blue-800',
      icon: CheckCircle
   },
   completed: {
      label: 'Hoàn thành',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle
   },
   cancelled: {
      label: 'Đã hủy',
      color: 'bg-red-100 text-red-800',
      icon: XCircle
   },
   rescheduled: {
      label: 'Đã dời lịch',
      color: 'bg-purple-100 text-purple-800',
      icon: RefreshCw
   }
} as const

// Service type icons
export const SERVICE_ICONS = {
   telemedicine: Video,
   clinic: Building2,
   home: Stethoscope,
   emergency: Heart
} as const