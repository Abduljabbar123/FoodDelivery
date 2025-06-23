import {ImageInfo} from '../../../Helper/ImagePikcer';

export type TCatogeryListing = {
  listingType: 'create' | 'edit' | 'resubmit';
  catogery?: FCatogerylListing;
};

interface FCatogerylListing {
  _id: string;
  name: string;
  description: string;
  image: string;
  // API response properties
  categories?: any[];
  success?: boolean;
  message?: string;
}

interface Tloading {
  loading?: boolean;
}
