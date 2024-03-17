import {View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AuthHeader, AuthInputField, Header} from '../../Components';
import {Colors} from '../../Constants';
import Fonts from '../../Constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../../Components';
import {heightPercentageToDP as HP} from 'react-native-responsive-screen';
import Routes from '../../Constants/Routes';
import {
  clearForgetPasswordData,
  forgetPassword,
} from '../../Redux/Slices/AuthSlice';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const allowNavigation = useSelector(
    state => state.forgetPasswordRed?.allowNavigate,
  );
  const loading = useSelector(state => state.forgetPasswordRed?.loading);

  const token = useSelector(state => state.signIn.data?.api_token);

  const [inputs, setInputs] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
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

    if (inputs.email === '') {
      handleError('email', 'PLease enter email');
      valid = false;
    } else if (!inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      handleError('email', 'PLease enter valid email');
      valid = false;
    }
    if (valid) {
      register();
    }
  };

  const register = () => {
    const formData = new FormData();
    formData.append('email', inputs.email);

    dispatch(forgetPassword(formData));
  };

  useEffect(() => {
    if (allowNavigation) {
      navigation.navigate(Routes?.OTP, {email: inputs.email});
      dispatch(clearForgetPasswordData());
    }
  }, [allowNavigation]);

  return (
    <View style={styles.container}>
      <Header />
      <AuthHeader />

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainTitle}>
            لاستعادة كلمة المرور الخاصة بك، يرجى إدخال البريد الإلكتروني الخاص
            بك
          </Text>

          <View style={styles.fieldsContainer}>
            <AuthInputField
              title={'البريد الإلكتروني'}
              placeholder={'البريد الإلكتروني'}
              keyboardType={'email-address'}
              value={inputs.email}
              onChangeText={text => handleInputChange(text, 'email')}
              error={errors.email}
              onFocus={() => handleError('email', '')}
            />
          </View>

          <View style={styles.btnCon}>
            <Button title={'تسجيل'} onPress={validate} loader={loading} />
          </View>

          <View style={styles.lastContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.SignIn)}>
              <Text style={styles.newAccTxt}>تسجيل الدخول </Text>
            </TouchableOpacity>
            <Text style={styles.noAccTxt}>للعودة </Text>
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
  fieldsContainer: {marginTop: HP(5)},
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

export default ForgetPassword;
