import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthSlice from './Slices/AuthSlice';
import UserSlice from './Slices/UserSlice';
import FormSlices from './Slices/FormSlices';
import HomeSlice from './Slices/HomeSlice';
import GraphSlice from './Slices/GraphSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['FormSlices', 'AuthSlice'],
};

const rootReducer = combineReducers({
  // Add your slices here
  signUp: AuthSlice.signUpReducer,
  signIn: AuthSlice.signInReducer,
  getLocations: AuthSlice.fetchLocationsReducer,
  updateUserProfile: UserSlice.updateUserProfileReducer,
  getFormData: FormSlices.getFormDataReducer,
  likeDiskeAnswer: FormSlices.likeDiskeAnswerReducer,
  getBannersData: HomeSlice.getBannersDataSliceReducer,
  getUserData: UserSlice.getUserDataReducer,
  getHealthStatus: AuthSlice.getHealthStatusReducer,
  getUserWeightHistory: GraphSlice.fetchUserWeightHistoryReducer,
  fetchCompetitionResults: HomeSlice.fetchCompetitionResultsSliceReducer,
  fetchEvaluationGraphData: GraphSlice.fetchEvaluationGraphDataReducer,
  forgetPasswordRed: AuthSlice.forgetPasswordReducer,
  verifyOtpRed: AuthSlice.verifyOtpReducer,
  forgetPasswordUpdateRed: AuthSlice.forgetPasswordUpdateReducer,
});

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false, // Disable serializability checks
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...customizedMiddleware, thunkMiddleware],
});

const persistor = persistStore(store);

export {store, persistor};
