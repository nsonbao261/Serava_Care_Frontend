import {
   CheckCircle,
   XCircle,
   AlertCircle,
   RefreshCw,
   Video,
   Building2,
   Stethoscope,
   Heart,
   Activity,
   Thermometer,
   Droplets,
   Weight
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

// Vital signs configuration
export const VITAL_SIGNS_CONFIG = {
   blood_pressure: {
      label: 'Huyết áp',
      icon: Heart,
      unit: 'mmHg',
      color: 'text-red-600 bg-red-50'
   },
   heart_rate: {
      label: 'Nhịp tim',
      icon: Activity,
      unit: 'bpm',
      color: 'text-pink-600 bg-pink-50'
   },
   weight: {
      label: 'Cân nặng',
      icon: Weight,
      unit: 'kg',
      color: 'text-blue-600 bg-blue-50'
   },
   temperature: {
      label: 'Nhiệt độ',
      icon: Thermometer,
      unit: '°C',
      color: 'text-orange-600 bg-orange-50'
   },
   blood_sugar: {
      label: 'Đường huyết',
      icon: Droplets,
      unit: 'mg/dL',
      color: 'text-purple-600 bg-purple-50'
   }
} as const

// Status colors for health records
export const HEALTH_STATUS_COLORS = {
   normal: 'text-green-600 bg-green-50',
   warning: 'text-yellow-600 bg-yellow-50',
   danger: 'text-red-600 bg-red-50'
} as const

// Medical record status colors
export const MEDICAL_RECORD_STATUS_COLORS = {
   completed: 'text-green-600 bg-green-50',
   pending: 'text-yellow-600 bg-yellow-50',
   scheduled: 'text-blue-600 bg-blue-50'
} as const

// Medical record type labels
export const MEDICAL_RECORD_TYPE_LABELS = {
   checkup: 'Khám bệnh',
   consultation: 'Tư vấn',
   lab_result: 'Xét nghiệm',
   prescription: 'Đơn thuốc',
   vaccination: 'Tiêm chủng'
} as const

// Medical record status labels
export const MEDICAL_RECORD_STATUS_LABELS = {
   completed: 'Hoàn thành',
   pending: 'Chờ xử lý',
   scheduled: 'Đã lên lịch'
} as const

// API endpoints
export const API_ENDPOINTS = {
   AUTH: {
      LOGIN: '/auth/sign-in',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      PROFILE: '/auth/profile'
   },
   QUESTIONS: {
      BASE: '/questions',
      SUBMIT: '/questions',
      MY_QUESTIONS: '/questions/my',
      BY_ID: (id: string) => `/questions/${id}`
   },
   HEALTH: {
      VITAL_SIGNS: '/health/vital-signs',
      MEDICAL_RECORDS: '/health/medical-records',
      VITAL_SIGN_BY_ID: (id: string) => `/health/vital-signs/${id}`,
      MEDICAL_RECORD_BY_ID: (id: string) => `/health/medical-records/${id}`
   },
   BOOKINGS: {
      BASE: '/bookings',
      MY_BOOKINGS: '/bookings/my',
      BY_ID: (id: string) => `/bookings/${id}`,
      CANCEL: (id: string) => `/bookings/${id}/cancel`,
      RESCHEDULE: (id: string) => `/bookings/${id}/reschedule`
   }
} as const

// Form validation limits
export const VALIDATION_LIMITS = {
   QUESTION: {
      TITLE_MIN: 10,
      TITLE_MAX: 200,
      CONTENT_MIN: 50,
      CONTENT_MAX: 2000,
      MAX_ATTACHMENTS: 5,
      MAX_FILE_SIZE: 10 * 1024 * 1024 // 10MB
   },
   PROFILE: {
      NAME_MIN: 2,
      NAME_MAX: 100,
      ADDRESS_MIN: 10,
      ADDRESS_MAX: 200,
      PHONE_PATTERN: /^[0-9]{10,11}$/,
      PASSWORD_MIN: 8
   }
} as const

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
   FAST: 150,
   NORMAL: 300,
   SLOW: 500,
   EXTRA_SLOW: 800
} as const

// Debounce delays (in milliseconds)
export const DEBOUNCE_DELAYS = {
   SEARCH: 300,
   INPUT: 500,
   API_CALL: 1000
} as const
