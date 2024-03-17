import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Fonts from '../Constants/Fonts';
import {Colors} from '../Constants';

const RadioBtnAndTiltle = () => {
  const options = [
    {label: 'تربية خاصة'},
    {label: 'معلمة'},
    {label: 'في القطاع الصحي'},
  ];

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const RadioButton = ({option, isSelected}) => (
    <TouchableOpacity
      style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
      onPress={() => handleOptionSelect(option.label)}>
      {isSelected ? (
        <View style={styles.radioButtonInner} />
      ) : (
        <View style={styles.radioBtnInnerNotSelected} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <View key={index} style={styles.radioButtonContainer}>
          <Text style={styles.radioButtonText}>{option.label}</Text>
          <RadioButton
            option={option}
            isSelected={selectedOption === option.label}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'flex-end',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    width: 14,
    height: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.greyBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  radioButtonSelected: {
    borderColor: Colors.green,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: Colors.green,
  },
  radioBtnInnerNotSelected: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: Colors.greyBackground,
  },
  radioButtonText: {
    fontSize: 12,
    color: Colors.black,
    marginLeft: 12,
    fontFamily: Fonts.TajawalRegular,
  },
});

export default RadioBtnAndTiltle;
