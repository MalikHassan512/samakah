import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCallWithToken} from '../../Services/APIs';

const initialState = {
  loading: false,
  data: {},
};

export const getFormData = createAsyncThunk('getFormData', async data => {
  // console.log('data in getFormData::>>>', JSON.stringify(data));
  const response = await ApiCallWithToken({
    route: `form-questions`,
    verb: 'GET',
    token: data,
  });
  return response;
});

const getFormDataSlice = createSlice({
  name: 'getFormData',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(getFormData.fulfilled, (state, action) => {
      // console.log('Fulfilled', JSON.stringify(action?.payload));
      state.data = action?.payload?.questions;
      state.loading = false;
    });

    builder.addCase(getFormData.rejected, (state, action) => {
      console.log('rejected', action);

      state.loading = false;
    });
    builder.addCase(getFormData.pending, (state, action) => {
      console.log('pending', action);

      state.loading = true;
    });
  },
});

export const likeDiskeAnswer = createAsyncThunk(
  'likeDiskeAnswer',
  async data => {
    console.log('data in reaction APi::>>>', JSON.stringify(data));
    const response = await ApiCallWithToken({
      route: `responses`,
      verb: 'POST',
      token: data.token,
      body: data.formData,
    });

    console.log('response in Reaction API::>>>', JSON.stringify(response));
    return response;
  },
);

const likeDiskeAnswerSlice = createSlice({
  name: 'likeDiskeAnswer',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(likeDiskeAnswer.fulfilled, (state, action) => {
      console.log('Fulfilled::>>', action?.payload);

      if (
        action?.payload?.message === 'Response already submitted for today.'
      ) {
        alert('تم إرسال الرد بالفعل !');
      }
      state.data = action?.payload;

      state.loading = false;
    });

    builder.addCase(likeDiskeAnswer.rejected, (state, action) => {
      console.log('rejected', action);

      state.loading = false;
    });
    builder.addCase(likeDiskeAnswer.pending, (state, action) => {
      console.log('pending', action);

      state.loading = true;
    });
  },
});

export default {
  getFormDataReducer: getFormDataSlice.reducer,
  likeDiskeAnswerReducer: likeDiskeAnswerSlice.reducer,
};
