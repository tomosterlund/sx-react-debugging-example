import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  calendarData: [],
  error: 'idle',
  dataLoading: false,
};

export const getCalendarData = createAsyncThunk(
  'common/getCalendarData',
  async (num) => {
    const res = await fetch(
      'https://calendar-backend-z9ki.onrender.com/calendar/' + num
    );
    return await res.json();
  }
);

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getCalendarData.pending, (state) => {
        state.dataLoading = 'loading';
        state.error = null;
      })
      .addCase(getCalendarData.fulfilled, (state, action) => {
        state.dataLoading = 'success';
        state.calendarData = action.payload;
      })
      .addCase(getCalendarData.rejected, (state, action) => {
        state.dataLoading = 'failed';
        state.error = action.payload;
      }),
});

export const calendarData = (state) => state.common.calendarData;
export const dataLoading = (state) => state.common.dataLoading;

export default commonSlice.reducer;
