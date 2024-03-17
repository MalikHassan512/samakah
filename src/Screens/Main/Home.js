import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CityTiles,
  Header,
  RankingCards,
  Slider,
  TickCheckBox,
  WinningTeam,
} from '../../Components';
import {Colors} from '../../Constants';
import Styles from '../../Constants/Styles';
import {isIOS} from '../../Constants/Diemensions';
import Images from '../../Constants/Images';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBannersData,
  fetchCompetitionResults,
} from '../../Redux/Slices/HomeSlice';
import {getUserData} from '../../Redux/Slices/UserSlice';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state?.signIn?.data?.api_token);
  const bannersData = useSelector(state => state?.getBannersData?.data);
  const citiesData = useSelector(state => state?.getLocations?.data);
  const weightLossCompetitionsData = useSelector(
    state => state?.fetchCompetitionResults?.data,
  );
  const [genderId, setGenderId] = useState(null);
  const [ageGroupId, setAgeGroupId] = useState(null);
  const [cityId, setCityId] = useState(0);
  const [group, setGroup] = useState('');
  const [genderData, setGenderData] = useState([
    {id: 0, name: 'اناث', selected: false},
    {id: 1, name: 'ذكور', selected: false},
  ]);
  const [ageGroupData, setAgeGroupData] = useState([
    {id: 0, name: 'كبار', selected: false},
    {id: 1, name: 'أطفال', selected: false},
  ]);

  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });

  const handleCheckboxChange = checkboxName => {
    console.log('checkboxName::>>>', checkboxName);

    setCheckboxes(prevCheckboxes => ({
      checkbox1:
        checkboxName === 'checkbox1' ? !prevCheckboxes.checkbox1 : false,
      checkbox2:
        checkboxName === 'checkbox2' ? !prevCheckboxes.checkbox2 : false,

      checkbox3:
        checkboxName === 'checkbox3' ? !prevCheckboxes.checkbox3 : false,
      checkbox4:
        checkboxName === 'checkbox4' ? !prevCheckboxes.checkbox4 : false,
    }));
  };

  const openDrawerFn = () => {
    navigation.toggleDrawer();
  };

  const handleSelectGender = selectedId => {
    console.log('selectedId::>>>', selectedId);
    setGenderId(selectedId);
    setGenderData(prevGenderData =>
      prevGenderData.map(gender =>
        gender.id === selectedId
          ? {...gender, selected: !gender.selected}
          : {...gender, selected: false},
      ),
    );
  };
  const handleAgeGroup = selectedId => {
    setAgeGroupId(selectedId);
    setAgeGroupData(prevGenderData =>
      prevGenderData.map(gender =>
        gender.id === selectedId
          ? {...gender, selected: !gender.selected}
          : {...gender, selected: false},
      ),
    );
  };

  useEffect(() => {
    if (genderId === 0 && ageGroupId === 0) {
      setGroup('female_adults');
    } else if (genderId === 0 && ageGroupId === 1) {
      setGroup('female_children');
    } else if (genderId === 1 && ageGroupId === 0) {
      setGroup('male_adults');
    } else if (genderId === 1 && ageGroupId === 1) {
      setGroup('male_children');
    }
  }, [genderId, ageGroupId]);

  useEffect(() => {
    dispatch(getBannersData(token));
    dispatch(getUserData(token));
  }, []);

  useEffect(() => {
    if (cityId !== 0 && group !== '') {
      dispatch(
        fetchCompetitionResults({
          token: token,
          location_id: cityId,
          group: group,
        }),
      );
    }
  }, [cityId, group]);

  return (
    <ScrollView>
      <View style={Styles.whiteScreen}>
        <Header />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={openDrawerFn}>
            <Image source={Images.threeDots} style={styles.threeDots} />
          </TouchableOpacity>
          <Text style={Styles.text14White}>الرابح الأكبر</Text>
        </View>
        <Slider data={bannersData?.data} />

        <Text style={[Styles.text14Black, styles.checkBoxHeading]}>
          الرابح الأكبر :
        </Text>
        <View style={styles.checkBoxContainer}>
          <View style={styles.checkBoxContainerRow}>
            {genderData?.map((item, index) => (
              <TickCheckBox
                title={item?.name}
                checked={item?.selected}
                onChange={() => handleSelectGender(item?.id)}
              />
            ))}
            <Text style={Styles.text14Black}>الجنس :</Text>
          </View>
          <View style={styles.checkBoxContainerRow}>
            {ageGroupData?.map((item, index) => (
              <TickCheckBox
                title={item?.name}
                checked={item?.selected}
                onChange={() => handleAgeGroup(item?.id)}
              />
            ))}
            <Text style={Styles.text14Black}>العمر :</Text>
          </View>
        </View>
        <View>
          <CityTiles setCityId={setCityId} />
        </View>
        <View>
          {weightLossCompetitionsData?.data?.length > 0 ? (
            <RankingCards
              data={
                weightLossCompetitionsData?.data
                  ? weightLossCompetitionsData?.data
                  : []
              }
            />
          ) : (
            <Text style={styles.noResultsFoundText}>لا تتوافر بيانات</Text>
          )}
        </View>

        <Text style={[Styles.text14Black, styles.checkBoxHeading]}>
          جوائز الشهر
        </Text>

        <WinningTeam />
        <WinningTeam />
        <WinningTeam />
        <WinningTeam />
        <WinningTeam />
      </View>
      <View style={styles.bottomHeight} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.themeColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingVertical: isIOS ? 5 : 20,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  backArrow: {width: 24, height: 24, margin: 10, resizeMode: 'contain'},
  checkBoxContainerRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  checkBoxHeading: {
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  checkBoxContainer: {
    alignItems: 'flex-end',
    alignItems: 'center',
  },
  threeDots: {width: 6, height: 22, margin: 10, resizeMode: 'contain'},
  noResultsFoundText: {textAlign: 'center', marginTop: 20},
  bottomHeight: {height: 50},
});

export default Home;
