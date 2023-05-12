import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { elearningApi } from '../features/api/apiSlice';
import userslice from '../features/user/userslice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import courseSlice from '../features/course/courseSlice';
import cartSlice from '../features/cart/cartSlice';
import alertSlice from '../features/alert/alertSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartSlice,
    user: userslice,
    course: courseSlice,
    alert: alertSlice,
    [elearningApi.reducerPath] : elearningApi.reducer
  },
  middleware : getDefaultMiddleware =>
  getDefaultMiddleware().concat([elearningApi.middleware]),
});

setupListeners(store.dispatch)