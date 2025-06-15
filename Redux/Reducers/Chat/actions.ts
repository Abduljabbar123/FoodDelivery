import {showSnackbar} from '../../../components/Snackbar';
import {ICommonResponse, TCallback} from '../../../Redux/Reducers/types';
import Api from '../../../Service/Api';
import API from '../../../config/API';
import {getError} from '../../../config/function';
// import crashlytics from '@react-native-firebase/crashlytics';

export const GET_All_CHAT = (callback: TCallback<ICommonResponse>) => {
  const {method, url} = API.GET_ALL_CHAT;
  try {
    Api.request({method, url})
      .then(res => {
        callback(res);
      })
      .catch(error => {
        // crashlytics().log('GET_All_CHAT: GET ALL CHATS.');
        // crashlytics().recordError(error);
        showSnackbar({
          type: 'error',
          body: getError(error),
          header: 'Error',
        });
        callback({
          success: false,
          message: error.message,
        });
      });
  } catch (error: any) {
    // crashlytics().log('GET_All_CHAT: GET ALL CHATS.');
    // crashlytics().recordError(error);
    console.log('Get all chats => ', error);
  }
};

export const GET_CHAT = (data: any, callback: TCallback<ICommonResponse>) => {
  const {method, url} = API.GET_CHAT;
  try {
    Api.request({method, url, data})
      .then((res: ICommonResponse) => {
        callback(res);
      })
      .catch(error => {
        // crashlytics().log('GET_CHAT: GET A SINGLE CHAT.');
        // crashlytics().recordError(error);
        showSnackbar({
          type: 'error',
          body: getError(error),
          header: 'Error',
        });
        callback({
          success: false,
          message: error.message,
        });
      });
  } catch (error: any) {
    // crashlytics().log('GET_CHAT: GET A SINGLE CHAT.');
    // crashlytics().recordError(error);
    console.log('GET_CHAT => ', error);
  }
};

export const BLOCK_USER_CHAT = (
  id: string | undefined,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.BLOCK_USER_CHAT;
  try {
    Api.request({method, url: url + id})
      .then((res: ICommonResponse) => {
        console.log('res wwwwss ', JSON.stringify(res, null, 2));
        callback(res);
      })
      .catch(error => {
        showSnackbar({
          type: 'error',
          body: getError(error),
          header: 'Error',
        });
        callback({
          success: false,
          message: error.message,
        });
      });
  } catch (error: any) {
    console.log('GET_CHAT => ', error);
  }
};

export const UNBLOCK_USER_CHAT = (
  id: string,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.UNBLOCK_USER_CHAT;
  try {
    Api.request({method, url: url + id})
      .then((res: ICommonResponse) => {
        callback(res);
      })
      .catch(error => {
        showSnackbar({
          type: 'error',
          body: getError(error),
          header: 'Error',
        });
        callback({
          success: false,
          message: error.message,
        });
      });
  } catch (error: any) {
    console.log('GET_CHAT => ', error);
  }
};
