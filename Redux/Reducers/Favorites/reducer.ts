import {
  SET_FAVORITES,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_FAVORITES_LOADING,
  SET_FAVORITES_ERROR,
} from './action';
import {TFavoritesState} from './actions.d';

const initialState: TFavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoritesReducer = (
  state: TFavoritesState = initialState,
  action: any,
): TFavoritesState => {
  switch (action.type) {
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
        error: null,
      };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        error: null,
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          favorite => favorite.food !== action.payload,
        ),
        error: null,
      };
    case SET_FAVORITES_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_FAVORITES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default favoritesReducer;
