import {getRedux} from '../../../Redux/function';
import {FCatogerylListing} from './actions';
import API from '../../../config/API';
import Api from '../../../Service/Api';
import {ICommonResponse, TCallback} from '../types';
import {showSnackbar} from '../../../components/Snackbar';
import {getError} from '../../../config/function';
import {setCategories} from '../FoodListing/action';

export const CREATE_LISTING = 'CREATE_LISTING';
export const TYPE_LISTING = 'TYPE_LISTING';

export const listingData = (data: Partial<FCatogerylListing>) => {
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
      console.log('❌ [LISTING_STATUS_CHANGE] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
    });
};

export const GET_ALL_CATOGERIES = (
  callback: TCallback<Partial<FCatogerylListing>>,
) => {
  const {method, url} = API.GET_ALL_CATOGERIES;
  Api.request({
    method,
    url: url,
  })
    .then((res: FCatogerylListing) => {
      callback(res);
      const {dispatch} = getRedux();
      dispatch({type: CREATE_LISTING, payload: res});

      // Also dispatch to FoodListing reducer for home screen persistence
      if (res?.categories) {
        setCategories(res.categories);
      }
    })
    .catch(error => {
      console.log('❌ [GET_ALL_CATOGERIES] API Error:', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_CATOGERIES_BY_ID = (
  callback: TCallback<Partial<FCatogerylListing>>,
) => {
  const {method, url} = API.GET_CATOGERY_BY_ID;
  Api.request({
    method,
    url: url,
  })
    .then((res: FCatogerylListing) => {
      callback(res);
      console.log('res', JSON.stringify(res, null, 2));
    })
    .catch(error => {
      console.log('❌ [GET_CATOGERIES_BY_ID] API Error:', error);

      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};
