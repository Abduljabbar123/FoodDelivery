import {showSnackbar} from '../../../components/Snackbar';
import {ICommonResponse, TCallback} from '../../../Redux/Reducers/types';
import Api from '../../../Service/Api';
import API from '../../../config/API';
// import crashlytics from '@react-native-firebase/crashlytics';
import {getError} from '../../../config/function';

export const PAYMENT_PENDING = 'PAYMENT_PENDING';
export const PAYMENT_COMPLETED = 'PAYMENT_COMPLETED';
export const ADD_CARD = (data: any, callback: TCallback<ICommonResponse>) => {
  const {method, url} = API.ADD_CARD;
  Api.request({
    method,
    url,
    data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log('ADD_CARD: ADDING STRIPE CARD.');
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:011]', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({
        success: false,
        message: error.message,
      });
    });
};

export const ADD_CARD_FOR_EXTEND = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.ADD_CARD_FOR_EXTEND;
  Api.request({
    method,
    url,
    data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log('ADD_CARD: ADDING STRIPE CARD.');
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:011]', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({
        success: false,
        message: error.message,
      });
    });
};

export const GET_ALL_SAVED_CARD = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.GET_ALL_SAVED_CARDS;
  Api.request({
    method,
    url,
    data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log(
      //   'GET_ALL_SAVED_CARD: RENTER GETTING ALL SAVED CARDS(PAYMENT).',
      // );
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:012]', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({
        success: false,
        message: error.message,
      });
    });
};

// Car owner
export const ADD_OWNER_BANK_ACCOUNT = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.ADD_OWNER_BANK_ACCOUNT;
  Api.request({
    method,
    url,
    data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log(
      //   'ADD_OWNER_BANK_ACCOUNT: CAR OWNER ADDING HIS BANK ACCOUNT.',
      // );
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:017]', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({
        success: false,
        message: error.message,
      });
    });
};

export const OWNER_BANK_ACCOUNTS = (callback: TCallback<ICommonResponse>) => {
  const {method, url} = API.OWNER_BANK_ACCOUNTS;
  Api.request({
    method,
    url,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log(
      //   'OWNER_BANK_ACCOUNTS: CAR OWNER GETTING ADDED BANK ACCOUNTS.',
      // );
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:017]', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({
        success: false,
        message: error.message,
      });
    });
};

export const DELETE_CONNECTED_ACCOUNT = (
  data: string,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.DELETE_CONNECTED_ACCOUNT;
  Api.request({
    method,
    url: url + data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log(
      //   'DELETE_CONNECTED_ACCOUNT: CAR OWNER DELETING STRIPE CONNECT ACCOUNT.',
      // );
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:018]', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({
        success: false,
        message: error.message,
      });
    });
};

export const CONNECT_ONE_ACCOUNT = (
  data: string,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.CONNECT_ONE_ACCOUNT;
  Api.request({
    method,
    url: url + data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log(
      //   'CONNECT_ONE_ACCOUNT: CAR OWNER CHANGE STRIPE CONNECT ACCOUNT IN HIS PROFILE.',
      // );
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:018]', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({
        success: false,
        message: error.message,
      });
    });
};

export const GET_PENDING_PAYMENTS = (
  data: string,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.GET_PENDING_PAYMENTS;
  Api.request({
    method,
    url: url + data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log(
      //   'GET_PENDING_PAYMENTS: RENTER GETTING HIS PENDING PAYMENT.',
      // );
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:019]', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({
        success: false,
        message: error.message,
      });
    });
};

export const NEW_RENTAL_PAYMENT = (
  transactionId: string | undefined,
  carRentalIdArrayId: string | undefined,
  data: any,
  callback: TCallback<Partial<ICommonResponse>>,
) => {
  const {method, url} = API.NEW_RENTAL_PAYMENT;
  Api.request({
    method,
    url: url + transactionId + '/' + carRentalIdArrayId,
    data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:0120]', error);
      // crashlytics().log('NEW_RENTAL_PAYMENT: WHEN RENTAL DOING PAYMENT ON NEW RENTAL ADDED BY ADMIN.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
    });
  callback({
    success: false,
  });
};
