import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {AuthHeader, Header} from '../../Components';
import {Colors} from '../../Constants';
import Fonts from '../../Constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {heightPercentageToDP as HP} from 'react-native-responsive-screen';
import Routes from '../../Constants/Routes';
import {clearOTPData, verifyOtp} from '../../Redux/Slices/AuthSlice';

const OTP = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const allowNavigation = useSelector(
    state => state.verifyOtpRed?.allowNavigate,
  );

  const [inputs, setInputs] = useState({
    email: '',
  });

  const register = () => {
    const formData = new FormData();
    formData.append('username', inputs.email);
  };

  const [otp, setOtp] = useState(['', '', '', '', '']);
  const otpInputs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (index < 4 && value !== '') {
        otpInputs.current[index + 1].focus();
      }
    }
  };
  const onSubmit = () => {
    const formData = new FormData();
    formData.append('email', route?.params?.email);
    formData.append('otp', otp.join(''));

    console.log('formData in otp::>>>', formData);

    dispatch(verifyOtp(formData));
  };

  useEffect(() => {
    if (allowNavigation) {
      navigation.navigate(Routes.ResetPassword, {
        email: route?.params?.email,
        otp: otp.join(''),
      });

      dispatch(clearOTPData());
    }
  }, [allowNavigation]);

  return (
    <View style={styles.Topcontainer}>
      <Header />
      <AuthHeader />

      <Text style={styles.mainTitle}>
        الرجاء إدخال كلمة مرور OTP المستلمة على بريدك الإلكتروني
      </Text>

      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (otpInputs.current[index] = ref)}
              style={styles.otpInput}
              onChangeText={value => handleOtpChange(index, value)}
              value={digit}
              maxLength={1}
              keyboardType="numeric"
              onSubmitEditing={onSubmit}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: 40,
    height: 60,
    fontSize: 24,
    borderBottomWidth: 1,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  Topcontainer: {
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
    marginTop: 30,
    marginHorizontal: 20,
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

export default OTP;
