// import {applyMiddleware, legacy_createStore as createStore} from 'redux';
// import {persistReducer} from 'redux-persist';
// import persistStore from 'redux-persist/es/persistStore';
// import {thunk} from 'redux-thunk';
// import {reduxStorage} from '../Helper/Storage';
// import reducers from './index';
// import {createLogger} from 'redux-logger';
// // const persistConfig = {
// //   key: 'root_19',
// //   storage: reduxStorage,
// // };

// // const persistedReducer = persistReducer(persistConfig, reducers);
// // let store = createStore(persistedReducer, applyMiddleware(thunk));
// // let persistor = persistStore(store);

// // export {store, persistor};
// // export type RootState = ReturnType<typeof store.getState>;
// // export type AppDispatch = typeof store.dispatch;

// const persistConfig = {
//   key: 'root_19',
//   storage: reduxStorage,
//   // Optional configurations:
//   // whitelist: ['auth'], // persist only these reducers
//   // blacklist: ['tempData'], // don't persist these
//   // stateReconciler: autoMergeLevel2 // advanced state merging
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// // For Redux Thunk 3.x with TypeScript

// // const middleware = [
// //   thunk.withExtraArgument({
// //     /* you can pass extra arguments here if needed */
// //   }),
// // ];

// const store = createStore(persistedReducer, applyMiddleware(thunk));

// const persistor = persistStore(store);

// export {store, persistor};

// // TypeScript types
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// ConfigureStore.js
import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import {persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import {thunk} from 'redux-thunk';
import {reduxStorage} from '../Helper/Storage';
import reducers from './index';

const persistConfig = {
  key: 'root_19',
  storage: reduxStorage,
  // Optional configurations:
  // whitelist: ['auth'], // persist only these reducers
  // blacklist: ['tempData'], // don't persist these
  // stateReconciler: autoMergeLevel2 // advanced state merging
  // timeout: 0, // Set timeout to 0 for long persistence operations
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export {store, persistor};

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
