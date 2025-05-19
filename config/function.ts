import {LayoutAnimation, PermissionsAndroid, ViewStyle} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import {ENV} from './env';
import globalStyles from './globalStyles';
import moment, {Moment} from 'moment';

export const LayoutAnimate = (time: number = 500, cb?: () => void) => {
  LayoutAnimation.configureNext(
    {
      duration: time,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {type: LayoutAnimation.Types.easeInEaseOut},
    },
    cb,
  );
};

export const handleColorOpacity = (c: string, o = 100) => {
  let opacity: string | number = o % 100;
  opacity = opacity > 9 ? opacity : opacity + '0';
  return `${c}${o === 100 ? '' : opacity === 0 ? '00' : opacity}`;
};

export const objectClone = (data: any) => {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const prettierJSON = (...arg: any) => {
  console.log(
    arg
      .map((item: any) =>
        typeof item === 'object' ? JSON.stringify(item, null, 2) : item,
      )
      .join(',  '),
  );
};

export const EnableSnackBar = (
  {data, config}: {data: string; config: ViewStyle},
  success = true,
) => {
  let snackConfig = {
    ...config,
    backgroundColor: success ? globalStyles.Theme.Primary : 'red',
  };
  EventRegister.emit('snackbar', {
    data,
    config: snackConfig,
  });
};

export const hasAndroidPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
};

export const GetArray = (arr: [] | string) =>
  Array.isArray(arr) ? arr : [arr];
export const assetsURL = (url: string) => ({
  uri: ENV.resourceURL + '/' + url,
});

export const getError: (res: any) => string = res =>
  res.response?.data?.message || res.message || 'Something went wrong.';

// export const generateTimeArray = (startDate: string | Moment) => {
//   const timesArray: string[] = [];
//   const currentMoment: Moment = moment();
//   const startMoment: Moment = moment(startDate);

//   let currentHour: number = 0;

//   if (startMoment.isSame(currentMoment, 'day')) {
//     currentHour = currentMoment.hour();
//   }

//   for (let i = currentHour; i < 24; i++) {
//     const formattedTime = startMoment.hour(i).minute(0).format('hh:mm A');
//     timesArray.push(formattedTime);
//   }

//   // If the start date is not the current date, include times for the next day
//   if (!startMoment.isSame(currentMoment, 'day')) {
//     for (let i = 0; i < 24; i++) {
//       const formattedTime = startMoment
//         .clone()
//         .add(1, 'day')
//         .hour(i)
//         .minute(0)
//         .format('hh:mm A');

//       timesArray.push(formattedTime);
//     }
//   }

//   return timesArray;
// };

export const generateTimeArray = (
  startDate: string | Moment,
  availability: {start: string; end: string},
) => {
  const timesArray: string[] = [];
  const availabilityStartMoment: Moment = moment(availability.start, 'hh:mm A');
  const availabilityEndMoment: Moment = moment(availability.end, 'hh:mm A');

  for (
    let currentMoment = availabilityStartMoment;
    currentMoment.isSameOrBefore(availabilityEndMoment);
    currentMoment.add(1, 'hour')
  ) {
    const formattedTime = currentMoment.format('hh:mm A');
    timesArray.push(formattedTime);
  }

  return timesArray;
};

export function capitalizeFirstLetter(str: string | undefined) {
  return str?.replace(/\b\w/g, (match: string) => match?.toUpperCase());
}

const getTimeDifference = (lastActive: string) => {
  const lastActiveTime = new Date(lastActive);
  const currentTime = new Date();
  const timeDifference = Math.abs(currentTime - lastActiveTime);
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const monthsDifference = Math.floor(daysDifference / 30);

  return {hoursDifference, minutesDifference, daysDifference, monthsDifference};
};

export const getFormattedTimeDifference = (lastActive: string | undefined) => {
  const {hoursDifference, minutesDifference, daysDifference, monthsDifference} =
    getTimeDifference(lastActive);

  if (monthsDifference > 0) {
    return `Seen ${monthsDifference} month${
      monthsDifference !== 1 ? 's' : ''
    } ago`;
  } else if (daysDifference > 0) {
    return `Seen ${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
  } else if (hoursDifference === 0 && minutesDifference === 0) {
    return 'Less than a minute ago';
  } else if (hoursDifference === 0) {
    return `Seen ${minutesDifference} minute${
      minutesDifference !== 1 ? 's' : ''
    } ago`;
  } else if (hoursDifference === 1) {
    return '1 hour ago';
  } else {
    return `Seen ${hoursDifference} hour${
      hoursDifference !== 1 ? 's' : ''
    } and ${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
  }
};
