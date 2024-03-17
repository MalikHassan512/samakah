import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MonthsDropdown = ({options}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = option => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  console.log('selectedOption', selectedOption);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Text>{selectedOption || 'Please Select Duration'}</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          {options.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownOption}
              onPress={() => selectOption(option)}>
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  header: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    minWidth: 150,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    left: 0,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    minWidth: 150,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export default MonthsDropdown;
