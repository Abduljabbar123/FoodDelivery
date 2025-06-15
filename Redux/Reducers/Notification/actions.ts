import {showSnackbar} from '../../../components/Snackbar';
import {ICommonResponse, TCallback} from '../../../Redux/Reducers/types';
import Api from '../../../Service/Api';
import API from '../../../config/API';
// import crashlytics from '@react-native-firebase/crashlytics';
import {getError} from '../../../config/function';

export const GET_ALL_NOTIFICATIONS = (callback: TCallback<ICommonResponse>) => {
  const {method, url} = API.GET_ALL_NOTIFICATIONS;
  Api.request({
    method,
    url,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log('GET_ALL_NOTIFICATIONS: GET ALL NOTIFICATIONS.');
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:091]', error);
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
};

export const READ_ALL_NOTIFICATIONS = (
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.READ_ALL_NOTIFICATIONS;
  Api.request({
    method,
    url,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log('READ_ALL_NOTIFICATIONS: READ ALL NOTIFICATIONS.');
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:012]', error);
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
};
