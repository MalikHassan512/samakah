import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calender, FormQuestionnaires, Header, Reaction} from '../../Components';
import {Colors} from '../../Constants';
import {isIOS} from '../../Constants/Diemensions';
import Styles from '../../Constants/Styles';
import Images from '../../Constants/Images';
import Fonts from '../../Constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getFormData, likeDiskeAnswer} from '../../Redux/Slices/FormSlices';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Routes from '../../Constants/Routes';
import {fetchEvaluationGraphData} from '../../Redux/Slices/GraphSlice';

const Evaluation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showCalender, setShowCalender] = useState(false);
  const token = useSelector(state => state?.signIn?.data?.api_token);
  const [activeDay, setActiveDay] = useState(1);
  const EvalutionformData = useSelector(state => state?.getFormData?.data);

  const [reaction_id, setReaction_id] = useState(0);

  const currentDate = new Date();
  const formattedDate =
    currentDate.getDate() +
    '/' +
    (currentDate.getMonth() + 1) +
    '/' +
    currentDate.getFullYear();
  const weekDayNumber = currentDate.getDay();

  const weekDaysInArabic = [
    {id: 0, name: 'السبت'},
    {id: 1, name: 'الأحد'},
    {id: 2, name: 'الأثنين'},
    {id: 3, name: 'الثلاثاء'},
    {id: 4, name: 'الأربعاء'},
    {id: 5, name: 'الخميس'},
    {id: 6, name: 'الجمعة'},
  ];

  useEffect(() => {
    setActiveDay(weekDayNumber);
  }, []);

  let question_one = [
    {
      bgColor: Colors.purple,
      activeDay: activeDay,
      selectedActiveDay: 5,
    },
    {
      bgColor: Colors.purple,
      activeDay: activeDay,
      selectedActiveDay: 4,
    },
    {
      bgColor: Colors.purple,
      activeDay: activeDay,
      selectedActiveDay: 3,
    },
    {
      bgColor: Colors.purple,
      activeDay: activeDay,
      selectedActiveDay: 2,
    },
    {
      bgColor: Colors.purple,
      activeDay: activeDay,
      selectedActiveDay: 1,
    },
    {
      bgColor: Colors.purple,
      activeDay: activeDay,
      selectedActiveDay: 0,
    },
    {
      bgColor: Colors.purple,
      activeDay: activeDay,
      selectedActiveDay: 6,
    },
  ];

  useEffect(() => {
    dispatch(getFormData(token));
  }, []);

  const onReactionPress = (reaction_id, item) => {
    if (reaction_id !== 0 && reaction_id !== undefined) {
      const formData = new FormData();
      formData.append('form_id', item?.form_id);
      formData.append('question_id', item?.id);
      formData.append('reaction_id', reaction_id);
      console.log('formData:::>>>', formData);

      dispatch(likeDiskeAnswer({formData, token}));
    }
  };

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <Header />
      <View style={styles.headerContainer}>
        <Text style={Styles.text14White}>التقييم الأسبوعي</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.backArrow} style={styles.backArrow} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateContainer}
          onPress={() => setShowCalender(true)}>
          <Image source={Images.arrowDown} style={styles.downArrow} />
          <Text style={Styles.text14Black}>{formattedDate}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekdaysContainer}>
        <Text style={Styles.text10White}>الجمعة</Text>
        <Text style={Styles.text10White}>الخميس</Text>
        <Text style={Styles.text10White}>الأربعاء</Text>
        <Text style={Styles.text10White}>الثلاثاء</Text>
        <Text style={Styles.text10White}>الأثنين</Text>
        <Text style={Styles.text10White}>الأحد</Text>
        <Text style={Styles.text10White}>السبت</Text>
      </View>

      <View style={styles.rowContainer}>
        <FlatList
          data={EvalutionformData}
          renderItem={({item}) => {
            let result = question_one.map(obj => ({
              ...obj,
              IsLikedAlready:
                item?.responses[daysOfWeek[obj?.selectedActiveDay]],
            }));
            return (
              <>
                <Text style={styles.titleTxt}>{item?.title}</Text>
                <FlatList
                  data={result}
                  horizontal
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    flex: 1,
                    zIndex: -10000,
                    marginHorizontal: widthPercentageToDP(2),
                  }}
                  renderItem={({item: questionItem}) => {
                    // Renamed to questionItem to avoid confusion
                    return (
                      <>
                        <Reaction
                          bgColor={questionItem?.bgColor}
                          activeDay={questionItem?.activeDay}
                          selectedActiveDay={questionItem.selectedActiveDay}
                          onPress={id => onReactionPress(id, item)}
                          parentItem={item} // Pass the parent item data to Reaction component
                          setReaction_id={setReaction_id}
                          like={
                            questionItem?.IsLikedAlready
                              ? questionItem?.IsLikedAlready
                              : 2
                          }
                          type={item?.type}
                        />
                      </>
                    );
                  }}
                />
              </>
            );
          }}
        />
      </View>

      {showCalender && (
        <Calender
          showCalender={showCalender}
          setShowCalender={setShowCalender}
        />
      )}

      <View style={{marginTop: 30}}>
        <Button
          title=" الحصول على النتائج"
          color={Colors.themeColor}
          onPress={() => {
            navigation.navigate(Routes?.EvaluationGraph);
            dispatch(fetchEvaluationGraphData({token}));
          }}
        />
      </View>

      <View style={styles.bottomHeight} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {paddingBottom: 50, backgroundColor: Colors.white},
  headerContainer: {
    backgroundColor: Colors.themeColor,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingVertical: isIOS ? 5 : 20,
  },
  backArrow: {
    width: 24,
    height: 24,
    margin: 10,
    resizeMode: 'contain',
    padding: 5,
  },
  dateContainer: {
    backgroundColor: Colors.white,
    position: 'absolute',
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 10,
  },
  downArrow: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 5,
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.themeColor,
    paddingVertical: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 5,
  },
  titleTxt: {
    alignSelf: 'flex-end',
    marginTop: 20,
    fontFamily: Fonts.TajawalRegular,
    fontWeight: 500,
    color: Colors.black,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    marginTop: 10,
  },
  lightText: {
    fontSize: 12,
    color: Colors.greyText,
    fontWeight: '500',
    fontFamily: Fonts.TajawalRegular,
  },
  bottomHeight: {height: 100},
});

export default Evaluation;
