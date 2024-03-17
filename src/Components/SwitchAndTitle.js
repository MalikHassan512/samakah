import {View, Text, Switch, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../Constants';
import Fonts from '../Constants/Fonts';

const SwitchAndTitle = ({title}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: Colors.grey, true: Colors.green}}
        thumbColor={Colors.thumbColor}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginTop: 15,
  },
  title: {
    fontFamily: Fonts.TajawalRegular,
    color: Colors.black,
    fontWeight: 500,
  },
});

export default SwitchAndTitle;
