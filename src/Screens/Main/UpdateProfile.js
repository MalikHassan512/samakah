import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AuthHeader,
  AuthInputField,
  Button,
  CitiesDropDown,
  Header,
  HealthStatus,
  MaritalStausModal,
} from '../../Components';
import {Colors} from '../../Constants';
import Fonts from '../../Constants/Fonts';
import Images from '../../Constants/Images';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserProfile} from '../../Redux/Slices/UserSlice';
import {socialStatusIntoEnglish} from '../../Utils/CommonFucntions';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.signIn.data.api_token);
  const userId = useSelector(state => state.signIn.data.id);
  const loading = useSelector(state => state.updateUserProfile.loading);
  const [modalVisible, setModalVisible] = useState(false);
  const [hideOldPassword, setHideOldPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [maritalStatus, setMaritalStatus] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);
  const [healthStatus, setHealthStatus] = useState('');
  const [showHealthStatusError, setShowHealthStatusError] = useState(false);
  const [maritalStatusInEnglish, setMaritalStatusInEnglish] = useState('');
  const [isChronicDieasesModal, setIsChronicDieasesModal] = useState(false);
  const [chronicDieasesId, setChronicDieasesId] = useState('');

  useEffect(() => {
    if (chronicDieasesId !== '') {
      setHealthStatus(chronicDieasesId);
    }
  }, [chronicDieasesId]);

  const [inputs, setInputs] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    socialStatus: '',
    healthStatusId: '',
  });

  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    socialStatus: '',
    healthStatusId: '',
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

  const handleError = (input, error) => {
    setErrors(preState => ({
      ...preState,
      [input]: error,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (inputs.oldPassword.length < 6) {
      handleError('oldPassword', 'Old password not correct.');
      isValid = false;
    }

    if (inputs.newPassword.length < 6) {
      handleError('newPassword', 'New password must be 6 characters long.');
      isValid = false;
    }

    if (inputs.confirmPassword.length < 6) {
      handleError(
        'confirmPassword',
        'Confirm password must be 6 characters long.',
      );
      isValid = false;
    } else if (inputs.newPassword !== inputs.confirmPassword) {
      handleError('confirmPassword', 'Password does not match.');
      isValid = false;
    }

    console.log('maritalStatus::>>>> ', maritalStatus);

    if (inputs.socialStatus === '' && maritalStatus == '') {
      handleError('socialStatus', 'Please select social status.');
      isValid = false;
    }

    if (healthStatus === 0) {
      setShowHealthStatusError(true);
    } else {
      setShowHealthStatusError(false);
    }

    return isValid;
  };

  const handleSubmit = () => {
    // if (validate()) {
    updateProfile();
    // }
  };

  useEffect(() => {
    if (maritalStatus !== '') {
      setMaritalStatusInEnglish(socialStatusIntoEnglish(maritalStatus));
    }
  }, [maritalStatus]);

  const openChronicDieasesModal = () => {
    // setShowCitiesModal(true);
    setIsChronicDieasesModal(true);
  };

  const updateProfile = () => {
    const formData = new FormData();

    if (maritalStatus !== '') {
      socialStatusIntoEnglish(maritalStatus);
    }

    formData.append('old_password', inputs.oldPassword);
    formData.append('password', inputs.newPassword);
    formData.append('confirm_password', inputs.confirmPassword);
    formData.append('social_status', maritalStatusInEnglish);
    formData.append('health_status_id', healthStatus);
    formData.append('_method', 'PUT');

    console.log('formData::>>>> ', formData);

    console.log('healthStatus inside::>>', healthStatus);

    dispatch(updateUserProfile({formData, token, userId}));
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Header />
      <AuthHeader />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainTitle}>تحديث الملف</Text>

          <View style={styles.fieldsContainer}>
            <AuthInputField
              title={'الإسم'}
              placeholder={'الإسم'}
              disable={true}
            />
            <AuthInputField
              disable={true}
              title={'البريد الإلكتروني'}
              placeholder={'البريد الإلكتروني'}
            />
            <AuthInputField
              title={'كلمة المرور القديمة'}
              placeholder={'كلمة المرور القديمة'}
              icon={Images.eyeSlash}
              value={inputs.oldPassword}
              onChangeText={text => handleInputChange(text, 'oldPassword')}
              error={errors.oldPassword}
              secureTextEntry={hideOldPassword}
              onPress={() => setHideOldPassword(!hideOldPassword)}
              onFocus={() => handleError('oldPassword', '')}
            />

            <AuthInputField
              title={'كلمة المرور الجديدة'}
              placeholder={'كلمة المرور الجديدة'}
              icon={Images.eyeSlash}
              value={inputs.newPassword}
              onChangeText={text => handleInputChange(text, 'newPassword')}
              error={errors.newPassword}
              secureTextEntry={hideNewPassword}
              onPress={() => setHideNewPassword(!hideNewPassword)}
              onFocus={() => handleError('newPassword', '')}
            />

            <AuthInputField
              title={'تأكيد كلمة المرور'}
              placeholder={'تأكيد كلمة المرور'}
              icon={Images.eyeSlash}
              value={inputs.confirmPassword}
              onChangeText={text => handleInputChange(text, 'confirmPassword')}
              error={errors.confirmPassword}
              secureTextEntry={hideConfirmPassword}
              onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
              onFocus={() => handleError('confirmPassword', '')}
            />

            <AuthInputField
              title={'إضافة الحالة الإجتماعية'}
              placeholder={'الحالة الاجتماعية'}
              icon={Images.arrowDown}
              onPress={() => {
                setModalVisible(true);
              }}
              value={maritalStatus}
              onChangeText={text => handleInputChange(text, 'socialStatus')}
              error={errors.socialStatus}
              onFocus={() => handleError('socialStatus', '')}
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
            {showHealthStatusError && (
              <Text style={[styles.errorTxt, styles.flexEnd]}>
                Please select health status.
              </Text>
            )}
          </View>

          <View style={styles.btnCon}>
            <Button
              title={'حفظ التغييرات'}
              onPress={handleSubmit}
              loader={loading}
            />
          </View>

          <View style={styles.bottomHeight} />
        </View>
      </View>

      {modalVisible && (
        <MaritalStausModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setValue={setMaritalStatus}
        />
      )}

      {isChronicDieasesModal && (
        <CitiesDropDown
          setModalVisible={setIsChronicDieasesModal}
          isChronicDieasesModal={isChronicDieasesModal}
          setIsChronicDieasesModal={setIsChronicDieasesModal}
          setChronicDieasesId={setChronicDieasesId}
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
  forgetPas: {fontSize: 12, fontWeight: 400, marginTop: 10, marginLeft: 20},
  healthStatusTouchableActive: {
    borderColor: Colors.themeColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 2,
  },
  errorTxt: {
    color: Colors.red,
    fontSize: 12,
    marginTop: 5,
    marginRight: 10,
    fontFamily: Fonts.TajawalRegular,
  },
  flexEnd: {alignSelf: 'flex-end'},
  bottomHeight: {height: 50},
});

export default UpdateProfile;
