import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styles from '../Constants/Styles';
import {Colors} from '../Constants';
import Fonts from '../Constants/Fonts';
import {isIOS} from '../Constants/Diemensions';

const WinningTeam = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rightContainer}>
        <View style={styles.citycontainer}>
          <Text style={Styles.text14White}>جدة</Text>
        </View>
      </View>
      <View style={styles.leftContainer}>
        <View style={Styles.spaceBtwRow}>
          <Text style={Styles.text14Black}>(من الرجال)</Text>
          <Text style={Styles.text14Black}>الفريق الفائز</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailTxt}>محمد علي</Text>
          <Text style={styles.detailTxt}>محمد علي</Text>
          <Text style={styles.detailTxt}>محمد علي</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  citycontainer: {
    backgroundColor: Colors.themeColor,
    paddingVertical: 5,
    width: wp(20),
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    borderColor: Colors.greyBackground,
    borderBottomWidth: 0.6,
  },
  rightContainer: {
    width: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    width: wp(60),
    paddingRight: wp(8),
    paddingVertical: hp(1),
  },
  detailsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: isIOS ? 3 : 0,
  },
  detailTxt: {
    color: Colors.greyText,
    fontSize: 12,
    fontFamily: Fonts.TajawalRegular,
  },
});

export default WinningTeam;
