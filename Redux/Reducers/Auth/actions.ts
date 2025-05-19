import {
  ILoginResponse,
  ISignupResponse,
} from '../../../Redux/Reducers/Auth/auth';
import {showSnackbar} from '../../../Components/Snackbar';
import {ICommonResponse, TCallback} from '../../../Redux/Reducers/types';
import {getRedux} from '../../../Redux/function';
import Api from '../../../Service/Api';
import API from '../../../config/API';
import {getError} from '../../../config/function';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGIN = 'USER_LOGIN';
export const BOARDING_COMPLETE = 'BOARDING_COMPLETE';
export const USER_TYPE = 'USER_TYPE';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const RESET_LOCATION = 'RESET_LOCATION';
export const ONLINE_USERS = 'ONLINE_USERS';
export const FCM_TOKEN = 'FCM_TOKEN';
export const FCM_TOKEN_DELETE = 'FCM_TOKEN_DELETE';

export const BOARDING = () => {
  const {dispatch} = getRedux();
  dispatch({type: BOARDING_COMPLETE});
};
export const SElECTED_USER = (data: 'renter' | 'owner') => {
  const {dispatch} = getRedux();
  dispatch({type: USER_TYPE, payload: data});
};

export const USER_UPDATE_LOCATION = (
  area: string,
  latitude: number,
  longitude: number,
): any => {
  const {dispatch} = getRedux();
  dispatch({type: UPDATE_LOCATION, payload: {area, latitude, longitude}});
};
export const USER_RESET_LOCATION = () => {
  const {dispatch} = getRedux();
  dispatch({type: RESET_LOCATION});
};

export const LOGIN = (
  userType: string | null,
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
      if (res !== undefined) {
        if (res?.user?.role !== userType) {
          showSnackbar({
            type: 'error',
            header: 'Unauthorized Access',
            body: `Only ${userType} can login here.`,
          });
        } else {
          dispatch({type: USER_LOGIN, payload: res});
          showSnackbar({
            type: 'success',
            header: 'Success',
            body: 'Login Successful.',
            interval: 1000,
          });
        }
      }
    })
    .catch(error => {
      // crashlytics().log('LOGIN: LOGIN USER.');
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:02]', error);
      showSnackbar({
        type: 'error',
        header: 'Error',
        body: getError(error),
      });

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
  // console.log('signup data', JSON.stringify(data, null, 2));
  const {method, url} = API.SIGNUP;
  console.log('url', url);
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
      console.log('📢 [Auth.ts:03]', error);
      // crashlytics().log('FORGOT_PASSWORD: FORGOT PASSWORD.');
      // crashlytics().recordError(error);
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
  Api.request({method, url: url + data?.id, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [Auth.ts:05]', error);
      // crashlytics().log('CHANGE_PASSWORD: CHANGE PASSWORD.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const UPDATE_USER = (
  userId: string,
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  console.log(JSON.stringify(data, null, 2), 'data---');

  const {dispatch} = getRedux();
  const {method, url} = API.UPDATE_USER_BY_ID;
  Api.formRequest({method, url: url + userId, data})
    .then((res: ILoginResponse) => {
      dispatch({type: USER_LOGIN, payload: res});
      callback(res);
      console.log('updated user', JSON.stringify(res, null, 2), 'res');
    })
    .catch(error => {
      console.log('📢 [Auth.ts:06]', error);
      // crashlytics().log('UPDATE_USER: UPDATE USER.');
      // crashlytics().recordError(error);
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
  const {dispatch} = getRedux();
  const {method, url} = API.ADD_ADDRESS;
  Api.request({method, url: url + userId, data})
    .then((res: ILoginResponse) => {
      dispatch({type: USER_LOGIN, payload: res});
      callback(res);
    })
    .catch(error => {
      console.log('📢 [Auth.ts:010]', error);
      // crashlytics().log('ADD_USER_ADDRESS: ADD USER ADDRESS.');
      // crashlytics().recordError(error);
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
  const {dispatch} = getRedux();
  const {method, url} = API.DELETE_USER_BY_ID;
  Api.request({method, url: url + data})
    .then((res: ICommonResponse) => {
      dispatch({
        type: USER_LOGOUT,
      });
      callback(res);
    })
    .catch(error => {
      console.log('📢 [Auth.ts:07]', error);
      // crashlytics().log('DELETE_USER: DELETE USER.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_USER = (data: any, callback: TCallback<ICommonResponse>) => {
  const {dispatch} = getRedux();
  const {method, url} = API.GET_USER_BY_ID;

  Api.request({method, url: url + data})
    .then((res: ICommonResponse) => {
      dispatch({type: USER_LOGIN, payload: res});
      callback(res);
    })
    .catch(error => {
      console.log('📢 [Auth.ts:03]', error);
      // crashlytics().log('GET_USER: GET USER.');
      // crashlytics().recordError(error);
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
      console.log('📢 [Auth.ts:Argyle token]', error);
      // crashlytics().log('GET_ARGYLE_TOKEN: GET ARGYLE TOKEN.');
      // crashlytics().recordError(error);
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
      console.log('📢 [Auth.ts:Argyle ADD_CONNECTED_ACCOUNTS]', error);
      // crashlytics().log('ADD_CONNECTED_ACCOUNTS: GET CONNECTED ACCOUNTS.');
      // crashlytics().recordError(error);
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
  Api.request({method, url: url + userId, data: {accountId: data?.accountId}})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [Auth.ts:Argyle REMOVE_REVOKED_ACCOUNTS]', error);
      // crashlytics().log('REMOVE_REVOKED_ACCOUNTS: REMOVE REVOKED ACCOUNTS.');
      // crashlytics().recordError(error);
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
  const {dispatch} = getRedux();
  const {method, url} = API.NOTIFICATION_SETTING;
  Api.request({method, url: url + userId, data})
    .then((res: ILoginResponse) => {
      dispatch({type: USER_LOGIN, payload: res});
      callback(res);
    })
    .catch(error => {
      console.log('📢 [Auth.ts:0100]', error);
      // crashlytics().log(
      //   'NOTIFICATION_SETTING: CHANGE USER NOTIFICATION SETTING.',
      // );
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};
