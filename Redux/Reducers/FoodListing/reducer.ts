import {
  CREATE_LISTING,
  TYPE_LISTING,
  SET_CATEGORIES,
  SET_RECOMMENDED_PRODUCTS,
  SET_DISCOUNTED_PRODUCTS,
  SET_PRODUCTS_BY_CATEGORY,
  SET_LOADING,
} from './action';
import {TFoodListing} from './actions';

const initialState: TFoodListing = {
  listingType: 'create',
  foodListing: {},
  categories: [],
  recommendedProducts: [],
  discountedProducts: [],
  productsByCategory: [],
  loading: {
    categories: false,
    products: false,
    discountedItems: false,
  },
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
    case SET_CATEGORIES:
      return {...state, categories: action.payload};
    case SET_RECOMMENDED_PRODUCTS:
      return {...state, recommendedProducts: action.payload};
    case SET_DISCOUNTED_PRODUCTS:
      return {...state, discountedProducts: action.payload};
    case SET_PRODUCTS_BY_CATEGORY:
      return {...state, productsByCategory: action.payload};
    case SET_LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
};

export default FoodListingReducer;
