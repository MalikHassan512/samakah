import {View, Text, Modal, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

const DatePickerModal = ({modalVisible, setModalVisible, setValue}) => {
  const [date, setDate] = useState(new Date());

  const handleDone = () => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setValue(formattedDate);
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="date"
            androidVariant="nativeAndroid"
            textColor="black"
            fadeToColor="none"
            style={styles.pickerStyle}
            maximumDate={new Date()}
          />
          <View style={styles.cancelContainer}>
            <Text
              onPress={() => setModalVisible(false)}
              style={styles.cancelText}>
              Cancel
            </Text>
            <Text onPress={handleDone} style={styles.doneText}>
              Done
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  cancelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  cancelText: {color: 'red', fontSize: 18},
  doneText: {color: 'green', fontSize: 18},
  pickerStyle: {width: 300},
});

export default DatePickerModal;
