import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCallWithoutToken} from '../../Services/APIs';

const initialState = {
  loading: false,
  isError: false,
  message: '',
  isUserCreated: false,
  data: {},
  allowNavigate: false,
};

export const signUpRequest = createAsyncThunk('signUpRequest', async data => {
  console.log('data in signup Request::>>>', JSON.stringify(data));
  data?.setLoading ? data?.setLoading(true) : null;
  const response = await ApiCallWithoutToken({
    route: 'public/register',
    verb: 'POST',
    body: data,
  });

  return response;
});

const singUpSlice = createSlice({
  name: 'public/register',
  initialState: initialState,
  reducers: {
    clearUserData(state) {
      state.isUserCreated = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(signUpRequest.fulfilled, (state, action) => {
      console.log('Fulfilled', action);
      if (action?.payload?.message == 'User registered successfully') {
        state.isUserCreated = true;
        state.loading = false;
      }
      if (action?.payload?.errors) {
        const values = Object.values(action.payload.errors);
        const valueOfFirstKey = values[0];
        alert(valueOfFirstKey[0]);
      }

      if (action?.payload?.message !== 'The given data was invalid.') {
        state.isError = true;
        state.loading = false;
      } else {
        state.isError = false;
        state.loading = false;
      }
    });

    builder.addCase(signUpRequest.rejected, (state, action) => {
      console.log('rejected', action);
      state.isError = true;
      state.loading = false;
    });
    builder.addCase(signUpRequest.pending, (state, action) => {
      console.log('pending', action);
      state.loading = true;
    });
  },
});

export const signInRequest = createAsyncThunk('signInRequest', async data => {
  console.log('data in signInRequest::>>>', JSON.stringify(data));
  const response = await ApiCallWithoutToken({
    route: 'public/auth',
    verb: 'POST',
    body: data,
  });
  return response;
});

const signInSlice = createSlice({
  name: 'public/auth',
  initialState: initialState,
  reducers: {
    setLogout: (state, action) => {
      state.data = {};
    },
  },

  extraReducers: builder => {
    builder.addCase(signInRequest.fulfilled, (state, action) => {
      console.log('Fulfilled', action?.payload);
      state.data = action?.payload?.data;

      if (action?.payload?.error) {
        alert('something went wrong');
      }

      state.loading = false;
    });

    builder.addCase(signInRequest.rejected, (state, action) => {
      console.log('rejected', action);
      state.isError = true;
      state.loading = false;
    });
    builder.addCase(signInRequest.pending, (state, action) => {
      console.log('pending', action);
      state.loading = true;
    });
  },
});

export const fetchLocation = createAsyncThunk('fetchLocation', async data => {
  const response = await ApiCallWithoutToken({
    route: 'public/locations',
    verb: 'GET',
    body: data,
  });
  return response;
});

const fetchLocationsSlice = createSlice({
  name: 'public/locations',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      // console.log('Fulfilled case::>>>', action?.payload);
      state.data = action?.payload?.data;
      state.loading = false;
    });

    builder.addCase(fetchLocation.rejected, (state, action) => {
      console.log('rejected', action);
      state.isError = true;
      state.loading = false;
    });
    builder.addCase(fetchLocation.pending, (state, action) => {
      console.log('pending', action);
      state.loading = false;
    });
  },
});

export const getHealthStatus = createAsyncThunk(
  'public/health-statues',
  async data => {
    const response = await ApiCallWithoutToken({
      route: 'public/health-statues',
      verb: 'GET',
      body: data,
    });
    return response;
  },
);

const getHealthStatusSlice = createSlice({
  name: 'public/health-statues',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(getHealthStatus.fulfilled, (state, action) => {
      // console.log('Fulfilled case of get health status::>>>', action?.payload);
      state.data = action?.payload?.data;
      state.loading = false;
    });

    builder.addCase(getHealthStatus.rejected, (state, action) => {
      console.log('rejected', action);
      state.isError = true;
      state.loading = false;
    });
    builder.addCase(getHealthStatus.pending, (state, action) => {
      console.log('pending', action);
      state.loading = false;
    });
  },
});

export const forgetPassword = createAsyncThunk(
  'public/forgot-password',
  async data => {
    console.log('data in forgot password::>>>', JSON.stringify(data));
    const response = await ApiCallWithoutToken({
      route: 'public/forgot-password',
      verb: 'POST',
      body: data,
    });
    return response;
  },
);

