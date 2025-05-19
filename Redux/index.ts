import {combineReducers} from 'redux';
import auth from './Reducers/Auth/reducers';
import payment from './Reducers/Payment/reducers';
import carReducersObject from './Reducers/Cars/reducers';
import CarListingReducer from './Reducers/CreateListing/reducer';

const {carReducers, paymentReducer} = carReducersObject;

const reducers = combineReducers({
  payment,
  auth,
  car: carReducers,
  listing: CarListingReducer,
  pendingPayment: paymentReducer,
});
export default reducers;
