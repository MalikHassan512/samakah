import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../Constants';
import Fonts from '../Constants/Fonts';

const AuthInputField = ({
  placeholder,
  title,
  icon,
  onPress,
  disable,
  onFocus,
  error,
  password,
  keyboardType,
  value,
  setValue,
  editable,
  dontRipple,
  onPressWholeComponent,
  length,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPressWholeComponent}
      style={styles.container}
      activeOpacity={dontRipple ? 0.5 : 1}>
      <Text style={styles.title}>{title}</Text>

      <View
        style={[
          styles.inputContainer,
          {backgroundColor: disable ? Colors.grey : 'none'},
        ]}>
        <TextInput
          value={value}
          editable={editable}
          keyboardType={keyboardType}
          secureTextEntry={password}
          placeholder={placeholder}
          maxLength={length}
          textAlign="right"
          style={styles.input}
          onFocus={() => {
            setIsFocused(true);
            onFocus && onFocus();
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />
        {icon !== undefined && (
          <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
            <Image source={icon} style={styles.eyeSlashIcon} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorTxt}>{error}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'flex-end', marginTop: 15},
  title: {
    fontFamily: Fonts.TajawalRegular,
    fontWeight: 400,
    color: Colors.black,
  },
  inputContainer: {
    borderColor: Colors.grey,
    borderWidth: 1,
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 5,
    paddingHorizontal: 12,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    left: 15,
    top: 15,
    height: 30,
    padding: 5,
    marginTop: -5,
  },
  eyeSlashIcon: {height: 20, width: 20, resizeMode: 'contain'},
  input: {
    width: '100%',
    height: '100%',
    fontFamily: Fonts.TajawalRegular,
    color: Colors.black,
  },
  errorTxt: {
    color: Colors.red,
    fontSize: 12,
    marginTop: 5,
    marginRight: 10,
    fontFamily: Fonts.TajawalRegular,
  },
});

export default AuthInputField;
