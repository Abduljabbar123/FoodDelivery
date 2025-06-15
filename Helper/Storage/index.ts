// import {Storage} from 'redux-persist';
// import {MMKV} from 'react-native-mmkv';

// const storage = new MMKV();

// // export const reduxStorage: Storage = {
// //   setItem: (key, value) => {
// //     storage.set(key, value);
// //     return Promise.resolve(true);
// //   },
// //   getItem: key => {
// //     const value = storage.getString(key);
// //     return Promise.resolve(value);
// //   },
// //   removeItem: key => {
// //     storage.delete(key);
// //     return Promise.resolve();
// //   },
// // };

// export const reduxStorage: Storage = {
//   setItem: (key, value) => {
//     storage.set(key, JSON.stringify(value));
//     return Promise.resolve(true);
//   },
//   getItem: key => {
//     const value = storage.getString(key);
//     return Promise.resolve(value ? JSON.parse(value) : null);
//   },
//   removeItem: key => {
//     storage.delete(key);
//     return Promise.resolve();
//   },
// };
// Storage/index.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const reduxStorage = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  getItem: async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  removeItem: async key => {
    try {
      await AsyncStorage.removeItem(key);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
