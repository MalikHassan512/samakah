import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AuthHeader,
  AuthInputField,
  Button,
  CitiesDropDown,
  DatePickerModal,
  GenderModal,
  Header,
  HealthStatus,
  MaritalStausModal,
} from '../../Components';
import {Colors} from '../../Constants';
import Fonts from '../../Constants/Fonts';
import Images from '../../Constants/Images';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../Constants/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  signUpRequest,
  fetchLocation,
  getHealthStatus,
} from '../../Redux/Slices/AuthSlice';
import {
  genderIntoEnglish,
  socialStatusIntoEnglish,
} from '../../Utils/CommonFucntions';
import {clearSignUpData} from '../../Utils/ClearDataFunctions';

const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isUserCreated = useSelector(state => state.signUp.isUserCreated);
  const isErr = useSelector(state => state.signUp.isError);
  const loading = useSelector(state => state.signUp.loading);
  const locationsData = useSelector(state => state.getLocations.data);
  const [modalVisible, setModalVisible] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [city, setCity] = useState('');
  const [location_id, setLocation_id] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [healthStatus, setHealthStatus] = useState(0);
  const [showCitiesModal, setShowCitiesModal] = useState(false);
  const [dob, setDob] = useState('');
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [maritalStatusInEnglish, setMaritalStatusInEnglish] = useState('');
  const [genderInEglish, setGenderInEglish] = useState('');
  const [region, setRegion] = useState('');
  const [isRegion, setIsRegion] = useState(false);
  const [regionInArabic, setRegionInArabic] = useState('');
  const [chronicDieasesId, setChronicDieasesId] = useState('');
  const [isChronicDieasesModal, setIsChronicDieasesModal] = useState(false);

  useEffect(() => {
    if (chronicDieasesId !== '') {
      setHealthStatus(chronicDieasesId);
    }
  }, [chronicDieasesId]);

  useEffect(() => {
    if (maritalStatus !== '') {
      setMaritalStatusInEnglish(socialStatusIntoEnglish(maritalStatus));
    }
  }, [maritalStatus]);

  useEffect(() => {
    if (gender !== '') {
      setGenderInEglish(genderIntoEnglish(gender));
    }
  }, [gender]);

  const showAlert = () => {
    alert('تم طلب التسجيل بنجاح. يرجى زيارة أقرب مركز لإكمال العملية');
    navigation.navigate(Routes.SignIn);
    clearSignUpData(dispatch);
  };

  useEffect(() => {
    if (isUserCreated) {
      showAlert();
    }
  }, [isUserCreated]);

  useEffect(() => {
    dispatch(fetchLocation());
    dispatch(getHealthStatus());
    clearSignUpData(dispatch);
  }, []);

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    Id_Card_Number: '',
    socialStatus: '',
    city: '',
    description: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    Id_Card_Number: '',
    socialStatus: '',
    city: '',
    description: '',
    dob: '',
    phone: '',
    region: '',
  });

  const handleHealthStatusPress = index => {
    setActiveIndex(index);
  };

  const handleInputChange = (text, input) => {
    setInputs(preState => ({
      ...preState,
      [input]: text,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (inputs.name === '') {
      handleError('name', 'PLease enter name');
      valid = false;
    } else if (inputs.name.length < 3) {
      handleError('name', 'PLease enter valid name');
      valid = false;
    }
    if (inputs.email === '') {
      handleError('email', 'PLease enter email');
      valid = false;
    } else if (
      !inputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/)
    ) {
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
    if (inputs.confirmPassword !== inputs.password) {
      handleError('confirmPassword', 'PLease enter same password');
      valid = false;
    } else if (inputs.confirmPassword === '') {
      handleError('confirmPassword', 'PLease enter confirm password');
      valid = false;
    }

    if (gender === '') {
      handleError('gender', 'Please enter gender');
      valid = false;
    }
    if (inputs.Id_Card_Number === '') {
      handleError('Id_Card_Number', 'Please enter Id_Card_Number');
      valid = false;
    } else if (inputs.Id_Card_Number.length < 10) {
      handleError('Id_Card_Number', 'Please enter valid Id_Card_Number');
      valid = false;
    }
    if (maritalStatus === '') {
      handleError('maritalStatus', 'Please enter maritalStatus');
      valid = false;
    }

    if (city === '') {
      handleError('city', 'Please enter city');
      valid = false;
    }

    if (dob === '') {
      handleError('dob', 'Please enter dob');
      valid = false;
    }

    if (inputs.phone === '') {
      handleError('phone', 'Please enter phone');
      valid = false;
    } else if (inputs.phone.length < 10) {
      handleError('phone', 'Please enter 10 digits valid phone');
      valid = false;
    }

    if (region === '') {
      handleError('region', 'Please enter region');
      valid = false;
    }

    console.log('validationErrors', validationErrors);

    console.log('valid', valid);
    if (valid) {
      register();
    }
  };

  var validationErrors = [];

  const handleError = (input, error) => {
    setErrors(preState => ({
      ...preState,
      [input]: error,
    }));

    validationErrors.push(error);
  };

  const openCitiesDropDown = () => {
    setShowCitiesModal(true);
  };

  const onpenDatePicker = () => {
    setShowDatePickerModal(true);
  };

  const openGenderModal = () => {
    setShowGenderModal(true);
  };

  const openRegionDropDown = () => {
    console.log('inside openRegionDropDown');
    setShowCitiesModal(true);
    setIsRegion(true);
  };

  const openChronicDieasesModal = () => {
    setShowCitiesModal(true);
    setIsChronicDieasesModal(true);
  };

  const register = () => {
    console.log('inside register');
    const formData = new FormData();
    formData.append('name', inputs.name);
    formData.append('email', inputs.email);
    formData.append('password', inputs.password);
    formData.append('confirm_password', inputs.confirmPassword);
    formData.append('social_status', maritalStatusInEnglish);
    formData.append('gender', genderInEglish);
    formData.append('nic', Number(inputs.Id_Card_Number));
    formData.append('location_id', location_id);
    formData.append('dob', dob);
    formData.append('health_status_id', healthStatus);
    formData.append('other', inputs.description);
    formData.append('mobile_no', inputs.phone);
    formData.append('region', region);

    console.log('formData::::>>>', formData);

    dispatch(signUpRequest(formData));
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Header />
      <AuthHeader />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainTitle}>إنشاء حساب</Text>

          <View style={styles.fieldsContainer}>
            <AuthInputField
              title={'الإسم'}
              placeholder={'الإسم'}
              keyboardType={'default'}
              value={inputs.name}
              onChangeText={text => handleInputChange(text, 'name')}
              error={errors.name}
              onFocus={() => handleError('name', '')}
            />
            <AuthInputField
              title={'رقم الهاتف المحمول'}
              placeholder={'الهاتف المحمول'}
              keyboardType={'phone-pad'}
              length={10}
              value={inputs.phone}
              onChangeText={text => handleInputChange(text, 'phone')}
              error={errors.phone}
              onFocus={() => handleError('phone', '')}
            />

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
              onPress={() => setHidePassword(!hidePassword)}
              password={hidePassword}
              value={inputs.password}
              onChangeText={text => handleInputChange(text, 'password')}
              error={errors.password}
              onFocus={() => handleError('password', '')}
            />
            <AuthInputField
              title={'تأكيد كلمة المرور'}
              placeholder={'تأكيد كلمة المرور'}
              icon={Images.eyeSlash}
              onPress={() => setHidePassword(!hidePassword)}
              password={hidePassword}
              value={inputs.confirmPassword}
              onChangeText={text => handleInputChange(text, 'confirmPassword')}
              error={errors.confirmPassword}
              onFocus={() => handleError('confirmPassword', '')}
            />

            <AuthInputField
              dontRipple
              title={'الموقع'}
              placeholder={'اختر مدينتك'}
              icon={Images.location}
              onPress={openCitiesDropDown}
              onPressWholeComponent={openCitiesDropDown}
              value={city}
              error={errors.city}
              onFocus={() => handleError('city', '')}
              editable={false}
            />

            <AuthInputField
              dontRipple
              title={'منطقة'}
              placeholder={'منطقة'}
              icon={Images.region}
              onPress={openRegionDropDown}
              onPressWholeComponent={openRegionDropDown}
              value={regionInArabic}
              error={errors.region}
              onFocus={() => handleError('region', '')}
              editable={false}
            />

            <AuthInputField
              dontRipple
              title={'تاريخ الميلاد'}
              placeholder={'اختر تاريخ الميلاد'}
              icon={Images.calendar}
              onPressWholeComponent={onpenDatePicker}
              onPress={onpenDatePicker}
              value={dob}
              error={errors.dob}
              onFocus={() => handleError('dob', '')}
              editable={false}
            />

            <AuthInputField
              title={'الجنس'}
              placeholder={'الجنس'}
              icon={Images.arrowDown}
              onPress={openGenderModal}
              setValue={setGender}
              value={gender || inputs.gender}
              onChangeText={text => handleInputChange(text, 'gender')}
              error={errors.gender}
              onFocus={() => handleError('gender', '')}
              editable={false}
              dontRipple
              onPressWholeComponent={openGenderModal}
            />

            <AuthInputField
              keyboardType={'numeric'}
              length={10}
              title={'رقم بطاقة الهوية'}
              placeholder={'رقم بطاقة الهوية'}
              value={inputs.Id_Card_Number}
              onChangeText={text => handleInputChange(text, 'Id_Card_Number')}
              error={errors.Id_Card_Number}
              onFocus={() => handleError('Id_Card_Number', '')}
            />
            <AuthInputField
              title={'إضافة الحالة الإجتماعية'}
              placeholder={'الحالة الاجتماعية'}
              icon={Images.arrowDown}
              onPress={() => {
                setModalVisible(true);
              }}
              setValue={setMaritalStatus}
              value={maritalStatus}
              onChangeText={text => handleInputChange(text, 'socialStatus')}
              error={errors.maritalStatus}
              onFocus={() => handleError('maritalStatus', '')}
              editable={false}
              dontRipple
              onPressWholeComponent={() => setModalVisible(true)}
            />

            <Text style={styles.healthStatusTxt}>الوضع الصحي</Text>

            <View style={styles.healthStatusComCon}>
              <TouchableOpacity
                onPress={() => {
                  handleHealthStatusPress(0);
                  setHealthStatus(1);
                }}
                style={[
                  activeIndex === 0 && styles.healthStatusTouchableActive,
                ]}>
                <HealthStatus icon={Images.characters} title={'والدة معاق'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleHealthStatusPress(1);
                  setHealthStatus(2);
                }}
                style={[
                  activeIndex === 1 && styles.healthStatusTouchableActive,
                ]}>
                <HealthStatus icon={Images.ribbon} title={'مريضة سرطان'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleHealthStatusPress(2);
                  // setHealthStatus(3);
                  openChronicDieasesModal();
                }}
                style={[
                  activeIndex === 2 && styles.healthStatusTouchableActive,
                ]}>
                <HealthStatus icon={Images.heart} title={'مرض مزمن'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleHealthStatusPress(3);
                  setHealthStatus(4);
                }}
                style={[
                  activeIndex === 3 && styles.healthStatusTouchableActive,
                ]}>
                <HealthStatus
                  icon={Images.happyWoman}
                  title={'حالة صحية ممتازة'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="التعريف"
                textAlign="right"
                multiline={true}
                numberOfLines={4}
                onChangeText={text => handleInputChange(text, 'description')}
                value={inputs.description}
              />
              <Text style={styles.Txt160}>160 حرف</Text>
            </View>
          </View>

          <View style={styles.policyTxtContainer}>
            <Text style={styles.policyTxt1}>
              عند قيامك بالضغط على تسجيل الدخول فأنت توافقين على{'\n'}
            </Text>
            <Text style={styles.policyTxt2}>القوانين وسياسة الخصوصوية</Text>
          </View>

          <View style={styles.btnCon}>
            <Button title={'تسجيل'} onPress={validate} loader={loading} />
          </View>

          <View style={styles.lastContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.SignIn)}>
              <Text style={styles.newAccTxt}> تسجيل الدخول</Text>
            </TouchableOpacity>
            <Text style={styles.noAccTxt}> لدي حساب؟</Text>
          </View>
        </View>
      </View>

      {modalVisible && (
        <MaritalStausModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setValue={setMaritalStatus}
        />
      )}

      {showGenderModal && (
        <GenderModal
          modalVisible={showGenderModal}
          setModalVisible={setShowGenderModal}
          setValue={setGender}
        />
      )}

      {showCitiesModal && (
        <CitiesDropDown
          modalVisible={showCitiesModal}
          setModalVisible={setShowCitiesModal}
          setValue={setCity}
          setLocationID={setLocation_id}
          data={locationsData}
          isRegion={isRegion}
          setIsRegion={setIsRegion}
          setRegion={setRegion}
          setRegionInArabic={setRegionInArabic}
          isChronicDieasesModal={isChronicDieasesModal}
          setIsChronicDieasesModal={setIsChronicDieasesModal}
          setChronicDieasesId={setChronicDieasesId}
        />
      )}

      {showDatePickerModal && (
        <DatePickerModal
          modalVisible={showDatePickerModal}
          setModalVisible={setShowDatePickerModal}
          setValue={setDob}
        />
      )}
    </ScrollView>
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
  healthStatusTxt: {
    alignSelf: 'flex-end',
    marginTop: 15,
    fontFamily: Fonts.TajawalRegular,
    fontWeight: 600,
    color: Colors.black,
    fontSize: 16,
  },
  healthStatusComCon: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  inputContainer: {
    marginTop: 20,
    borderWidth: 0.8,
    borderColor: Colors.greyBackground,
    borderRadius: 10,
    height: 100,
    paddingHorizontal: 10,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  inputText: {
    flex: 1,
    textAlignVertical: 'top',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  Txt160: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    fontSize: 12,
    color: Colors.lightBlackTxt,
    fontFamily: Fonts.TajawalRegular,
  },
  policyTxtContainer: {alignItems: 'flex-end', marginTop: 10},
  policyTxt1: {fontFamily: Fonts.TajawalRegular, color: Colors.black},
  policyTxt2: {
    marginTop: -10,
    fontFamily: Fonts.TajawalRegular,
    color: Colors.black,
    fontWeight: 'bold',
  },
  scrollView: {paddingBottom: 50},
  healthStatusTouchableActive: {
    borderColor: Colors.themeColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 2,
  },
});

export default SignUp;
