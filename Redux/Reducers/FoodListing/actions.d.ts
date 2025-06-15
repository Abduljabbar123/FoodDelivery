import {ImageInfo} from '../../../Helper/ImagePikcer';

export type TFoodListing = {
  listingType: 'create' | 'edit' | 'resubmit';
  foodListing?: FModelListing;
};

interface FModelListing {
  name?: string;
  description?: string;
  price?: number;
  image?: any;
  _id?: string;
  isAvailable?: boolean;
  category?: Category;
  distance?: string;
  rating?: number;
  numReviews?: number;
  isPromo?: boolean;
  fee?: string;
}

export interface Category {
  _id: string;
  name: string;
  image: ImageInfo;
  backgroundColor: string;
}

interface Tloading {
  loading?: boolean;
}
