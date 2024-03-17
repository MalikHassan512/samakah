import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Colors} from '../Constants';

const Button = ({title, onPress, loader}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      {loader && (
        <ActivityIndicator color={Colors.white} style={{marginLeft: 10}} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.themeColor,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    height: 50,
  },
  title: {color: Colors.white},
});

export default Button;
