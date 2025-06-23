import {
  BOARDING_COMPLETE,
  USER_LOGIN,
  FCM_TOKEN,
  FCM_TOKEN_DELETE,
  USER_LOGOUT,
  USER_TYPE,
  UPDATE_LOCATION,
  RESET_LOCATION,
  ONLINE_USERS,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PHOTO,
  SET_USER_LOADING,
} from './actions';
import {TAuth} from '../types';

const initialState: TAuth = {
  isLoggedIn: false,
  boarded: false,
  user: null,
  token: null,
  userType: null,
  fcm_token: null,
  updateLocation: {
    area: null,
    longitude: null,
    latitude: null,
  },
  onlineUsers: null,
  userLoading: false,
};

const authReducers = (state: TAuth = initialState, action: any): TAuth => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
        fcm_token: null,
        userLoading: false,
      };
    case BOARDING_COMPLETE:
      return {
        ...state,
        boarded: true,
      };
    case USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        updateLocation: action.payload,
      };
    case RESET_LOCATION:
      return {
        ...state,
        updateLocation: {
          area: null,
          longitude: null,
          latitude: null,
        },
      };
    case ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload,
      };
    case FCM_TOKEN:
      return {
        ...state,
        fcm_token: action.payload,
      };
    case FCM_TOKEN_DELETE:
      return {
        ...state,
        fcm_token: null,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER_PHOTO:
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              photo: action.payload,
            }
          : null,
      };
    case SET_USER_LOADING:
      return {
        ...state,
        userLoading: action.payload,
      };
    default:
      return state;
  }
};

export default authReducers;
