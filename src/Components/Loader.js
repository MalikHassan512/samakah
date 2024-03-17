import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from '../Constants';

const Loader = () => {
  //transparent background
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={Colors.themeColor} />
    </View>
  );
};

export default Loader;
