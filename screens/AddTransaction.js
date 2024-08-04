import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import RegularButton from "../components/RegularButton";
import TextInputBox from "../components/TextInputBox";

export default function AddTransaction() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();

  const handleAddTransaction = () => {
    // Handle the transaction logic here, like saving to a database
    console.log("Transaction added:", { description, location, date });
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInputBox
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />
        <TextInputBox
        label="Date"
        value={date}
        onChangeText={setDate}
        placeholder="Enter date"
      />
      <TextInputBox
        label="Location"
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
      />
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
});
