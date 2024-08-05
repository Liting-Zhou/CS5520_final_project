import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import RegularButton from "../components/RegularButton";
import TextInputBox from "../components/TextInputBox";
import DateTimePickerComponent from "../components/DateTimePickerComponent";
import { textSizes } from "../helpers/Constants";

export default function AddTransaction() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(null);
  const navigation = useNavigation();

  const handleAddTransaction = () => {
    console.log("Transaction added:", { description, location, date });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInputBox 
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <DateTimePickerComponent
          date={date}
          setDate={setDate}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInputBox
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
        />
      </View>
      <RegularButton onPress={handleAddTransaction}>Add Transaction</RegularButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: textSizes.medium,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 15, // 添加适当的间距
  },
});
