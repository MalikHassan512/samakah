import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCallWithToken} from '../../Services/APIs';
import {Alert} from 'react-native';

const initialState = {
  loading: false,
  data: {},
};

export const getUserData = createAsyncThunk('getUserData', async data => {
  console.log('data in getUserData::>>>', JSON.stringify(data));
  const response = await ApiCallWithToken({
    route: `user`,
    verb: 'GET',
    token: data,
  });
  return response;
});

const getUserDataSlice = createSlice({
  name: 'getUserData',
  initialState: initialState,
  reducers: {
    clearUserData(state) {
      state.data = {};
    },
  },

  extraReducers: builder => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      //   console.log('Fulfilled', action?.payload?.status);
      console.log('fullfilled action', action);
      state.data = action?.payload;
      state.loading = false;
    });

    builder.addCase(getUserData.rejected, (state, action) => {
      console.log('rejected', action);
      state.loading = false;
    });
    builder.addCase(getUserData.pending, (state, action) => {
      console.log('pending', action);
      state.loading = true;
    });
  },
});

export const {clearUserData} = getUserDataSlice.actions;

export const updateUserProfile = createAsyncThunk(
  'updateUserProfile',
  async data => {
    console.log('data in updateUserProfile::>>>', JSON.stringify(data));
    const response = await ApiCallWithToken({
      route: `user/${data.userId}`,
      verb: 'POST',
      body: data.formData,
      token: data.token,
    });
    return response;
  },
);

const updateUserProfileSlice = createSlice({
  name: 'updateUserProfile',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      //   console.log('Fulfilled', action?.payload?.status);
      console.log('fullfilled action', action);
      state.data = action?.payload;
      state.loading = false;
      Alert.alert(action?.payload?.message);
    });

    builder.addCase(updateUserProfile.rejected, (state, action) => {
      console.log('rejected', action);
      state.loading = false;
      Alert.alert('Something went wrong, please try again later');
    });
    builder.addCase(updateUserProfile.pending, (state, action) => {
      console.log('pending', action);
      state.loading = true;
    });
  },
});

export default {
  updateUserProfileReducer: updateUserProfileSlice.reducer,
  getUserDataReducer: getUserDataSlice.reducer,
};
