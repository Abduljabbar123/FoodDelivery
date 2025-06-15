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
}

interface Tloading {
  loading?: boolean;
}
