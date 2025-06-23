import {getRedux} from '../../../Redux/function';
import {FavoriteProduct, TFavoritesState} from './actions.d';
import API from '../../../config/API';
import Api from '../../../Service/Api';
import {ICommonResponse, TCallback} from '../types';
import {showSnackbar} from '../../../components/Snackbar';
import {getError} from '../../../config/function';

// Action Types
export const SET_FAVORITES = 'SET_FAVORITES';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const SET_FAVORITES_LOADING = 'SET_FAVORITES_LOADING';
export const SET_FAVORITES_ERROR = 'SET_FAVORITES_ERROR';

// Action Creators
export const setFavorites = (favorites: FavoriteProduct[]) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_FAVORITES, payload: favorites});
};

export const addToFavorites = (favorite: FavoriteProduct) => {
  const {dispatch} = getRedux();
  dispatch({type: ADD_TO_FAVORITES, payload: favorite});
};

export const removeFromFavorites = (foodId: string) => {
  const {dispatch} = getRedux();
  dispatch({type: REMOVE_FROM_FAVORITES, payload: foodId});
};

export const setFavoritesLoading = (loading: boolean) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_FAVORITES_LOADING, payload: loading});
};

export const setFavoritesError = (error: string | null) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_FAVORITES_ERROR, payload: error});
};

// API Actions
export const GET_ALL_FAVORITES = (
  callback: TCallback<{success: boolean; favorites: FavoriteProduct[]}>,
) => {
  const {method, url} = API.GET_ALL_FAVORITES;

  setFavoritesLoading(true);

  Api.request({
    method,
    url: url,
  })
    .then((res: {success: boolean; favorites: FavoriteProduct[]}) => {
      setFavoritesLoading(false);

      if (res.success && res.favorites) {
        setFavorites(res.favorites);
      }
      callback(res);
    })
    .catch(error => {
      setFavoritesLoading(false);
      console.log('❌ [GET_ALL_FAVORITES] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, favorites: []});
    });
};

export const ADD_PRODUCT_TO_FAVORITES = (
  foodId: string,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.ADD_TO_FAVORITES;

  Api.request({
    method,
    url: url,
    data: {foodId},
  })
    .then((res: ICommonResponse) => {
      if (res.success) {
        // Refresh favorites list after adding
        GET_ALL_FAVORITES(() => {});

        showSnackbar({
          type: 'success',
          body: 'Added to favorites successfully',
          header: 'Success',
        });
      }
      callback(res);
    })
    .catch(error => {
      console.log('❌ [ADD_PRODUCT_TO_FAVORITES] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const REMOVE_PRODUCT_FROM_FAVORITES = (
  foodId: string,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.REMOVE_FROM_FAVORITES;

  Api.request({
    method,
    url: url + foodId,
  })
    .then((res: ICommonResponse) => {
      if (res.success) {
        // Refresh favorites list after removing
        GET_ALL_FAVORITES(() => {});
        removeFromFavorites(foodId);
        showSnackbar({
          type: 'success',
          body: 'Removed from favorites successfully',
          header: 'Success',
        });
      }
      callback(res);
    })
    .catch(error => {
      console.log('❌ [REMOVE_PRODUCT_FROM_FAVORITES] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};
