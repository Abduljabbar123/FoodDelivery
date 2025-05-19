import {showSnackbar} from '../../../Components/Snackbar';
import {ICommonResponse, TCallback} from '../../../Redux/Reducers/types';
import {getRedux} from '../../../Redux/function';
import Api from '../../../config/Api';
import API from '../../../config/API';
import {getError} from '../../../config/function';
import {RentalCarDetail, RentalCarDetails} from './RentalCarDetail';
import axios from 'axios';
import {MakeModelListingData} from '../CreateListing/action';
import {ENV} from '../../../config/env';
// import crashlytics from '@react-native-firebase/crashlytics';

export const USER_CAR_FILTER_DATA = 'USER_CAR_FILTER_DATA';
export const USER_PENDING_PAYMENTS = 'USER_PENDING_PAYMENTS';

export const GET_CARS_LIST = (
  data: {
    page?: number;
    minCost?: string;
    maxCost?: string;
    distance?: string;
    make?: string;
    model?: string;
    year?: string;
    search?: string;
    lat: number | null;
    lng: number | null;
  },
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.GET_CAR_LIST;
  const filter: any = {
    price_per_day: {
      min: data?.minCost ? parseInt(data?.minCost, 10) : '',
      max: data?.maxCost ? parseInt(data?.maxCost, 10) : '',
    },
    distance: data?.distance,
    make: data?.make,
    model: data?.model,
    year: data?.year,
    location: {
      lat: data?.lat,
      lng: data?.lng,
    },
  };
  // Remove undefined, null, or empty values from the filter object
  const cleanFilter = (obj: any) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        cleanFilter(obj[key]);
      }
    });
  };

  cleanFilter(filter);
  console.log('page ----- ', data?.page);
  const filterString = JSON.stringify(filter);
  Api.request({
    method,
    url: `${url}?page=${data?.page}&count=20&search=${
      !data?.search ? '' : data?.search
    }&filters=${filterString}`,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:001]', error);
      // crashlytics().log('GET_CARS_LIST: GET CAR LIST.');
      // crashlytics().recordError(error);
      // showSnackbar({
      //   type: 'error',
      //   body: getError(error),
      //   header: 'Error',
      // });
      callback({success: false, message: error.message});
    });
};

