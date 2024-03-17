import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, StyleSheet, Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../Constants';
import Images from '../Constants/Images';

const dummyData = [
  {
    id: 1,
    dummyImage: Images.banner0,
  },
  {
    id: 2,
    dummyImage: Images.banner0,
  },
  {
    id: 3,
    dummyImage: Images.banner0,
  },
];

const Slider = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderData, setSliderData] = useState();

  useEffect(() => {
    if (data !== undefined) {
      if (data?.length > 0) {
        setSliderData(data);
      } else {
        setSliderData(dummyData);
      }
    } else {
      setSliderData(dummyData);
    }
  }, [data]);

  const renderItem = ({item}) => {
    return (
      <Pressable style={styles.itemContainer}>
        {item?.image_path ? (
          <Image source={{uri: item.image_path}} style={styles.image} />
        ) : (
          <Image source={item?.dummyImage} style={styles.image} />
        )}
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={sliderData}
          horizontal
          pagingEnabled
          onScroll={event => {
            const viewSize = event.nativeEvent.layoutMeasurement.width;
            const contentOffset = event.nativeEvent.contentOffset.x;

            const currentIndex = Math.round(contentOffset / viewSize);
            setCurrentIndex(currentIndex);
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />

        {/* show dots */}
        <View style={styles.dotsContainer}>
          {sliderData?.map((image, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentIndex == index
                      ? Colors.themeColor
                      : Colors.greyBackground,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
    height: hp('23%'),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    resizeMode: 'contain',
    alignContent: 'center',
    borderRadius: 10,
  },
  itemContainer: {
    borderColor: Colors.greyBackground,
    borderWidth: 1,
    borderRadius: 10,
    width: wp('85%'),
    height: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    padding: 3,
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 20,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

export default Slider;
