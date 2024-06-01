import { configureStore, Reducer } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { reduxBatch } from '@manaflair/redux-batch';
import { persistStore } from 'redux-persist';
import { rootReducer, rootSaga } from './RootReducer';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer as Reducer<any, any>,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(reduxBatch),
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
