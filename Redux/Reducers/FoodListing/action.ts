import {getRedux} from '../../../Redux/function';
import {FModelListing} from './actions';
import API from '../../../config/API';
import Api from '../../../Service/Api';
import {ICommonResponse, TCallback} from '../types';
import {showSnackbar} from '../../../components/Snackbar';
import {getError} from '../../../config/function';
import {ENV} from '../../../config/env';

export const CREATE_LISTING = 'CREATE_LISTING';
export const TYPE_LISTING = 'TYPE_LISTING';

export const listingData = (data: Partial<FModelListing>) => {
  const {dispatch} = getRedux();
  dispatch({type: CREATE_LISTING, payload: data});
};

export const TypeListing = (data: 'create' | 'edit' | 'resubmit') => {
  const {dispatch} = getRedux();
  dispatch({type: TYPE_LISTING, payload: data});
};

export const LISTING_STATUS_CHANGE = (
  data: {
    id: string;
    status: 'inactive' | 'unavailable' | '';
    reason: string;
    description: string;
  },
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.LISTING_STATUS;

  Api.request({
    method,
    url: `${url + data.id}?status=${data.status}&reason=${
      data.reason
    }&description=${data.description}`,
  })
    .then(res => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log(
      //   'LISTING_STATUS_CHANGE: CAR LISTING STATUS CHANGE BY OWNER.',
      // );
      // crashlytics().recordError(error);
      console.log(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
    });
};

export const GET_ALL_FOOD = (callback: TCallback<Partial<FModelListing>>) => {
  const {method, url} = API.GET_ALL_PRODUCTS;
  Api.request({
    method,
    url: url,
  })
    .then((res: FModelListing) => {
      callback(res);
      // console.log('res', JSON.stringify(res, null, 2));

      const {dispatch} = getRedux();
      dispatch({type: CREATE_LISTING, payload: res});
    })
    .catch(error => {
      console.log('📢 [actions.ts:140]', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_FOOD_BY_ID = (
  id: string | undefined,
  callback: TCallback<FModelListing>,
) => {
  const {method, url} = API.GET_PRODUCT_BY_ID;

  Api.request({
    method,
    url: url + id,
  })
    .then((res: FModelListing) => {
      callback(res);
      console.log('res wwww', JSON.stringify(res, null, 2));
    })
    .catch(error => {
      console.log('📢 [actions.ts:140]', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_FOOD_BY_CATOGERY_ID = (
  id: string | undefined,
  callback: TCallback<FModelListing>,
) => {
  const {method, url} = API.GET_PRODUCT_BY_CATOGERY_ID;

  Api.request({
    method,
    url: url + id,
  })
    .then((res: FModelListing) => {
      callback(res);
      // console.log('res wwww', JSON.stringify(res, null, 2));
    })
    .catch(error => {
      console.log('📢 [actions.ts:140]', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_DISCOUNTED_PRICE = (
  callback: TCallback<Partial<FModelListing>>,
) => {
  const {method, url} = API.GET_ALL_DISCOUNTED_ITEMS;
  Api.request({
    method,
    url: url,
  })
    .then((res: FModelListing) => {
      callback(res);
      // console.log('res', JSON.stringify(res, null, 2));
      // const {dispatch} = getRedux();
      // dispatch({type: CREATE_LISTING, payload: res});
    })
    .catch(error => {
      console.log('📢 [actions.ts:140]', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_ALL_PRODUCT_CART = (
  callback: TCallback<Partial<FModelListing>>,
) => {
  const {method, url} = API.GET_ALL_CART_PRODUCT;

  Api.request({
    method,
    url: url,
  })
    .then((res: FModelListing) => {
      callback(res);
      // const {dispatch} = getRedux();
      // dispatch({type: CREATE_LISTING, payload: res});
    })
    .catch(error => {
      console.log('📢 [actions.ts:140]', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const ADD_TO_CART = (
  data: any,
  callback: TCallback<ICommonResponse | FModelListing>,
) => {
  const {method, url} = API.ADD_TO_CART;
  console.log('url', ENV.base_url + url);
  Api.request({method, url, data})
    .then((res: FModelListing) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [Auth.ts:01]', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};