const forgetPasswordSlice = createSlice({
  name: 'public/forgot-password',
  initialState: initialState,
  reducers: {
    clearForgetPasswordData(state) {
      state.allowNavigate = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      console.log('Fulfilled case of forget password::>>>', action?.payload);

      if (action?.payload?.message == 'Email sent successfully.') {
        alert(action?.payload?.message);
        state.allowNavigate = true;
      } else {
        alert(action?.payload?.message);
      }

      state.data = action?.payload?.data;
      state.loading = false;
    });

    builder.addCase(forgetPassword.rejected, (state, action) => {
      console.log('rejected', action);
      state.isError = true;
      state.loading = false;
    });
    builder.addCase(forgetPassword.pending, (state, action) => {
      console.log('pending', action);

      state.loading = true;
    });
  },
});

export const verifyOtp = createAsyncThunk('public/verify-otp', async data => {
  console.log('data in verify otp::>>>', JSON.stringify(data));
  const response = await ApiCallWithoutToken({
    route: 'public/forgot-verification',
    verb: 'POST',
    body: data,
  });
  return response;
});

const verifyOtpSlice = createSlice({
  name: 'public/verify-otp',
  initialState: initialState,
  reducers: {
    clearOTPData(state) {
      state.allowNavigate = false;
    },
  },

  extraReducers: builder => {
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      console.log('Fulfilled case of verify otp::>>>', action?.payload);
      if (action?.payload?.message == 'Otp has been verified successfully.') {
        alert(action?.payload?.message);
        state.allowNavigate = true;
      } else {
        alert(action?.payload?.message);
      }

      state.data = action?.payload?.data;
      state.loading = false;
    });

    builder.addCase(verifyOtp.rejected, (state, action) => {
      console.log('rejected', action);
      state.isError = true;
      state.loading = false;
    });
    builder.addCase(verifyOtp.pending, (state, action) => {
      console.log('pending', action);

      state.loading = false;
    });
  },
});

export const forgetPasswordUpdate = createAsyncThunk(
  'public/forgot-update',
  async data => {
    console.log('data in forgot password update::>>>', JSON.stringify(data));
    const response = await ApiCallWithoutToken({
      route: 'public/forgot-update',
      verb: 'POST',
      body: data,
    });
    return response;
  },
);

const forgetPasswordUpdateSlice = createSlice({
  name: 'public/forgot-update',
  initialState: initialState,
  reducers: {
    clearForgetPasswordUpdateData(state) {
      state.allowNavigate = false;
    },
  },

  extraReducers: builder => {
    builder.addCase(forgetPasswordUpdate.fulfilled, (state, action) => {
      console.log(
        'Fulfilled case of forget password update::>>>',
        action?.payload,
      );
      if (action?.payload?.message == 'Password update successfully.') {
        alert(action?.payload?.message);
        state.allowNavigate = true;
      } else {
        alert(action?.payload?.message);
      }

      state.data = action?.payload?.data;
      state.loading = false;
    });

    builder.addCase(forgetPasswordUpdate.rejected, (state, action) => {
      console.log('rejected', action);
      state.isError = true;
      state.loading = false;
    });
    builder.addCase(forgetPasswordUpdate.pending, (state, action) => {
      console.log('pending', action);

      state.loading = true;
    });
  },
});

export const {setLogout} = signInSlice.actions;

export const {clearUserData} = singUpSlice.actions;

export const {clearForgetPasswordData} = forgetPasswordSlice.actions;
export const {clearOTPData} = verifyOtpSlice.actions;
export const {clearForgetPasswordUpdateData} =
  forgetPasswordUpdateSlice.actions;

export default {
  // signInReducer: signInSlice.reducer,
  signUpReducer: singUpSlice.reducer,
  signInReducer: signInSlice.reducer,
  fetchLocationsReducer: fetchLocationsSlice.reducer,
  getHealthStatusReducer: getHealthStatusSlice.reducer,
  forgetPasswordReducer: forgetPasswordSlice.reducer,
  verifyOtpReducer: verifyOtpSlice.reducer,
  forgetPasswordUpdateReducer: forgetPasswordUpdateSlice.reducer,
};
