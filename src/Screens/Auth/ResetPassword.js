import {View, Text, StyleSheet, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AuthHeader, AuthInputField, Button, Header} from '../../Components';
import {Colors} from '../../Constants';
import Fonts from '../../Constants/Fonts';
import Images from '../../Constants/Images';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Routes from '../../Constants/Routes';
import {
  clearForgetPasswordUpdateData,
  forgetPasswordUpdate,
} from '../../Redux/Slices/AuthSlice';

const ResetPassword = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const loading = useSelector(state => state.forgetPasswordUpdateRed?.loading);
  const allowNavigation = useSelector(
    state => state.forgetPasswordUpdateRed?.allowNavigate,
  );

  console.log('allowNavigation::>>>', allowNavigation);

  useEffect(() => {
    if (allowNavigation) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: Routes.SignIn}],
        }),
      );
    }
    dispatch(clearForgetPasswordUpdateData());
  }, [allowNavigation]);

  const [inputs, setInputs] = useState({
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    confirm_password: '',
  });

  const handleInputChange = (text, input) => {
    setInputs(preState => ({
      ...preState,
      [input]: text,
    }));
  };

  const handleError = (input, error) => {
    setErrors(preState => ({
      ...preState,
      [input]: error,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (inputs.password === '') {
      handleError('password', 'PLease enter password');
      valid = false;
    } else if (inputs.password.length < 6) {
      handleError(
        'password',
        'Please enter valid password of 6 characters or more',
      );
      valid = false;
    }
    if (inputs.confirm_password === '') {
      handleError('confirm_password', 'PLease enter confirm password');
      valid = false;
    } else if (inputs.confirm_password.length !== inputs.password.length) {
      handleError('confirm_password', 'PLease enter valid confirm password');
      valid = false;
    }

    if (valid) {
      register();
    }
  };

  const register = () => {
    const formData = new FormData();
    formData.append('email', route?.params?.email);
    formData.append('otp', route?.params?.otp);
    formData.append('password', inputs.password);
    formData.append('confirm_password', inputs.confirm_password);

    console.log('formData in reset password::>>>', formData);

    dispatch(forgetPasswordUpdate(formData));
  };

  return (
    <View>
      <Header />
      <AuthHeader />

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainTitle}>إعادة تعيين كلمة المرور</Text>

          <View style={styles.fieldsContainer}>
            <AuthInputField
              title={'كلمة المرور الجديدة'}
              placeholder={'كلمة المرور الجديدة '}
              icon={Images.eyeSlash}
              secureTextEntry={!showPassword}
              value={inputs.password}
              onChangeText={text => handleInputChange(text, 'password')}
              error={errors.password}
              onFocus={() => handleError('password', '')}
              onPress={() => setShowPassword(!showPassword)}
            />
            <AuthInputField
              title={'تأكيد كلمة المرور الجديدة'}
              placeholder={'تأكيد كلمة المرور الجديدة'}
              icon={Images.eyeSlash}
              secureTextEntry={!showConfirmPassword}
              value={inputs.confirm_password}
              onChangeText={text => handleInputChange(text, 'confirm_password')}
              error={errors.confirm_password}
              onFocus={() => handleError('confirm_password', '')}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </View>

          <View style={styles.btnCon}>
            <Button title={'تسجيل'} onPress={validate} loader={loading} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -12,
  },
  innerContainer: {margin: 15},
  mainTitle: {
    alignSelf: 'flex-end',
    fontFamily: Fonts.TajawalRegular,
    fontWeight: 700,
    color: Colors.black,
    fontSize: 20,
    marginTop: 10,
  },
  fieldsContainer: {marginTop: 15},
  forgetPasswordText: {
    fontFamily: Fonts.TajawalRegular,
    fontWeight: 400,
    color: Colors.blueText,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  btnCon: {marginTop: 30},
  lastContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  newAccTxt: {
    fontFamily: Fonts.TajawalRegular,
    fontWeight: 'bold',
    color: Colors.black,
  },
  noAccTxt: {
    fontFamily: Fonts.TajawalRegular,
    fontWeight: 400,
    color: Colors.black,
  },
});

export default ResetPassword;
