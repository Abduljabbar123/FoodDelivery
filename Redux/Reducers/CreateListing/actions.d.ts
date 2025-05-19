import {ImageInfo} from '../../../Helper/ImagePikcer';
export type TCarListing = {
  carListing: TListing | null;
  listingloading: Tloading | null;
  listingType: 'create' | 'edit' | 'resubmit';
  makemodelcarlisting: TListing | null;
};

interface TListing {
  pickup_address: string;
  drop_off_address: string;
  price_per_day: string;
  weeklyDiscount: string;
  monthlyDiscount: string;
  miles: string;
  v_id: string;
  make: string;
  model: string;
  transmission: string;
  year: string;
  color: string;
  availability: {
    start: string;
    end: string;
  };
  // from: string;
  // to: string;
  odometer: string;
  registration_plate_number: string;
  description: string;
  images: ImageInfo[];
  proof_of_registration: documentRes;
  proof_of_insurance: documentRes;
  proof_of_inspection: documentRes;
}

interface Tloading {
  loading?: boolean;
}

interface documentRes {
  val?: string;
  expiry_date: string;
  fileCopyUri?: any;
  name: string;
  size: number;
  type: string;
  uri: string;
}
