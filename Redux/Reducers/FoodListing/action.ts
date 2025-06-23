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
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_RECOMMENDED_PRODUCTS = 'SET_RECOMMENDED_PRODUCTS';
export const SET_DISCOUNTED_PRODUCTS = 'SET_DISCOUNTED_PRODUCTS';
export const SET_PRODUCTS_BY_CATEGORY = 'SET_PRODUCTS_BY_CATEGORY';
export const SET_LOADING = 'SET_LOADING';

export const listingData = (data: Partial<FModelListing>) => {
  const {dispatch} = getRedux();
  dispatch({type: CREATE_LISTING, payload: data});
};

export const TypeListing = (data: 'create' | 'edit' | 'resubmit') => {
  const {dispatch} = getRedux();
  dispatch({type: TYPE_LISTING, payload: data});
};

// Home screen actions
export const setCategories = (categories: any[]) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_CATEGORIES, payload: categories});
};

export const setRecommendedProducts = (products: any[]) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_RECOMMENDED_PRODUCTS, payload: products});
};

export const setDiscountedProducts = (products: any[]) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_DISCOUNTED_PRODUCTS, payload: products});
};

export const setProductsByCategory = (products: any[]) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_PRODUCTS_BY_CATEGORY, payload: products});
};

export const setLoading = (loading: {
  categories: boolean;
  products: boolean;
  discountedItems: boolean;
}) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_LOADING, payload: loading});
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
      console.log('❌ [LISTING_STATUS_CHANGE] API Error:', error);
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

      // Dispatch recommended products to Redux
      if (res?.foods) {
        setRecommendedProducts(res.foods);
      }
    })
    .catch(error => {
      console.log('❌ [GET_ALL_FOOD] API Error:', error);

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
      console.log('❌ [GET_FOOD_BY_ID] API Error:', error);

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

      // Dispatch products by category to Redux
      if (res?.foods) {
        setProductsByCategory(res.foods);
      }
    })
    .catch(error => {
      console.log('❌ [GET_FOOD_BY_CATOGERY_ID] API Error:', error);

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
      // console.log('res', JSON.stringify(res?.foods, null, 2));

      // Dispatch discounted products to Redux
      if (res?.food) {
        setDiscountedProducts(res.food);
      }
    })
    .catch(error => {
      console.log('❌ [GET_DISCOUNTED_PRICE] API Error:', error);

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
      console.log('❌ [GET_ALL_PRODUCT_CART] API Error:', error);

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
      console.log('❌ [ADD_TO_CART] API Error:', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const REMOVE_ITEM_FROM_CART = (
  id: string | undefined,
  callback: TCallback<ICommonResponse | FModelListing>,
) => {
  const {method, url} = API.REMOVE_FROM_CART;
  console.log('url', ENV.base_url + url);

  Api.request({method, url: url + id})
    .then((res: FModelListing) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [REMOVE_ITEM_FROM_CART] API Error:', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const UPDATE_CART = (
  data: any,
  callback: TCallback<ICommonResponse | FModelListing>,
) => {
  const {method, url} = API.UPDATE_CART;
  console.log('url', ENV.base_url + url);
  Api.request({method, url, data})
    .then((res: FModelListing) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [UPDATE_CART] API Error:', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const CLEAR_CART = (
  data: any,
  callback: TCallback<ICommonResponse | FModelListing>,
) => {
  const {method, url} = API.CLEAR_CART;
  console.log('url', ENV.base_url + url);
  Api.request({method, url, data})
    .then((res: FModelListing) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [CLEAR_CART] API Error:', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// get Filter Products
export const GET_FILTERED_PRODUCTS = (
  price: any,
  search: any,
  category: any,
  ratings: any,
  callback: TCallback<ICommonResponse | FModelListing>,
) => {
  const {method, url} = API.GET_FILTERED_PRODUCT;
  const finalUrl = `price=${price}&search=${search}&category=${category}&ratings=${ratings}`;

  console.log('url', ENV.base_url + url + finalUrl);
  Api.request({method, url: url + finalUrl})
    .then((res: FModelListing) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [GET_FILTERED_PRODUCTS] API Error:', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};
