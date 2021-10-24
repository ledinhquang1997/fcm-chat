import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga)


store.subscribe(() => {
  localStorage.setItem('TOKEN', store.getState().auth.accessToken);
});

export default store;
