import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../Constants/Fonts';
import {Colors} from '../Constants';

const HealthStatus = ({icon, title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={icon} style={styles.img} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  imgContainer: {
    backgroundColor: Colors.imageBG,
    width: wp('14%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  img: {height: hp('5%'), width: wp(10), resizeMode: 'contain'},
  title: {
    fontFamily: Fonts.TajawalRegular,
    fontWeight: 400,
    fontSize: 12,
    color: Colors.lightBlackTextColor,
  },
});

export default HealthStatus;
