import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import React from 'react';
import {Colors} from '../Constants';

const Header = () => {
  return (
    <View style={{backgroundColor: Colors.themeColor}}>
      <SafeAreaView>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.themeColor}
        />
      </SafeAreaView>
    </View>
  );
};

export default Header;
