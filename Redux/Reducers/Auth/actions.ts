import {
  ILoginResponse,
  ISignupResponse,
  IVerifyEmailResponse,
  VerifyEmailBody,
} from '../../../Redux/Reducers/Auth/auth';
import {showSnackbar} from '../../../components/Snackbar';
import {ICommonResponse, TCallback} from '../../../Redux/Reducers/types';
import {getRedux} from '../../../Redux/function';
import Api from '../../../Service/Api';
import API from '../../../config/API';
import {getError} from '../../../config/function';
import {ENV} from '../../../config/env';

export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_TYPE = 'USER_TYPE';
export const BOARDING_COMPLETE = 'BOARDING_COMPLETE';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const RESET_LOCATION = 'RESET_LOCATION';
export const ONLINE_USERS = 'ONLINE_USERS';
export const FCM_TOKEN = 'FCM_TOKEN';
export const FCM_TOKEN_DELETE = 'FCM_TOKEN_DELETE';

// User Profile specific actions
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const UPDATE_USER_PHOTO = 'UPDATE_USER_PHOTO';
export const SET_USER_LOADING = 'SET_USER_LOADING';

export const BOARDING = () => {
  const {dispatch} = getRedux();
  dispatch({type: BOARDING_COMPLETE});
};

export const SElECTED_USER = (data: 'renter' | 'owner') => {
  const {dispatch} = getRedux();
  dispatch({type: USER_TYPE, payload: data});
};

export const UPDATE_LOCATION_USER = (data: {
  area: string | null;
  latitude: number | null;
  longitude: number | null;
}) => {
  const {dispatch} = getRedux();
  dispatch({type: UPDATE_LOCATION, payload: data});
};

export const RESET_LOCATION_USER = () => {
  const {dispatch} = getRedux();
  dispatch({type: RESET_LOCATION});
};

export const LOGIN = (
  data: any,
  callback: TCallback<
    | (ILoginResponse & {validate?: boolean})
    | (ICommonResponse & {validate?: boolean})
  >,
) => {
  const {dispatch} = getRedux();
  const {method, url} = API.LOGIN;
  Api.request({method, url, data})
    .then((res: ILoginResponse) => {
      callback(res);
      console.log('LOGIN RESPONSE', res);
      if (res !== undefined) {
        console.log('LOGIN RESPONSE', res);
        dispatch({type: USER_LOGIN, payload: res});
        showSnackbar({
          type: 'success',
          header: 'Success',
          body: 'Login Successful.',
          interval: 1000,
        });
      }
    })
    .catch(error => {
      console.log('❌ [LOGIN] API Error:', error);
      callback(error?.response?.data);
    });
};

export const RESENDEMAIL = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.RESEND_EMAIL;
  Api.request({method, url, data})
    .then((res: ICommonResponse) => {
      console.log('RESPONSE RESEND EMAIL', res);
      callback(res);
      showSnackbar({
        type: 'success',
        header: 'Success',
        body: 'Email Sent Successfully',
        interval: 1000,
      });
    })
    .catch(error => {
      console.log('📢 [RESENDEMAIL]', error);
      // crashlytics().log('RESENDEMAIL: RESEND VERIFICATION EMAIL.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const LOGOUT = () => {
  const {dispatch} = getRedux();
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: RESET_LOCATION,
  });
  dispatch({
    type: ONLINE_USERS,
    payload: null,
  });
  // showSnackbar({type: 'error', body: 'Logout Successful', header: 'Logout'});
};

export const SIGN_UP = (
  data: any,
  callback: TCallback<ICommonResponse | ISignupResponse>,
) => {
  console.log('signup data', JSON.stringify(data, null, 2));
  const {method, url} = API.SIGNUP;
  console.log('url', ENV.base_url + url);
  Api.formRequest({method, url, data})
    .then((res: ISignupResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [Auth.ts:01]', error);
      // crashlytics().log('SIGN_UP: SIGNUP USER.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const VERIFY_EMAIL = (
  data: any,
  callback: TCallback<ICommonResponse | ISignupResponse>,
) => {
  console.log('verify-email data', JSON.stringify(data, null, 2));
  const {method, url} = API.VERIFY_EMAIL;
  console.log('url', ENV.base_url + url);
  Api.request({method, url, data})
    .then((res: ISignupResponse) => {
      console.log('res', JSON.stringify(res, null, 2));
      callback(res);
    })
    .catch(error => {
      console.log('📢 VERIFY_EMAIL ERROR', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_VERSION = (
  callback: TCallback<ICommonResponse | ISignupResponse>,
) => {
  const {method, url} = API.GET_MOBILE_VERSION;
  Api.formRequest({method, url})
    .then((res: ISignupResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [Auth.ts:01]', error);
      // crashlytics().log('GET_VERSION: GET MOBILE APP VERSION.');
      // crashlytics().recordError(error);
      callback({success: false, message: error.message});
    });
};

export const FORGOT_PASSWORD = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.FORGOT_PASSWORD;
  Api.request({method, url: url + data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [FORGOT_PASSWORD] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const CHANGE_PASSWORD = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.CHANGE_PASSWORD;
  Api.request({method, url: url + data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [CHANGE_PASSWORD] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const UPDATE_USERPROFILE = (
  userId: string,
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.UPDATE_USER_BY_ID;
  Api.formRequest({method, url: url + userId, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [UPDATE_USERPROFILE] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const ADD_USER_ADDRESS = (
  userId: string,
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.ADD_ADDRESS;
  Api.request({method, url: url + userId, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [ADD_USER_ADDRESS] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const DELETE_USER = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.DELETE_USER_BY_ID;
  Api.request({method, url: url + data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [DELETE_USER] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_USER = (id: any, callback: TCallback<ICommonResponse>) => {
  const {method, url} = API.GET_USER_BY_ID;
  Api.request({method, url: url + id})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [GET_USER] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_ARGYLE_TOKEN = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.GET_ARGYLE_TOKEN;
  Api.request({method, url: url + data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [GET_ARGYLE_TOKEN] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const ADD_CONNECTED_ACCOUNTS = (
  userId: string,
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.ADD_CONNECTED_ACCOUNTS;
  Api.request({method, url: url + userId, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [ADD_CONNECTED_ACCOUNTS] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const REMOVE_REVOKED_ACCOUNTS = (
  userId: string,
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.REMOVE_REVOKED_ACCOUNTS;
  Api.request({method, url: url + userId, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [REMOVE_REVOKED_ACCOUNTS] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const SAVE_FCM_TOKEN = (token = {}) => {
  const {dispatch} = getRedux();
  dispatch({
    type: FCM_TOKEN,
    payload: token,
  });
};

export const DELETE_FCM_TOKEN = () => {
  const {dispatch} = getRedux();
  dispatch({
    type: FCM_TOKEN_DELETE,
  });
};

export const NOTIFICATION_SETTING = (
  userId: string,
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.NOTIFICATION_SETTING;
  Api.request({method, url: url + userId, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('❌ [NOTIFICATION_SETTING] API Error:', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// User Profile actions
export const updateUserProfile = (userData: any) => {
  const {dispatch} = getRedux();
  dispatch({type: UPDATE_USER_PROFILE, payload: userData});
};

export const updateUserPhoto = (photoData: any) => {
  const {dispatch} = getRedux();
  dispatch({type: UPDATE_USER_PHOTO, payload: photoData});
};

export const setUserLoading = (loading: boolean) => {
  const {dispatch} = getRedux();
  dispatch({type: SET_USER_LOADING, payload: loading});
};