export const GET_SIMILAR_CARS_LIST = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.GET_SIMILAR_CAR;
  Api.request({
    method,
    url: `${url}${data}`,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:006]', error);
      // crashlytics().log('GET_SIMILAR_CARS_LIST: GET SIMILAR CAR LIST.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_CAR_By_ID = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.GET_CAR_By_ID;
  Api.request({
    method,
    url: `${url}${data}`,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:002]', error);
      // crashlytics().log('GET_CAR_By_ID: GET CAR BY ID.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_FILTERS = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {dispatch} = getRedux();
  const {method, url} = API.GET_FILTERS;
  Api.request({method, url, data})
    .then((res: ICommonResponse) => {
      callback(res);
      const saveData = {
        minPrice: res?.filters?.carPrice?.min,
        maxPrice: res?.filters?.carPrice?.max,
        maxDistance: res?.filters?.carMaxDistance,
      };
      dispatch({type: USER_CAR_FILTER_DATA, payload: saveData});
    })
    .catch(error => {
      console.log('📢 [actions.ts:003]', error);
      // crashlytics().log('GET_FILTERS: GET CAR FILTERS.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const CALCULATE_CAR_RENTAL = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.CALCULATE_CAR_RENTAL;
  Api.request({method, url: url, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:050]', error);
      // crashlytics().log('CALCULATE_CAR_RENTAL: CAR RENTAL CHARGES CALCULATOR.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const CREATE_CAR_RENTAL = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.CAR_RENTAL;
  Api.request({method, url, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:0073]', error);
      // crashlytics().log('CREATE_CAR_RENTAL: CREATE CAR RENTAL.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_CAR_RENTAL_STATUS = (
  status: 'active' | 'pending' | 'completed',
  callback: TCallback<Partial<RentalCarDetails>>,
) => {
  const {method, url} = API.GET_CAR_RENTAL_STATUS;
  Api.request({method, url: url + `?status=${status}`})
    .then((res: RentalCarDetails) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:140]', error);
      // crashlytics().log('GET_CAR_RENTAL_STATUS: GET CAR RENTAL STATUS.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};
export const GET_OWNER_CAR_RENTAL_STATUS = (
  status: 'active' | 'pending' | 'completed',
  callback: TCallback<Partial<RentalCarDetails>>,
) => {
  const {method, url} = API.GET_OWNER_CAR_RENTAL_STATUS;
  Api.request({
    method,
    url: url + `?status=${status}&sort=createdAt&sortOrder=desc`,
  })
    .then((res: RentalCarDetails) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:140]', error);
      // crashlytics().log(
      //   'GET_OWNER_CAR_RENTAL_STATUS: GET CAR RENTAL STATUS BY OWNER.',
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

export const GET_CAR_RENTAL_DETAILS = (
  id: string,
  callback: TCallback<Partial<RentalCarDetail>>,
) => {
  const {method, url} = API.GET_CAR_RENTALS_DETAILS;
  Api.request({method, url: url + id})
    .then((res: RentalCarDetail) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:140]', error);
      // crashlytics().log('GET_CAR_RENTAL_DETAILS: GET CAR RENTAL BY ID.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
    });
  callback({success: false});
};

// first upload images send path of images to CAR_RENTAL_IMAGE API

export const UPLOAD_CAR_IMAGE = (
  data: any,
  callback: TCallback<Partial<RentalCarDetail>>,
) => {
  const {method, url} = API.UPLOAD_CAR_PICS;
  Api.formRequest({method, url, data})
    .then((res: RentalCarDetail) => {
      callback(res);
      console.log('resres ee ', res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:141]', error);
      // crashlytics().log('UPLOAD_CAR_IMAGE: UPLOAD CAR PICTURES.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
    });
  callback({
    success: false,
  });
};

export const CAR_RENTAL_IMAGE = (
  data: any,
  carId: string | undefined,
  callback: TCallback<Partial<RentalCarDetail>>,
) => {
  const {method, url} = API.RENTAL_IMAGE;
  Api.request({method, url: url + carId, data})
    .then((res: RentalCarDetail) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:140]', error);
      // crashlytics().log(
      //   'CAR_RENTAL_IMAGE: ADD CAR RENTALS PICTURES BY RENTER.',
      // );
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
    });
  callback({
    success: false,
  });
};

export const EXTEND_CAR_RENTAL = (
  data: any,
  carRentalId: string | undefined,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.EXTEND_CAR_RENTAL;
  Api.request({method, url: url + carRentalId, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:050]', error);
      // crashlytics().log('EXTEND_CAR_RENTAL: EXTEND CAR RENTAL BY RENTER.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_OWNER_CAR_RENTAL = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.GET_OWNER_CAR_RENTAL;
  Api.request({
    method,
    url: `${url}${data}`,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:026]', error);
      // crashlytics().log(
      //   'GET_OWNER_CAR_RENTAL: GET LIST OF RENTAL ON OWNER SIDE.',
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

export const GET_CAR_INSURANCE_FEE = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.GET_CAR_INSURANCE_FEE;
  Api.request({
    method,
    url: url + data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:026]', error);
      // crashlytics().log('GET_CAR_INSURANCE_FEE: GET CAR INSURANCE FEE BY CAR.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const GET_LATE_FEE = (callback: TCallback<ICommonResponse>) => {
  const {method, url} = API.GET_LATE_FEE;
  Api.request({
    method,
    url: url,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:02]', error);
      // crashlytics().log('GET_LATE_FEE: GET LATE FEE.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// export const GET_RENTAL_LATE_FEE_DETAILS = (
//   id: string,
//   callback: TCallback<ICommonResponse>,
// ) => {
//   const {method, url} = API.GET_RENTAL_LATE_FEE_DETAILS;
//   Api.request({
//     method,
//     url: url + id,
//   })
//     .then((res: ICommonResponse) => {
//       callback(res);
//     })
//     .catch(error => {
//       console.log('📢 [actions.ts:027]', error);
//       showSnackbar({
//         type: 'error',
//         body: getError(error),
//         header: 'Error',
//       });
//       callback({success: false, message: error.message});
//     });
// };

export const IS_CAR_RENTAL_EXTENDABLE = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.IS_CAR_RENTAL_EXTENDABLE;
  Api.request({
    method,
    url: url + data?.rentalId + '/' + data?.date,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:028]', error);
      // crashlytics().log(
      //   'IS_CAR_RENTAL_EXTENDABLE: CHECK CAR AVAILABILITY TO EXTEND RENTAL.',
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

// Car owner api
export const CAR_LIST_BY_OWNER = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.CAR_LIST_BY_OWNER;
  // console.log(
  //   '👉👉👉 ~ file: actions.ts:378 ~ CAR_LIST_BY_OWNER:',
  //   `${url}?search=${data?.search || ''}&sort=createdAt&sortOrder=desc&page=${
  //     data?.pageList
  //   }&count=20`,
  // );
  Api.request({
    method,
    url: `${url}?search=${
      data?.search || ''
    }&sort=createdAt&sortOrder=desc&page=${data?.pageList}&count=20`,
    // data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log('CAR_LIST_BY_OWNER: GTE CAR LIST BY OWNER.');
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:022]', error);
      // showSnackbar({
      //   type: 'error',
      //   body: getError(error),
      //   header: 'Error',
      // });
      callback({success: false, message: error.message});
    });
};
export const GET_OWNER_FINANCIAL_DATA = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.GET_OWNER_FINANCIAL_ENDPOINTS;
  Api.request({
    method,
    url,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:33]', error);
      // crashlytics().log(
      //   'GET_OWNER_FINANCIAL_DATA: GTE CAR OWNER FINANCIAL IN TRANSACTIONS.',
      // );
      // crashlytics().recordError(error);
      // showSnackbar({
      //   type: 'error',
      //   body: getError(error),
      //   header: 'Error',
      // });
      callback({success: false, message: error.message});
    });
};
export const CREATE_CAR_MAKE_MODEL = async (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  try {
    const response = await axios.get(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
    );
    const formattedData = response?.data?.Results?.map(
      (result: {MakeName: any; MakeId: any}) => ({
        key: result.MakeId,
        value: result.MakeName,
      }),
    );
    MakeModelListingData(formattedData);
    return callback(response?.data);
  } catch (error: any) {
    // crashlytics().log(
    //   'CREATE_CAR_MAKE_MODEL: GTE MAKES FOR VEHICLE TYPE CAR(JSON).',
    // );
    // crashlytics().recordError(error);
    console.error('Error fetching car makes:', error);
    throw error;
  }
};
export const GET_ADDRESS_BY_LAT_LONG = async (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data?.latitude},${data?.longitude}&sensor=true&key=${ENV?.googleAPI}`,
    );
    return callback(response?.data);
  } catch (error: any) {
    console.error('Error fetching car makes:', error);
    // crashlytics().log('GET_ADDRESS_BY_LAT_LONG: GOOGLE MAPS API GEOCODE.');
    // crashlytics().recordError(error);
    throw error;
  }
};
export const CREATE_CAR_GET_MODEL = async (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  try {
    const response = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${data.makeId}/modelyear/${data.year}?format=json`,
    );
    const formattedData = response?.data?.Results?.map(
      (result: {Model_Name: any; MakeId: any}) => ({
        label: result.Model_Name,
        value: result.Model_Name,
      }),
    );
    // MakeModelListingData(formattedData);
    return callback(formattedData);
  } catch (error: any) {
    // crashlytics().log(
    //   'CREATE_CAR_GET_MODEL: GET MODEL FOR MAKE ID AND YEAR OF CAR.',
    // );
    // crashlytics().recordError(error);
    console.error('Error fetching car makes:', error);
    throw error;
  }
};
export const CREATE_CAR_OWNER = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.CREATE_CAR_OWNER_SIDE;
  Api.request({method, url, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:003]', error);
      // crashlytics().log('CREATE_CAR_OWNER: LIST CAR BY OWNER.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};
export const UPDATE_OWNER_CAR = (
  data: any,
  id: string,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.UPDATE_OWNER_CAR;
  Api.request({method, url: url + id, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:023]', error);
      // crashlytics().log('UPDATE_OWNER_CAR: UPDATE LISTED CAR BY OWNER.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};
export const CHECK_VIN = (data: any, callback: TCallback<ICommonResponse>) => {
  const {method, url} = API.CHECK_VIN_OWNER_SIDE;
  Api.request({method, url, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:024]', error);
      // crashlytics().log('CHECK_VIN: CHECK CAR VIN DURING CAR LISTING.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};
// Car owner accept rental
export const CAR_RENTAL_ACCEPT = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.CAR_RENTAL_ACCEPT;
  Api.request({
    method,
    url: url + data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:003]', error);
      // crashlytics().log('CAR_RENTAL_ACCEPT: OWNER ACCEPT CAR RENTAL.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const UPLOAD_CAR_OWNER_IMAGES = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.CREATE_CAR_OWNER_IMAGES;
  Api.formRequest({method, url, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:025]', error);
      // crashlytics().log(
      //   'UPLOAD_CAR_OWNER_IMAGES: UPLOAD CAR IMAGES IN CAR LIST.',
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
// Car owner decline rental
export const CAR_RENTAL_DECLINE = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.CAR_RENTAL_DECLINE;
  Api.request({
    method,
    url: url + data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:003]', error);
      // crashlytics().log('CAR_RENTAL_DECLINE: CANCEL CAR RENTAL BY OWNER.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const UPLOAD_CAR_OWNER_DOCS = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.CREATE_CAR_OWNER_DOCS;
  Api.formRequest({method, url, data})
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      callback(error);
      // crashlytics().log(
      //   'UPLOAD_CAR_OWNER_DOCS: UPLOAD CAR DOCUMENTS BY OWNER.',
      // );
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:31]', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// Add car rental pictures by owner (before/after)
export const ADD_CAR_RENTAL_PICTURE_BY_OWNER = (
  id: string,
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.ADD_CAR_RENTAL_PICTURE_BY_OWNER;
  Api.request({
    method,
    url: url + id,
    data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:003]', error);
      // crashlytics().log(
      //   'ADD_CAR_RENTAL_PICTURE_BY_OWNER: ADD CAR RENTAL PICTURES(BEFORE/AFTER) BY OWNER.',
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

// Start rental by owner
export const START_RENTAL_BY_OWNER = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.START_RENTAL_BY_OWNER;
  Api.request({
    method,
    url: url + data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log(
      //   'START_RENTAL_BY_OWNER: ADD CAR RENTAL PICTURES(BEFORE/AFTER) BY OWNER.',
      // );
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:27]', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// Complete rental by owner
export const COMPLETE_RENTAL_BY_OWNER = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.COMPLETE_RENTAL_BY_OWNER;
  Api.request({
    method,
    url: url + data?.carRentalId,
    data: {actual_end_time: data?.actual_end_time},
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log('COMPLETE_RENTAL_BY_OWNER: COMPLETE RENTAL BY OWNER.');
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:030]', error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

// Car owner dashboard
export const CAR_OWNER_DASHBOARD = (callback: TCallback<ICommonResponse>) => {
  const {method, url} = API.CAR_OWNER_DASHBOARD;
  Api.request({
    method,
    url: url,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      console.log('📢 [actions.ts:32]', error);
      // crashlytics().log('CAR_OWNER_DASHBOARD: OWNER DASHBOARD.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: getError(error),
        header: 'Error',
      });
      callback({success: false, message: error.message});
    });
};

export const LATE_FEE_TRANSACTION = (
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.LATE_FEE_TRANSACTION;
  Api.request({
    method,
    url,
    data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log('LATE_FEE_TRANSACTION: LATE FEE IN CAR TRANSACTIONS.');
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:29]', error);
      callback({success: false, message: error.message});
    });
};

export const EXTEND_FEE_TRANSACTION = (
  id: string | undefined,
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.EXTEND_FEE_TRANSACTION;
  Api.request({
    method,
    url: url + id,
    data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log(
      //   'EXTEND_FEE_TRANSACTION: EXTENSION OF RENTAL TRANSACTIONS.',
      // );
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:27]', error);
      callback({success: false, message: error.message});
    });
};

export const ADDITIONAL_FEE_TRANSACTION = (
  id: string | undefined,
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.ADDITIONAL_FEE_TRANSACTION;
  Api.request({
    method,
    url: url + id,
    data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log('ADDITIONAL_FEE_TRANSACTION: PAY ADDITIONAL CHARGES.');
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:020]', error);
      callback({success: false, message: error.message});
    });
};

export const GET_CARS_LIST_OWNER = (callback: TCallback<ICommonResponse>) => {
  const {method, url} = API.GET_CARS_LIST_OWNER;
  Api.request({
    method,
    url: url,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log('GET_CARS_LIST_OWNER: TO GET CAR OWNER LIST FOR EXCHANGE VEHICLE.');
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:021]', error);
      callback({success: false, message: error.message});
    });
};

export const OWNER_EXCHANGE_VEHICLE = (
  id: string | undefined,
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.OWNER_EXCHANGE_VEHICLE;
  Api.request({
    method,
    url: url + id,
    data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log('OWNER_EXCHANGE_VEHICLE: OWNER EXCHANGE VEHICLE OF AN ACTIVE RENTAL.');
      // crashlytics().recordError(error);
      showSnackbar({
        type: 'error',
        body: error?.response?.data?.message,
        header: 'Error',
      });
      callback({
        success: false,
        message: error.response?.data || error.message,
      });
    });
};

export const CHECK_RENTAL_EXCHANGE = (
  id: string | undefined,
  data: any,
  callback: TCallback<ICommonResponse>,
) => {
  const {method, url} = API.CHECK_RENTAL_EXCHANGE;
  Api.request({
    method,
    url: url + id,
    data,
  })
    .then((res: ICommonResponse) => {
      callback(res);
    })
    .catch(error => {
      // crashlytics().log('CHECK_RENTAL_EXCHANGE: FOR CHECKING EXCHANGE VEHICLE DATA.');
      // crashlytics().recordError(error);
      console.log('📢 [actions.ts:023]', error);
      callback({success: false, message: error.message});
    });
};
