export default {
  LOGIN: {method: 'POST', url: 'auth/login'},
  SIGNUP: {method: 'POST', url: 'users'},
  VERIFY_EMAIL: {method: 'POST', url: 'users/verify-code'},
  FORGOT_PASSWORD: {
    method: 'PUT',
    url: 'auth/forgot/',
  },
  RESEND_EMAIL: {method: 'POST', url: 'users/resendEmailVerification'},
  CHANGE_PASSWORD: {method: 'PUT', url: 'auth/change-password/'},
  UPDATE_USER_BY_ID: {method: 'PUT', url: 'users/editProfile/'},
  DELETE_USER_BY_ID: {method: 'DELETE', url: 'users/'},

  GET_PRODUCT_BY_ID: {method: 'GET', url: 'food/'},
  GET_ALL_PRODUCTS: {method: 'GET', url: 'food'},
  GET_ALL_DISCOUNTED_ITEMS: {
    method: 'GET',
    url: 'food/getDiscountedPriceItem',
  },
  GET_PRODUCT_BY_CATOGERY_ID: {method: 'GET', url: 'food/getFoodByCategory/'},
  GET_FILTERED_PRODUCT: {method: 'GET', url: 'food/foods/filter?'},

  GET_CATOGERY_BY_ID: {method: 'GET', url: 'category/'},
  GET_ALL_CATOGERIES: {method: 'GET', url: 'category'},

  GET_ALL_CART_PRODUCT: {method: 'GET', url: 'cart'},
  ADD_TO_CART: {method: 'POST', url: 'cart/add'},

  REMOVE_FROM_CART: {method: 'DELETE', url: 'cart/remove/'},
  CLEAR_CART: {method: 'DELETE', url: 'cart/clear'},
  UPDATE_CART: {method: 'PUT', url: 'cart/update'},

  GET_USER_BY_ID: {
    method: 'GET',
    url: 'users/',
  },
  ADD_ADDRESS: {method: 'PUT', url: 'users/addAddress/'},
  NOTIFICATION_SETTING: {method: 'PUT', url: 'users/notificationSetting/'},

  // Car listing APIs
  GET_CAR_LIST: {method: 'GET', url: 'cars/listForRenter'},
  GET_CAR_By_ID: {method: 'GET', url: 'cars/'},
  GET_SIMILAR_CAR: {method: 'GET', url: 'cars/similarCars/'},
  GET_FILTERS: {method: 'POST', url: 'cars/getFilters'},
  UPLOAD_CAR_PICS: {method: 'POST', url: 'cars/uploadCarPics'},
  GET_OWNER_CAR_RENTAL: {method: 'GET', url: 'cars/listByOwnerForRenter/'},

  // Car booking APIs
  CALCULATE_CAR_RENTAL: {
    method: 'POST',
    url: 'car-rentals/carRentalChargesCalculator',
  },
  CAR_RENTAL: {method: 'POST', url: 'car-rentals'},
  GET_CAR_RENTAL_STATUS: {method: 'GET', url: 'car-rentals/byRenterAndStatus'},
  GET_CAR_RENTALS_DETAILS: {method: 'GET', url: 'car-rentals/'},
  RENTAL_IMAGE: {
    method: 'PATCH',
    url: 'car-rentals/addCarRentalPictureByRenter/',
  },
  EXTEND_CAR_RENTAL: {method: 'PATCH', url: 'car-rentals/extendCarRental/'},
  IS_CAR_RENTAL_EXTENDABLE: {
    method: 'GET',
    url: 'car-rentals/carAvailabilityToExtendRental/',
  },

  // Payment
  ADD_CARD: {method: 'POST', url: 'payment/addCard'},
  ADD_CARD_FOR_EXTEND: {method: 'POST', url: 'payment/paymentSheets'},
  GET_ALL_SAVED_CARDS: {method: 'POST', url: 'payment/allSaveCards'},
  GET_PENDING_PAYMENTS: {method: 'GET', url: 'car-rentals/pending/payments/'},

  NEW_RENTAL_PAYMENT: {method: 'PUT', url: 'car-rentals/transaction/'},

  // Chat
  GET_ALL_CHAT: {method: 'GET', url: 'chat'},
  GET_CHAT: {method: 'POST', url: 'chat/singleChat'},
  BLOCK_USER_CHAT: {method: 'PATCH', url: 'chat/blockUser/'},
  UNBLOCK_USER_CHAT: {method: 'PATCH', url: 'chat/unBlockUser/'},

  // Additional fee
  GET_CAR_INSURANCE_FEE: {
    method: 'GET',
    url: 'additional-fee/insuranceFeeByCar/',
  },
  GET_LATE_FEE: {
    method: 'GET',
    url: 'additional-fee/lateFee',
  },
  EXTEND_FEE_TRANSACTION: {
    method: 'PATCH',
    url: 'car-rentals/extensionCarRent/transaction/',
  },
  ADDITIONAL_FEE_TRANSACTION: {
    method: 'PATCH',
    url: 'car-rentals/payAdditionalCharges/',
  },
  GET_CARS_LIST_OWNER: {
    method: 'GET',
    url: 'cars/listAllOfOwnerStatus',
  },

  // Get late fee detail by rental id ( now using calculator api instead of this)
  // GET_RENTAL_LATE_FEE_DETAILS: {
  //   method: 'GET',
  //   url: 'car-rentals/carRentalLateFee/',
  // },

  // Argyle
  GET_ARGYLE_TOKEN: {method: 'GET', url: 'users/argyle/'},
  ADD_CONNECTED_ACCOUNTS: {
    method: 'PUT',
    url: 'users/argyle/addConnectedAccount/',
  },
  REMOVE_REVOKED_ACCOUNTS: {
    method: 'PUT',
    url: 'users/argyle/removeRevokedAccount/',
  },

  // Car Owner APIs
  CAR_LIST_BY_OWNER: {
    method: 'GET',
    url: 'cars/listByOwner',
  },
  GET_OWNER_FINANCIAL_ENDPOINTS: {
    method: 'GET',
    url: 'car-transactions/ownerFinancial',
  },
  CREATE_CAR_OWNER_SIDE: {
    method: 'POST',
    url: 'cars/',
  },
  UPDATE_OWNER_CAR: {
    method: 'PUT',
    url: 'cars/',
  },
  CHECK_VIN_OWNER_SIDE: {
    method: 'POST',
    url: 'cars/checkVin',
  },
  CREATE_CAR_OWNER_IMAGES: {
    method: 'POST',
    url: 'cars/uploadCarPics',
  },
  CREATE_CAR_OWNER_DOCS: {
    method: 'POST',
    url: 'cars/uploadCarDoc',
  },
  GET_OWNER_CAR_RENTAL_STATUS: {
    method: 'GET',
    url: 'car-rentals/byOwnerAndStatus',
  },
  CAR_RENTAL_ACCEPT: {
    method: 'PATCH',
    url: 'car-rentals/acceptRental/',
  },
  CAR_RENTAL_DECLINE: {
    method: 'DELETE',
    url: 'car-rentals/cancel/',
  },
  ADD_CAR_RENTAL_PICTURE_BY_OWNER: {
    method: 'PATCH',
    url: 'car-rentals/addCarRentalPictureByOwner/',
  },
  START_RENTAL_BY_OWNER: {
    method: 'PATCH',
    url: 'car-rentals/startRideByRental/',
  },
  COMPLETE_RENTAL_BY_OWNER: {
    method: 'PATCH',
    url: 'car-rentals/endRideByRental/',
  },
  LISTING_STATUS: {
    method: 'PATCH',
    url: 'cars/statusChangeByOwner/',
  },
  // Notifications
  GET_ALL_NOTIFICATIONS: {
    method: 'GET',
    url: 'notifications',
  },
  READ_ALL_NOTIFICATIONS: {
    method: 'PATCH',
    url: 'notifications',
  },

  // Car owner dashboard
  CAR_OWNER_DASHBOARD: {
    method: 'GET',
    url: 'users/owner-dashboard',
  },

  // Car owner connect accounts of stripe
  ADD_OWNER_BANK_ACCOUNT: {
    method: 'POST',
    url: 'payment/addOwnerBank',
  },
  OWNER_BANK_ACCOUNTS: {
    method: 'GET',
    url: 'payment/ownerBankAccounts',
  },
  DELETE_CONNECTED_ACCOUNT: {
    method: 'DELETE',
    url: 'payment/',
  },
  CONNECT_ONE_ACCOUNT: {
    method: 'PATCH',
    url: 'payment/changeStripeActiveAccount/',
  },
  GET_MOBILE_VERSION: {
    method: 'GET',
    url: 'version/latest-version',
  },

  // late fee transaction
  LATE_FEE_TRANSACTION: {
    method: 'POST',
    url: 'car-transactions/late-fee',
  },

  // Exchange vehicle by car owner
  OWNER_EXCHANGE_VEHICLE: {
    method: 'PUT',
    url: 'car-rentals/ownerExchangeCarRent/',
  },
  CHECK_RENTAL_EXCHANGE: {
    method: 'PATCH',
    url: 'car-rentals/checkRentalExchangeForCarRenter/',
  },

  // Favorites APIs
  ADD_TO_FAVORITES: {
    method: 'POST',
    url: 'favorites/add',
  },
  REMOVE_FROM_FAVORITES: {
    method: 'DELETE',
    url: 'favorites/remove/',
  },
  GET_ALL_FAVORITES: {
    method: 'GET',
    url: 'favorites',
  },
  CHECK_FAVORITE_STATUS: {
    method: 'GET',
    url: 'favorites/check/',
  },

  // Address APIs
  ADDRESSES: {
    method: 'POST',
    url: 'addresses',
  },
  GET_ADDRESSES: {
    method: 'GET',
    url: 'addresses',
  },
  GET_ADDRESS_BY_ID: {
    method: 'GET',
    url: 'addresses/',
  },
  UPDATE_ADDRESS: {
    method: 'PUT',
    url: 'addresses/',
  },
  DELETE_ADDRESS: {
    method: 'DELETE',
    url: 'addresses/',
  },
  SET_DEFAULT_ADDRESS: {
    method: 'PATCH',
    url: 'addresses/',
  },
  GET_DEFAULT_ADDRESS: {
    method: 'GET',
    url: 'addresses/default',
  },
};
