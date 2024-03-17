import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Images from '../Constants/Images';
import Strings from '../Constants/Strings';
import Fonts from '../Constants/Fonts';

const AuthHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <Text style={styles.languageText}>{Strings.English}</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image source={Images.logoInAuth} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.themeColor,
    paddingHorizontal: wp('3.2%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('2%'),
    height: hp('3%'),
    borderRadius: 5,
  },
  languageText: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: Fonts.TajawalRegular,
  },
  logoContainer: {backgroundColor: Colors.white, borderRadius: 10},
  logo: {height: hp(6), width: wp(12), resizeMode: 'contain', padding: 10},
});

export default AuthHeader;
