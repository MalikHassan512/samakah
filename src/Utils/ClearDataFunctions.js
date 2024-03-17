import {clearUserData} from '../Redux/Slices/AuthSlice';

export const clearSignUpData = dispatch => {
  dispatch(clearUserData());
};
