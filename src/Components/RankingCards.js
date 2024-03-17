import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';
import {Colors} from '../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styles from '../Constants/Styles';
import Images from '../Constants/Images';
import Fonts from '../Constants/Fonts';
import {isIOS} from '../Constants/Diemensions';

const RankingCards = ({data}) => {
  const calculateAge = dateOfBirth => {
    const dob = new Date(dateOfBirth);
    const now = new Date();

    const yearsDiff = now.getFullYear() - dob.getFullYear();
    const monthsDiff = now.getMonth() - dob.getMonth();

    if (monthsDiff < 0 || (monthsDiff === 0 && now.getDate() < dob.getDate())) {
      return yearsDiff - 1;
    } else {
      return yearsDiff;
    }
  };

  const TitleAndDetaiils = ({title, details}) => {
    return (
      <View style={styles.titleAndDetailsContainer}>
        <Text style={[Styles.text14Black, styles.detailText]}>{details}</Text>
        <Text style={[Styles.text14Black, styles.tileTxt]}>{title}</Text>
      </View>
    );
  };

  const AddtoFavButton = ({title}) => {
    return (
      <View style={styles.btnContainer}>
        <Image source={Images.whiteHeart} style={styles.heartIcon} />
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{transform: [{scaleX: -1}], marginHorizontal: 10}}>
      {data[0]?.positions?.map((item, index) => (
        <View
          style={[
            styles.cardContainer,
            {transform: [{scaleX: -1}], zIndex: 100 - index},
          ]}
          key={index}>
          <View style={[styles.greyContainer, Styles.borderRadiusTop10]}>
            <Image source={Images.personInCard} style={styles.personImage} />
            <View style={styles.rankingNumberCon}>
              <Image source={Images.rankingBadge} style={styles.rankingBagde} />
            </View>

            <Text style={styles.rankingNumberTxt}>{item.position_no}</Text>
          </View>
          <View style={[Styles.borderRadiusBottom10, styles.whiteContainer]}>
            <TitleAndDetaiils title={'الاسم'} details={item.name} />

            <TitleAndDetaiils
              title={'العمر'}
              details={calculateAge(item?.dob)}
            />

            <TitleAndDetaiils title={'خسارة الوزن'} details={item.weight} />

            <AddtoFavButton title={'اضافة الى المفضلة'} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 10,
    width: wp('30%'),
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  greyContainer: {
    paddingVertical: 2,
    backgroundColor: Colors.greyBackground,
  },
  whiteContainer: {
    backgroundColor: Colors.white,
    paddingBottom: 8,
  },
  personImage: {
    width: 60,
    height: 98,
    alignSelf: 'center',
    marginTop: 5,
    resizeMode: 'contain',
  },
  rankingNumberCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
  },
  rankingBagde: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },

  titleAndDetailsContainer: {
    marginTop: 10,
    marginHorizontal: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnContainer: {
    height: 20,
    marginTop: 5,
    alignSelf: 'center',
    backgroundColor: Colors.themeColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  detailText: {fontSize: 8, color: Colors.themeColor},
  tileTxt: {fontSize: 9},
  heartIcon: {width: 10, height: 10, alignSelf: 'center', marginEnd: 5},
  buttonTitle: {color: Colors.white, fontSize: 8},
  rankingNumberTxt: {
    position: 'absolute',
    left: 8,
    top: isIOS ? 4 : 0,
    fontSize: 12,
    fontFamily: Fonts.TajawalRegular,
  },
});

export default RankingCards;
