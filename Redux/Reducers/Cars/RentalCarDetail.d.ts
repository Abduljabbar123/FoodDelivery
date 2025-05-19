export interface RentalCarDetails {
  user?: any;
  rental_price: any;
  _id: any;
  availability: {start: string; end: string};
  rental: any;
  car?: any;
  success: boolean;
  rentals: Rentals[];
  search: string;
  sort: string;
  sortOrder: string;
  page: string;
  count: string;
  status: string;
  message: string;
  pictures?: {
    owner?: {
      before?: array;
      after?: array;
    };
    renter?: {
      before?: array;
      after?: array;
    };
  };
}
export interface RentalCarDetail {
  success: boolean;
  rental?: Rentals;
  rental?: Rentals;
  message?: string;
  transactions?: any;
  images?: string[];
}
export interface Rentals {
  is_late?: boolean | undefined;
  transactions?: any;
  _id: string;
  status: string;
  arrived_at_destination: boolean;
  pictures: Pictures;
  additional_car_data: Additionalcardata;
  rental: Rental[];
  car: Car;
  renter: Renter;
  rental_price?: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Renter {
  _id: any;
  user_data: any;
  name: string;
  photo: string;
}
interface Car {
  _id: string;
  user: User;
  v_id: string;
  make: string;
  model: string;
  year: number;
  rental: string[];
  proof_of_registration: Proofofregistration;
  proof_of_insurance: Proofofregistration;
  proof_of_inspection: Proofofregistration;
  registration_plate_number: string;
  description: string;
  pickup_address: Pickup;
  drop_off_address: Pickup;
  availability: Availability;
  price_per_day: number;
  allowed_miles: number;
  listing_status: Listingstatus;
  images: string[];
  odometer: number;
  transmission: string;
  additional_charges: Additionalcharges;
  additional_docs: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  car: string;
}

interface Additionalcharges {
  gas: number;
  wash: number;
  _id: string;
}

interface Listingstatus {
  status: string;
}

interface Availability {
  start: string;
  end: string;
}

interface Proofofregistration {
  doc: string;
  expiry_date: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone_no: string;
  role: string;
  address: Address2[];
  verify_by_email: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  deleted: boolean;
  user_data: Userdata;
  photo: string;
}

interface Userdata {
  description: string;
}

interface Address2 {
  location: Pickup;
  location_name: string;
  _id: string;
}

interface Rental {
  discount: boolean;
  transaction: boolean;
  additional: any;
  start: string;
  end: string;
  isExtended: boolean;
  _id: string;
}

interface Additionalcardata {
  price_per_day: number;
  allowed_miles: number;
  address: Address;
  current_odo_meter: number;
  _id: string;
}

interface Address {
  pickup: Pickup;
  drop_off: Pickup;
}

interface Pickup {
  area: string;
  lat: number;
  lng: number;
}

interface Pictures {
  owner: Owner;
  renter: Owner;
}

interface Owner {
  before: any[];
  after: any[];
}
