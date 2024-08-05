import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import RegularButton from "../components/RegularButton";
import TextInputBox from "../components/TextInputBox";
import DateTimePickerComponent from "../components/DateTimePickerComponent";
import { textSizes } from "../helpers/Constants";
import Entypo from 'react-native-vector-icons/Entypo';

export default function AddTransaction() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(null);
  const navigation = useNavigation();

  // this button is used to add photo for new transaction, will implement later
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Entypo name="camera" size={24} color="black" style={{ marginRight: 15 }} />
      ),
    });
  }, [navigation]);

  // check if all fields are filled, if not, show an alert
  const handleAddTransaction = () => {
    if (!description || !location || !date) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    
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
    marginBottom: 15,
  },
});
