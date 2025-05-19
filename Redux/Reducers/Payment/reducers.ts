import {PAYMENT_PENDING, PAYMENT_COMPLETED} from './actions';
const initialState = {
  payment: false,
};

const paymentReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case PAYMENT_PENDING:
      return {
        ...state,
        payment: true,
      };
    case PAYMENT_COMPLETED:
      return {
        ...state,
        payment: false,
      };
    default:
      return state;
  }
};

export default paymentReducers;
