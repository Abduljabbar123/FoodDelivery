import {USER_CAR_FILTER_DATA, USER_PENDING_PAYMENTS} from './actions';
import {TPendingPayment, TUserCarFilterData} from '../types';

const initialState: TUserCarFilterData = {
  carFilterData: {
    minPrice: undefined,
    maxPrice: undefined,
    maxDistance: undefined,
  },
};

const initialPaymentState: TPendingPayment = {
  pendingPayment: false,
};

const carReducers = (
  state: TUserCarFilterData = initialState,
  action: any,
): TUserCarFilterData => {
  switch (action.type) {
    case USER_CAR_FILTER_DATA:
      return {
        ...state,
        carFilterData: action.payload,
      };
    default:
      return state;
  }
};

const paymentReducer = (
  state: TPendingPayment = initialPaymentState,
  action: any,
): TPendingPayment => {
  switch (action.type) {
    case USER_PENDING_PAYMENTS:
      return {
        ...state,
        pendingPayment: action.payload,
      };
    default:
      return state;
  }
};

export default {carReducers, paymentReducer};
