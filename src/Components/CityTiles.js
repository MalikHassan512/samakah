import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Colors} from '../Constants';
import Styles from '../Constants/Styles';

const cities = [
  {city: 'الدمام', id: 1},
  {city: 'جدة', id: 2},
  {city: 'الرياض', id: 3},
  {city: 'مكة', id: 4},
  {city: 'المدينة المنورة', id: 5},
  {city: 'الشرقية', id: 6},
  {city: 'القلوية', id: 7},
];

const CityTiles = ({setCityId}) => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityClick = city => {
    setSelectedCity(city?.city);
    setCityId(city?.id);
  };
  return (
    <ScrollView
      style={[styles.scrollView, {transform: [{scaleX: -1}]}]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {cities.map((city, index) => (
        <TouchableOpacity
          key={index}
          style={[
            {transform: [{scaleX: -1}], zIndex: 100 - index},
            styles.cityContainer,
            selectedCity === city.city && styles.selectedCityContainer,
          ]}
          onPress={() => handleCityClick(city)}>
          <Text
            style={[
              styles.cityText,
              Styles.text14Black,
              {fontSize: 12, color: Colors.lightBlackTextColor},
              selectedCity === city.city && styles.selectedCityText,
            ]}>
            {city.city}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cityContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.greyBackground,
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 30,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCityContainer: {
    backgroundColor: Colors.themeColor,
  },
  cityText: {
    color: Colors.black,
  },
  selectedCityText: {
    color: Colors.white,
  },
});

export default CityTiles;
