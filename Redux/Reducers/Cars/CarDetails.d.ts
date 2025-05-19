export interface CarDetails {
  proof_of_registration: Proofofregistration;
  proof_of_insurance: Proofofregistration;
  proof_of_inspection: Proofofregistration;
  availability: Availability;
  listing_status: Listingstatus;
  rental: any[];
  _id: string;
  user: User;
  v_id: string;
  make: string;
  model: string;
  year: number;
  distance: number;
  registration_plate_number: string;
  description: string;
  pickup_address: Pickupaddress;
  drop_off_address: boolean;
  price_per_day: number;
  allowed_miles: number;
  images: string[];
  odometer: number;
  transmission: string;
  additional_docs: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Pickupaddress {
  area: string;
  lat: number;
  lng: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone_no: string;
  role: string;
  address: Address[];
  verify_by_email: boolean;
  user_data: Userdata;
  createdAt: string;
  updatedAt: string;
  __v: number;
  deleted: boolean;
}

interface Userdata {
  payment_methods: any[];
  _id: string;
}

interface Address {
  location: Location;
  location_name: string;
  _id: string;
}

interface Location {
  address: string;
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
