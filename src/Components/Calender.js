import {View, Modal, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Images from '../Constants/Images';

const Calender = ({showCalender, setShowCalender}) => {
  const currentDate = new Date();

  return (
    <Modal
      animationType="slide"
      visible={showCalender}
      onRequestClose={() => {
        setShowCalender(!showCalender);
      }}>
      <View style={styles.calenderCon}>
        <Calendar
          current={currentDate.toISOString().split('T')[0]}
          minDate={'2021-01-01'}
          maxDate={'2029-12-31'}
          onDayPress={day => {
            console.log('selected day', day);
          }}
          onDayLongPress={day => {
            console.log('selected day', day);
          }}
          firstDay={6}
        />
      </View>

      <TouchableOpacity
        style={styles.closeIconCon}
        onPress={() => setShowCalender(false)}>
        <Image source={Images.closeIcon} style={styles.closeIcon} />
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  calenderCon: {width: wp(100), height: hp(60), marginTop: hp(15)},
  closeIconCon: {
    alignSelf: 'center',
    marginTop: hp(1),
  },
  closeIcon: {width: wp(10), height: hp(5), resizeMode: 'contain'},
});

export default Calender;
