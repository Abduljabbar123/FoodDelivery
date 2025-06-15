import {combineReducers} from 'redux';
import auth from './Reducers/Auth/reducers';
import payment from './Reducers/Payment/reducers';
import carReducersObject from './Reducers/Cars/reducers';
import FoodListingReducer from './Reducers/FoodListing/reducer';
const {carReducers, paymentReducer} = carReducersObject;

const reducers = combineReducers({
  payment,
  auth,
  car: carReducers,
  foodListing: FoodListingReducer,
  pendingPayment: paymentReducer,
});
export default reducers;
