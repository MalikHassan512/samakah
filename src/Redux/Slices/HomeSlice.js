import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCallWithToken} from '../../Services/APIs';

const initialState = {
  loading: false,
  data: {},
};

export const getBannersData = createAsyncThunk('getBannersData', async data => {
  const response = await ApiCallWithToken({
    route: `customer-banners`,
    verb: 'GET',
    token: data,
  });
  return response;
});

const getBannersDataSlice = createSlice({
  name: 'getBannersData',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(getBannersData.fulfilled, (state, action) => {
      //   console.log('Fulfilled', action?.payload);
      state.data = action?.payload;

      state.loading = false;
    });

    builder.addCase(getBannersData.rejected, (state, action) => {
      console.log('rejected', action);

      state.loading = false;
    });
    builder.addCase(getBannersData.pending, (state, action) => {
      console.log('pending', action);

      state.loading = true;
    });
  },
});

export const fetchCompetitionResults = createAsyncThunk(
  'fetchCompetitionResults',
  async (data, thunkAPI) => {
    console.log('data::>>>', data);
    const response = await ApiCallWithToken({
      route: `user-competitions?location_id=${data?.location_id}&group=${data?.group}`,
      verb: 'GET',
      token: data.token,
    });
    return response;
  },
);

const fetchCompetitionResultsSlice = createSlice({
  name: 'fetchCompetitionResults',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(fetchCompetitionResults.fulfilled, (state, action) => {
      console.log('Fulfilled', action?.payload);
      state.data = action?.payload;

      state.loading = false;
    });

    builder.addCase(fetchCompetitionResults.rejected, (state, action) => {
      console.log('rejected', action);

      state.loading = false;
    });
    builder.addCase(fetchCompetitionResults.pending, (state, action) => {
      console.log('pending', action);

      state.loading = true;
    });
  },
});

export default {
  getBannersDataSliceReducer: getBannersDataSlice.reducer,
  fetchCompetitionResultsSliceReducer: fetchCompetitionResultsSlice.reducer,
};
