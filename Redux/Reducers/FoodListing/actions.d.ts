import {ImageInfo} from '../../../Helper/ImagePikcer';

export type TFoodListing = {
  listingType: 'create' | 'edit' | 'resubmit';
  foodListing?: FModelListing;
  // Home screen data
  categories?: Category[];
  recommendedProducts?: FModelListing[];
  discountedProducts?: FModelListing[];
  productsByCategory?: FModelListing[];
  loading?: {
    categories: boolean;
    products: boolean;
    discountedItems: boolean;
  };
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
  // API response properties
  foods?: any[];
  food?: any[];
  categories?: Category[];
  success?: boolean;
  message?: string;
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
