import {getRedux} from '../../../Redux/function';
import {TListing, Tloading} from './actions';
import API from '../../../config/API';
import Api from '../../../Service/Api';
import {ICommonResponse, TCallback} from '../types';
import {showSnackbar} from '../../../Components/Snackbar';
import {getError} from '../../../config/function';
// import crashlytics from '@react-native-firebase/crashlytics';

export const CREATE_LISTING = 'CREATE_LISTING';
export const CAR_LISTING_LOADING = 'CAR_LISTING_LOADING';
export const MAKE_MODEL_CREATE_LISTING = 'MAKE_MODEL_CREATE_LISTING';
export const TYPE_LISTING = 'TYPE_LISTING';

export const listingData = (data: Partial<TListing>) => {
  const {dispatch} = getRedux();
  dispatch({type: CREATE_LISTING, payload: data});
};
export const CarlistingLoading = (data: Partial<Tloading>) => {
  const {dispatch} = getRedux();
  dispatch({type: CAR_LISTING_LOADING, payload: data});
};
export const MakeModelListingData = (data: Partial<TListing>) => {
  const {dispatch} = getRedux();
  dispatch({type: MAKE_MODEL_CREATE_LISTING, payload: data});
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
