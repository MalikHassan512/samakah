import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import Images from '../Constants/Images';
import {Colors} from '../Constants';
import Styles from '../Constants/Styles';
import {Divider} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Routes from '../Constants/Routes';
import {useDispatch} from 'react-redux';
import {setLogout} from '../Redux/Slices/AuthSlice';
import {clearUserData} from '../Redux/Slices/UserSlice';
import {clearSignUpData} from '../Utils/ClearDataFunctions';
import {useSelector} from 'react-redux';

const CustomDrawer = ({props}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userName = useSelector(state => state?.getUserData?.data?.data?.name);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <>
          <View style={styles.nameAndProfileCon}>
            <Text style={Styles.text14Black}>{userName}</Text>
            <View style={styles.greyContainer}>
              <Image source={Images.profilePic} style={styles.profilePic} />
            </View>
          </View>

          <Divider style={styles.divider} />
        </>
        <DrawerItem
          label={'الرسم البياني للوزن'}
          labelStyle={(Styles.text14Black, styles.flexEnd)}
          onPress={() => navigation.navigate(Routes.WeightHistoryGraph)}
        />

        <DrawerItem
          label="عرض الصفحة الشخصية"
          labelStyle={(Styles.text14Black, styles.flexEnd)}
          onPress={() => navigation.navigate(Routes.UpdateProfile)}
        />
        <DrawerItem
          label="التقييم الأسبوعي"
          labelStyle={(Styles.text14Black, styles.flexEnd)}
          onPress={() => navigation.navigate(Routes.Evaluation)}
        />

        <DrawerItem
          label="تسجيل خروج"
          labelStyle={(Styles.text14Black, styles.flexEnd)}
          onPress={() => {
            clearSignUpData(dispatch);
            dispatch(setLogout());
            dispatch(clearUserData());
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  nameAndProfileCon: {
    marginTop: hp('13%'),
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  greyContainer: {
    backgroundColor: Colors.greyBackground,
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  profilePic: {height: 30, width: 30, borderRadius: 50},
  divider: {
    marginVertical: 30,
    backgroundColor: Colors.greyBackground,
    height: 0.5,
  },
  flexEnd: {alignSelf: 'flex-end'},
});

export default CustomDrawer;
