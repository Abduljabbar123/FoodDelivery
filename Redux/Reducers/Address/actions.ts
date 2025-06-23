import {IAddressResponse, IAddressRequest} from './actions.d';
import {showSnackbar} from '../../../components/Snackbar';
import {TCallback} from '../../Reducers/types';
import {getRedux} from '../../function';
import Api from '../../../Service/Api';
import API from '../../../config/API';
import {getError} from '../../../config/function';

// Action Types
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const GET_ADDRESSES = 'GET_ADDRESSES';
export const GET_ADDRESS_BY_ID = 'GET_ADDRESS_BY_ID';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const SET_DEFAULT_ADDRESS = 'SET_DEFAULT_ADDRESS';
export const GET_DEFAULT_ADDRESS = 'GET_DEFAULT_ADDRESS';
export const SET_ADDRESS_LOADING = 'SET_ADDRESS_LOADING';
export const CLEAR_ADDRESSES = 'CLEAR_ADDRESSES';

// Add a new address
export const addAddress = (
  data: IAddressRequest,
  callback: TCallback<IAddressResponse>,
) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_ADDRESS_LOADING, payload: true});

  const {method, url} = API.ADDRESSES;
  Api.request({method, url, data})
    .then((res: IAddressResponse) => {
      dispatch({type: ADD_ADDRESS, payload: res.address});
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      callback(res);
      showSnackbar({
        type: 'success',
        header: 'Success',
        body: 'Address added successfully',
        interval: 1000,
      });
    })
    .catch(error => {
      console.log('❌ [ADD_ADDRESS] API Error:', error);
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// Get all addresses for the authenticated user
export const getAddresses = (callback: TCallback<IAddressResponse>) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_ADDRESS_LOADING, payload: true});

  const {method, url} = API.GET_ADDRESSES;
  Api.request({method, url})
    .then((res: IAddressResponse) => {
      dispatch({type: GET_ADDRESSES, payload: res.addresses});
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      callback(res);
    })
    .catch(error => {
      console.log('❌ [GET_ADDRESSES] API Error:', error);
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// Get a specific address by ID
export const getAddressById = (
  addressId: string,
  callback: TCallback<IAddressResponse>,
) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_ADDRESS_LOADING, payload: true});

  const {method, url} = API.GET_ADDRESS_BY_ID;
  Api.request({method, url: url + addressId})
    .then((res: IAddressResponse) => {
      dispatch({type: GET_ADDRESS_BY_ID, payload: res.address});
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      callback(res);
    })
    .catch(error => {
      console.log('❌ [GET_ADDRESS_BY_ID] API Error:', error);
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// Update an address
export const updateAddress = (
  addressId: string,
  data: IAddressRequest,
  callback: TCallback<IAddressResponse>,
) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_ADDRESS_LOADING, payload: true});

  const {method, url} = API.UPDATE_ADDRESS;
  Api.request({method, url: url + addressId, data})
    .then((res: IAddressResponse) => {
      dispatch({type: UPDATE_ADDRESS, payload: res.address});
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      callback(res);
      showSnackbar({
        type: 'success',
        header: 'Success',
        body: 'Address updated successfully',
        interval: 1000,
      });
    })
    .catch(error => {
      console.log('❌ [UPDATE_ADDRESS] API Error:', error);
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// Delete an address (soft delete)
export const deleteAddress = (
  addressId: string,
  callback: TCallback<IAddressResponse>,
) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_ADDRESS_LOADING, payload: true});

  const {method, url} = API.DELETE_ADDRESS;
  Api.request({method, url: url + addressId})
    .then((res: IAddressResponse) => {
      dispatch({type: DELETE_ADDRESS, payload: addressId});
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      callback(res);
      showSnackbar({
        type: 'success',
        header: 'Success',
        body: 'Address deleted successfully',
        interval: 1000,
      });
    })
    .catch(error => {
      console.log('❌ [DELETE_ADDRESS] API Error:', error);
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// Set an address as default
export const setDefaultAddress = (
  addressId: string,
  callback: TCallback<IAddressResponse>,
) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_ADDRESS_LOADING, payload: true});

  const {method, url} = API.SET_DEFAULT_ADDRESS;
  Api.request({method, url: url + addressId + '/default'})
    .then((res: IAddressResponse) => {
      // Update addresses array to mark the selected address as default
      dispatch({type: SET_DEFAULT_ADDRESS, payload: addressId});

      // Also update the defaultAddress field with the address object if available
      if (res.address) {
        dispatch({type: GET_DEFAULT_ADDRESS, payload: res.address});
      }

      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      callback(res);
      showSnackbar({
        type: 'success',
        header: 'Success',
        body: 'Default address updated successfully',
        interval: 1000,
      });
    })
    .catch(error => {
      console.log('❌ [SET_DEFAULT_ADDRESS] API Error:', error);
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// Get default address
export const getDefaultAddress = (callback: TCallback<IAddressResponse>) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_ADDRESS_LOADING, payload: true});

  const {method, url} = API.GET_DEFAULT_ADDRESS;
  Api.request({method, url})
    .then((res: IAddressResponse) => {
      dispatch({type: GET_DEFAULT_ADDRESS, payload: res.address});
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      callback(res);
    })
    .catch(error => {
      console.log('❌ [GET_DEFAULT_ADDRESS] API Error:', error);
      dispatch({type: SET_ADDRESS_LOADING, payload: false});
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// Clear addresses (for logout)
export const clearAddresses = () => {
  const {dispatch} = getRedux();
  dispatch({type: CLEAR_ADDRESSES});
};

// Set loading state
export const setAddressLoading = (loading: boolean) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_ADDRESS_LOADING, payload: loading});
};
