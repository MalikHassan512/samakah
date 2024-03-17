import {View, Text, StyleSheet, Keyboard, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AuthHeader,
  AuthInputField,
  Button,
  Header,
  Loader,
} from '../../Components';
import {Colors} from '../../Constants';
import Fonts from '../../Constants/Fonts';
import Strings from '../../Constants/Strings';
import Images from '../../Constants/Images';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {signInRequest} from '../../Redux/Slices/AuthSlice';
import Routes from '../../Constants/Routes';
import {getUserData} from '../../Redux/Slices/UserSlice';

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const data = useSelector(state => state.signIn.data);
  const error = useSelector(state => state.signIn.isError);
  const loading = useSelector(state => state.signIn.loading);
  const [hitlogin, setHitLogin] = useState(false);

  const token = useSelector(state => state.signIn.data?.api_token);
  const center_registration = useSelector(
    state => state.getUserData.data?.data?.user_fields?.center_id,
  );

  useEffect(() => {
    if (token) {
      dispatch(getUserData(token));
    }
  }, [token]);

  useEffect(() => {
    if (hitlogin) {
      if (data?.api_token) {
        console.log('center_registration inside::>>', center_registration);
        if (center_registration === null) {
          alert('لتسجيل الدخول ، يرجى التسجيل في أقرب مركز لك');
        }
        setHitLogin(false);
      }
    }
  }, [center_registration, hitlogin]);

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
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
    if (inputs.password === '') {
      handleError('password', 'PLease enter password');
      valid = false;
    } else if (inputs.password.length < 6) {
      handleError(
        'password',
        'PLease enter valid password of 6 characters or more',
      );
      valid = false;
    }

    setHitLogin(true);

    register();
  };

  const register = () => {
    const formData = new FormData();
    formData.append('username', inputs.email);
    formData.append('password', inputs.password);

    dispatch(signInRequest(formData));
  };

  return (
    <View>
      <Header />
      <AuthHeader />

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainTitle}>{Strings.تسجيل}</Text>

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
            <AuthInputField
              title={'كلمة المرور'}
              placeholder={'كلمة المرور'}
              icon={Images.eyeSlash}
              secureTextEntry={!showPassword}
              value={inputs.password}
              onChangeText={text => handleInputChange(text, 'password')}
              error={errors.password}
              onFocus={() => handleError('password', '')}
              onPress={() => setShowPassword(!showPassword)}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.ForgetPassword)}>
              <Text style={styles.forgetPasswordText}>نسيت كلمة المرور؟</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btnCon}>
            <Button title={'تسجيل'} onPress={validate} loader={loading} />
          </View>

          <View style={styles.lastContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.SignUp)}>
              <Text style={styles.newAccTxt}> حساب جديد</Text>
            </TouchableOpacity>
            <Text style={styles.noAccTxt}> ليس لدي حساب؟</Text>
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

export default SignIn;
