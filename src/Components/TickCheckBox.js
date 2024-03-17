import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Colors} from '../Constants';
import {Text} from 'react-native-paper';
import Images from '../Constants/Images';

const RoundCheckbox = ({title, onChange, checked}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={[styles.checkbox, checked && styles.checkedCheckbox]}
        onPress={onChange}>
        {checked && (
          <View style={styles.tick}>
            <Image source={Images.tick} style={styles.tickImage} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {marginRight: 10},
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: Colors.greyBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: Colors.themeColor,
  },
  tick: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickImage: {width: 10, height: 10, resizeMode: 'contain'},
});

export default RoundCheckbox;
