import { configureStore } from '@reduxjs/toolkit';
import commonSlice from './commonSlice';

export const store = configureStore({
  reducer: {
    common: commonSlice,
  },
});
