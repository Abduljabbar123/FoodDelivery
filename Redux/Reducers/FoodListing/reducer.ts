import {CREATE_LISTING, TYPE_LISTING} from './action';
import {TFoodListing} from './actions';

const initialState: TFoodListing = {
  listingType: 'create',
  foodListing: {},
};

const FoodListingReducer = (
  state: TFoodListing = initialState,
  action: any,
): TFoodListing => {
  switch (action.type) {
    case CREATE_LISTING:
      return {...state, foodListing: action.payload};
    case TYPE_LISTING:
      return {...state, listingType: action.payload};
    default:
      return state;
  }
};

export default FoodListingReducer;
