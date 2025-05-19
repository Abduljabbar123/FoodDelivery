import messaging from '@react-native-firebase/messaging';
import {
  GET_VERSION,
  LOGOUT,
  SAVE_FCM_TOKEN,
} from 'src/Redux/Reducers/Auth/actions';
import {showSnackbar} from 'src/Components/Snackbar';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
export const checkAndroidPermission = async () => {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    await PermissionsAndroid.request(permission);
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};

export const checkLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getFcmToken = async () => {
  try {
    const newFcmToken = await messaging().getToken();
    console.log('platform', Platform.OS, '--- fcm token --- ', newFcmToken);
    SAVE_FCM_TOKEN(newFcmToken);
  } catch (err) {
    console.log('FCM Token error:', err);
    // showSnackbar({
    //   type: 'error',
    //   body: getErrorMessage(err),
    //   header: 'Error',
    // });
  }
};

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
};
export const checkForUpdate = async () => {
  const initialAppVersion = '4.0';
  GET_VERSION(user => {
    console.log('user?.version ', user?.version);
    //@ts-ignore
    if (user?.version <= initialAppVersion) {
    } else if (user?.version === undefined || user?.version === '0.0') {
      Alert.alert('Oops, Something went wrong 😓');
    } else {
      Alert.alert(
        'Update Available',
        'A new version of the app is available. Please update to continue using the app.',
        [
          {
            text: 'Update Now',
            onPress: () => {
              LOGOUT();
              Platform.OS === 'ios'
                ? Linking.openURL(
                    'https://apps.apple.com/pk/app/baddour-rentals/id6499253583',
                  )
                : Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.baddour',
                  );
            },
          },
        ],
        {cancelable: false},
      );
    }
  });
};

export const setupNotificationBackgroundHandler = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
    console.log(
      '👉👉👉 ~ file: notificationsService.ts:59 ~ remoteMessage:',
      remoteMessage,
    );
    // showSnackbar({
    //   body: remoteMessage?.notification?.body,
    //   type: 'info',
    //   header: remoteMessage?.notification?.title,
    // });
  });
};
