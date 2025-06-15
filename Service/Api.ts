import axios from 'axios';
import {showSnackbar} from '../components/Snackbar';
import {ENV} from '../config/env';
import {getRedux} from '../Redux/function';
import {LOGOUT} from '../Redux/Reducers/Auth/actions';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
// import {navigationRef} from '../../../Navigation/navigationRef';
import {request} from 'react-native-permissions';

interface IApi {
  method: string;
  url: string;
  data?: Object;
}
class Api {
  static isConnected: any = true;
  static async checkInternetConnection() {
    try {
      const state: NetInfoState = await NetInfo.fetch();
      Api.isConnected = state.isConnected;
      return Api.isConnected;
    } catch (error) {
      Api.isConnected = false;
      return false;
    }
  }
  static async initializeNetworkListeners() {
    NetInfo.addEventListener((state: NetInfoState) => {
      Api.isConnected = state.isConnected;
      // console.log({state});
    });
  }
  static async request({method, url, data = {}}: IApi) {
    console.log('ENV.base_url + url', ENV.base_url + url);
    await Api.checkInternetConnection();
    if (!Api.isConnected) {
      showSnackbar({
        type: 'error',
        header: 'Network Error',
        body: 'No internet connection',
      });
    } else {
      const {state} = getRedux();
      const {token} = state?.auth;
      console.log('token', token);
      return axios({
        method,
        url: ENV.base_url + url,
        ...(Object.keys(data).length !== 0 && {data: JSON.stringify(data)}),
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          ...(token && {Authorization: `Bearer ${token}`}),
        },
      })
        .then((res: any) => res.data)
        .catch((err: any) => {
          console.log(
            err.response?.data?.user,
            'heeeloo ERROR API REQUEST->',
            err,
          );
          console.log('err.request.status', err.request.status);

          if (err.request.status === 403) {
            LOGOUT();
          }

          if (err.request.status === 418) {
            LOGOUT();
            //@ts-ignore
            navigationRef.navigate('PolicyViolation', {
              data: err.response?.data?.user?.deactivate,
            });
          } else if (err.request.status === 412) {
            //@ts-ignore
            navigationRef.navigate('Verification', {
              email: data?.email,
              loginPage: true,
            });
          } else {
            showSnackbar({
              type: 'error',
              header: 'Error',
              body: err.response?.data?.message,
            });
          }
          // throw err;
        });
    }
  }
  static async formRequest({method, url, data = {}}: IApi) {
    await Api.checkInternetConnection();
    if (!Api.isConnected) {
      showSnackbar({
        type: 'error',
        header: 'Network Error',
        body: 'No internet connection',
      });
    } else {
      const {state} = getRedux();
      const {token} = state?.auth;
      return axios({
        method,
        url: ENV.base_url + url,
        data,
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          ...(token && {Authorization: `Bearer ${token}`}),
        },
      })
        .then((res: any) => res.data)
        .catch((err: any) => {
          console.log('ERROR API formRequest->', err);

          if (err.request.status === 418) {
            LOGOUT();
            //@ts-ignore
            navigationRef.navigate('PolicyViolation', {
              data: err.response?.data?.user?.deactivate,
            });
          }
          throw err;
        });
    }
  }
}
Api.initializeNetworkListeners();
export default Api;
