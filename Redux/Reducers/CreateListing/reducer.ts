import {
  CAR_LISTING_LOADING,
  CREATE_LISTING,
  MAKE_MODEL_CREATE_LISTING,
  TYPE_LISTING,
} from './action';
import {TCarListing} from './actions';

const initialState: TCarListing = {
  carListing: null,
  listingType: 'create',
  listingloading: null,
  makemodelcarlisting: null,
};

const CarListingReducer = (
  state: TCarListing = initialState,
  action: any,
): TCarListing => {
  switch (action.type) {
    case CREATE_LISTING:
      return {...state, carListing: action.payload};
    case CAR_LISTING_LOADING:
      return {...state, listingloading: action.payload};
    case TYPE_LISTING:
      return {...state, listingType: action.payload};
    case MAKE_MODEL_CREATE_LISTING:
      return {...state, makemodelcarlisting: action.payload};
    default:
      return state;
  }
};

export default CarListingReducer;
