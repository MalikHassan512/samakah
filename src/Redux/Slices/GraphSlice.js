import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCallWithToken} from '../../Services/APIs';

const initialState = {
  loading: false,
  isError: false,
  data: {},
};

export const fetchUserWeightHistory = createAsyncThunk(
  'fetchUserWeightHistory',
  async data => {
    console.log('fetchUserWeightHistory', data.token, data.month, data.year);
    const response = await ApiCallWithToken({
      route: `user-graph/?chart=1&month=${data.month}&year=${data.year}&months=1`,
      verb: 'GET',
      token: data.token,
    });
    return response;
  },
);

const fetchUserWeightHistorySlice = createSlice({
  name: 'fetchUserWeightHistory',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(fetchUserWeightHistory.fulfilled, (state, action) => {
      // console.log('Fulfilled', JSON.stringify(action?.payload));
      state.data = action?.payload;
      state.loading = false;
    });

    builder.addCase(fetchUserWeightHistory.rejected, (state, action) => {
      console.log('rejected', action);
      state.isError = true;
      state.loading = false;
    });
    builder.addCase(fetchUserWeightHistory.pending, (state, action) => {
      console.log('pending', action);
      state.loading = true;
    });
  },
});

export const fetchEvaluationGraphData = createAsyncThunk(
  'fetchEvaluationGraphData',
  async data => {
    console.log('fetchEvaluationGraphData', data.token, data.month, data.year);
    const response = await ApiCallWithToken({
      route: `vertical-user-chart/6?month=9&year=2023`,
      verb: 'GET',
      token: data.token,
    });
    return response;
  },
);

const fetchEvaluationGraphDataSlice = createSlice({
  name: 'fetchEvaluationGraphData',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(fetchEvaluationGraphData.fulfilled, (state, action) => {
      // console.log('Fulfilled', JSON.stringify(action?.payload));

      state.data = action?.payload;
      state.loading = false;
    });

    builder.addCase(fetchEvaluationGraphData.rejected, (state, action) => {
      console.log('rejected', action);
      state.isError = true;
      state.loading = false;
    });
    builder.addCase(fetchEvaluationGraphData.pending, (state, action) => {
      console.log('pending', action);
      state.loading = true;

      state.isError = false;
    });
  },
});

export default {
  fetchUserWeightHistoryReducer: fetchUserWeightHistorySlice.reducer,
  fetchEvaluationGraphDataReducer: fetchEvaluationGraphDataSlice.reducer,
};
