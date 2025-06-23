import {combineReducers} from 'redux';
import auth from './Reducers/Auth/reducers';
import payment from './Reducers/Payment/reducers';
import carReducersObject from './Reducers/Cars/reducers';
import FoodListingReducer from './Reducers/FoodListing/reducer';
import favoritesReducer from './Reducers/Favorites/reducer';
import addressReducer from './Reducers/Address/reducers';

const {carReducers, paymentReducer} = carReducersObject;

const reducers = combineReducers({
  payment,
  auth,
  car: carReducers,
  foodListing: FoodListingReducer,
  pendingPayment: paymentReducer,
  favorites: favoritesReducer,
  address: addressReducer,
});
export default reducers;
