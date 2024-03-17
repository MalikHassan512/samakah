import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import Fonts from '../Constants/Fonts';
import {Colors} from '../Constants';
import {Divider} from 'react-native-paper';
import Images from '../Constants/Images';

const Cities = [
  {title: 'الدمام', id: 1},
  {title: 'جدة', id: 2},
  {title: 'الرياض', id: 3},
  {title: 'مكة', id: 4},
  {title: 'المدينة المنورة', id: 5},
  {title: 'الشرقية', id: 6},
  {title: 'الكل', id: 7},
];

const Regions = [
  {title: 'الغرب', englishTitle: 'West', id: 1},
  {title: 'شرق', englishTitle: 'East', id: 2},
  {title: 'شمال', englishTitle: 'North', id: 3},
  {title: 'جنوب', englishTitle: 'South', id: 4},
];

const ChronicDieases = [
  {title: 'أمراض القلب', id: 5, englishTitle: 'Heart diseases'},
  {title: 'أمراض الجهاز التنفسي', id: 6, englishTitle: 'Respiratory diseases'},
  {title: 'السمنة', id: 7, englishTitle: 'obesity'},
  {title: 'مرض السكري', id: 8, englishTitle: 'diabetes'},
  {title: 'أمراض المناعة الذاتية', id: 9, englishTitle: 'Autoimmune diseases'},
  {title: 'الفشل الكلوي', id: 10, englishTitle: 'kidney failure'},
  {title: 'عقلي', id: 11, englishTitle: 'Mental'},
];

const CitiesDropDown = ({
  modalVisible,
  setModalVisible,
  setValue,
  setLocationID,
  data,
  isRegion,
  setRegion,
  setRegionInArabic,
  setIsRegion,
  isChronicDieasesModal,
  setIsChronicDieasesModal,
  setChronicDieasesId,
}) => {
  const ImageAndTitle = ({title, id, englishTitle}) => {
    const onPressCity = () => {
      {
        setValue(title);
        setLocationID(id);
        setModalVisible(false);
      }
    };

    const onPressRegion = () => {
      setRegion(englishTitle);
      setRegionInArabic(title);
      setModalVisible(false);
      setIsRegion(false);
    };

    const onPressChronicDieases = () => {
      setChronicDieasesId(id);
      setModalVisible(false);
      setIsChronicDieasesModal(false);
    };

    return (
      <TouchableOpacity
        style={styles.comContainer}
        onPress={
          isChronicDieasesModal
            ? onPressChronicDieases
            : isRegion
            ? onPressRegion
            : onPressCity
        }>
        <Text style={styles.comTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.transparentContainer}>
        <TouchableOpacity
          style={styles.dismissPart}
          onPress={() => {
            setModalVisible(false);
            setIsRegion(false);
            setIsChronicDieasesModal(false);
          }}></TouchableOpacity>
        <View style={styles.wrapperContainer}>
          <View style={styles.solidPart}>
            <View style={styles.topContainer}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setIsRegion(false);
                  setIsChronicDieasesModal(false);
                }}>
                <Image source={Images.closeIcon} style={styles.closeIcon} />
              </TouchableOpacity>
              {isChronicDieasesModal ? (
                <Text style={styles.titleTxt}>الأمراض المزمنة</Text>
              ) : (
                <Text style={styles.titleTxt}>حدد لك المدينة</Text>
              )}
            </View>

            <Divider style={styles.divider} />

            <FlatList
              data={
                isChronicDieasesModal
                  ? ChronicDieases
                  : isRegion
                  ? Regions
                  : Cities
              }
              renderItem={({item}) => (
                <ImageAndTitle
                  title={item.title}
                  id={item.id}
                  englishTitle={item?.englishTitle}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  transparentContainer: {flex: 1},
  dismissPart: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  wrapperContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  solidPart: {
    backgroundColor: Colors.white,
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -10,
    paddingVertical: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  closeIcon: {width: 24, height: 24, resizeMode: 'contain'},
  titleTxt: {
    fontWeight: 500,
    fontFamily: Fonts.TajawalRegular,
    color: Colors.black,
  },
  divider: {marginVertical: 20, height: 3, opacity: 0.4},
  comContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  comTitle: {
    fontFamily: Fonts.TajawalRegular,
    fontSize: 18,
    color: Colors.black,
    marginRight: 20,
    marginTop: 10,
  },

  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
    padding: 20,
    marginTop: -10,
  },
});

export default CitiesDropDown;
