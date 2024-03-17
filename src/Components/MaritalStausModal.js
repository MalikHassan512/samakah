import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import Fonts from '../Constants/Fonts';
import {Colors} from '../Constants';
import {Divider} from 'react-native-paper';
import Images from '../Constants/Images';

const MaritalStausModal = ({modalVisible, setModalVisible, setValue}) => {
  const ImageAndTitle = ({title, image}) => {
    return (
      <TouchableOpacity
        style={styles.comContainer}
        onPress={() => {
          setValue(title), setModalVisible(false);
        }}>
        <Text style={styles.comTitle}>{title}</Text>
        <View style={styles.imgeBg}>
          <Image source={image} style={styles.image} />
        </View>
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
          onPress={() => setModalVisible(false)}></TouchableOpacity>
        <View style={styles.wrapperContainer}>
          <View style={styles.solidPart}>
            <View style={styles.topContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image source={Images.closeIcon} style={styles.closeIcon} />
              </TouchableOpacity>
              <Text style={styles.titleTxt}>الحالة الإجتماعية</Text>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.contentContainer}>
              <ImageAndTitle title="أعزب" image={Images.juniorHighSchool} />

              <ImageAndTitle title="متزوج" image={Images.marriedCouple} />

              <ImageAndTitle title="أرملة" image={Images.personFeeding} />
              <ImageAndTitle title="مُطلّق" image={Images.female} />
            </View>
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
    fontSize: 16,
    color: Colors.black,
    marginRight: 10,
  },
  imgeBg: {
    backgroundColor: Colors.imageBG,
    padding: 5,
    borderRadius: 10,
  },
  image: {width: 36, height: 36, resizeMode: 'contain'},
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
    padding: 20,
    marginTop: -10,
  },
});

export default MaritalStausModal;
