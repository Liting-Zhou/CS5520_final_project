import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import RegularButton from "../components/RegularButton";

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
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <RegularButton  onPress={handleAddTransaction}>Add Transaction</RegularButton>
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
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
