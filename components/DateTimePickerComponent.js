import React, { useState } from "react";
import { StyleSheet, View, TextInput, Pressable, Modal, Platform } from "react-native";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { colors } from "../helpers/ConstantsHelper";

const DateTimePickerComponent = ({ date, setDate }) => {
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(date || new Date());

  // This function is called when the user selects a date from the date picker
  // It updates the date state with the selected date and closes the date picker
  const handleDateChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      setTempDate(selectedDate);
    }
  };

  // This function is called when the user presses the input field
  // the default date is the current date
  const showMode = () => {
    if (Platform.OS === "android") {
      // For Android, directly open the DateTimePicker
      DateTimePickerAndroid.open({
        value: tempDate,
        onChange: handleDateChange,
        mode: "date",
        display: "calendar",
      });
    } else {
      // For iOS, show the modal with the DateTimePicker inside
      setShow(true);
      setTempDate(date || new Date());
    }
  };


  // This function is called when the user clicks outside the date picker
  // It closes the date picker and resets the date state to the previous value
  const handleOutsideClick = () => {
    setShow(false);
    setDate(tempDate);
  };

  return (
    <View>
      <Pressable onPress={showMode}>
        <View pointerEvents="none">
          <TextInput
            value={date ? date.toLocaleDateString() : ""}
            placeholder="Select date"
            editable={false}
            style={styles.input}
          />
        </View>
      </Pressable>
      <Modal
        transparent={true}
        animationType="fade"
        visible={show}
        onRequestClose={handleOutsideClick}
      >
        <Pressable style={styles.modalOverlay} onPress={handleOutsideClick}>
          <View style={styles.modalContent}>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display={"inline"}
              onChange={handleDateChange}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.modalOverlay,
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
  },
});

export default DateTimePickerComponent;
