// Doctor service functions
export {
   getAllDoctors,
   getDoctorById,
   getDoctorBySlug,
   searchDoctors,
   getDoctorsBySpecialty,
   getFeaturedDoctors
} from './doctor.service'

// Specialty service functions
export {
   getAllSpecialties,
   getSpecialtyBySlug,
   getPopularSpecialties,
   getSpecialtiesByCategory,
   searchSpecialties,
   getSpecialtyStats
} from './specialty.service'

// Cache service functions
export {
   set,
   get,
   clear,
   has,
   deleteKey,
   size,
   keys,
   getOrSet,
   clearExpired,
   getStats,
   createKey,
   setWithTags,
   invalidateByTag
} from './cache.service'

// Auth service functions
export {
   signIn,
   signUp,
   logout,
   getCurrentUser,
   isAuthenticated,
   verifyEmail,
   forgotPassword,
   resetPassword,
   mockLogin,
   mockSignup
} from './auth.service'

// Question service functions
export {
   submitQuestion,
   getQuestionById
} from './question.service'

// Health service functions
export {
   getVitalSigns,
   getMedicalRecords,
   addVitalSign,
   updateVitalSign,
   deleteVitalSign
} from './health.service'

// Booking service functions
export {
   getBookings,
   getBookingById,
   cancelBooking,
   rescheduleBooking
} from './booking.service'

// User question service functions
export {
   getUserQuestions,
   getQuestionById as getUserQuestionById,
   rateQuestion,
   deleteQuestion,
   filterQuestions
} from './user-question.service'

// Order detail service functions
export {
   getOrderById,
   cancelOrder,
   rescheduleOrder,
   downloadInvoice,
   printInvoice
} from './order-detail.service'

// User service functions
export {
   getUserByEmail,
   getUserById,
   createUser,
   updateUser,
   deleteUser,
   updateUserProfile,
   toAuthUser,
   fromAuthUser
} from './user.service'
