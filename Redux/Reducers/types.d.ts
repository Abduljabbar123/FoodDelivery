interface TMongoCommon {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface TUserLocation {
  area: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface UserVerifyEmail {
  email: string | null;
  code: number | null;
}

interface UserVerifyEmailResponse {
  email: string | null;
  code: number | null;
}

interface TUserCarFilterData {
  carFilterData: {
    minPrice: number | undefined;
    maxPrice: number | undefined;
    maxDistance: number | undefined;
  };
}

interface TPendingPayment {
  pendingPayment: Boolean | undefined;
}
interface TUserCarRental {
  rentalId: string | undefined | null;
}

export type TAuth = {
  isLoggedIn: boolean;
  user: TUser | null;
  token: string | null;
  boarded: boolean;
  userType: 'renter' | 'owner' | null;
  updateLocation: TUserLocation;
  onlineUsers: any;
  fcm_token: string | null;
  userLoading?: boolean;
};

interface TUser extends TMongoCommon {
  _id: string;
  name: string;
  role: 'driver' | 'resturant' | 'user' | null;
  email: string;
  password: string;
  phone_no: string;
  photo: string;
  description: string;
  verify_by_email: boolean;
  address: Address[];
  status?: string;
  dob: string;
  nickname?: string;
  number?: string;
  country_code?: string;
  user_data: {
    account_details?: Array;
    description: string;
    license: Object;
    verify_by_argyle: Object;
    verify_by_checker: Object;
    payment_methods: Array;
    active_rental?: string;
    late_rental?: string;
    argyle: {
      connected_accounts: Array;
      user: string;
    };
  };
  userBlock: boolean;
}
interface Address {
  location: Location;
  location_name: string;
  _id: string;
}

interface Location {
  area: string;
  lat: number;
  lng: number;
}
export type TCallback<T> = (args: T) => void;

export interface ICommonResponse {
  transaction?: any;
  carRental?: any;
  carPrice?: any;
  exchangeDays?: any;
  exchangedCarPrice?: any;
  difference?: any;
  pendingPayments?: array;
  cal?: any;
  late_fee?: any;
  accounts?: any;
  ownerRentalEarning?: any;
  carRentalCounts?: any;
  notifications?: any;
  user_token?: SetStateAction<string>;
  allowed?: boolean;
  platform_fee_percent?: any;
  insurance?: {
    insurance_amount?: any;
  };
  _id?: SetStateAction<undefined>;
  chat?: any;
  messages?: any;
  user?: TUser;
  cards?: any;
  chats?: any;
  clientSecret?: string;
  // json(): {clientSecret: any} | PromiseLike<{clientSecret: any}>;
  owner?: any;
  filters?: any;
  car?: object;
  cars?: array;
  results?: any;
  success: boolean;
  message: string;
  rental?: any;
}
export interface IChat {
  success: boolean;
  messages?: any;
  owner: {
    _id: string;
    name: string;
    photo?: string;
  };
  renter: {
    _id: string;
    name: string;
    photo?: string;
  };
  lastMessage: any;
}
export interface IMessage {
  _id: string;
  chat: string;
  sender: string;
  receiver: string;
  isRead: boolean;
  messages: string;
  createdAt: string;
}
export interface SaveCard {
  id: string;
  card?: {
    brand?: string;
    last4?: string;
  };
}
