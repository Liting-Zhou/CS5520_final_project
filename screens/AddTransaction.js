import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, TextInput, Alert, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import RegularButton from "../components/RegularButton";
import TextInputBox from "../components/TextInputBox";
import DateTimePickerComponent from "../components/DateTimePickerComponent";
import DropDownMenu from "../components/DropDownMenu"; // import the DropDownMenu component
import { colors, textSizes } from "../helpers/Constants";
import Entypo from 'react-native-vector-icons/Entypo';

export default function AddTransaction() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const navigation = useNavigation();

  // this button is used to add photo for new transaction, will implement later
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Entypo name="camera" size={24} color="black" style={{ marginRight: 15 }} />
      ),
    });
  }, [navigation]);

  // check if all fields are filled and fromCurrency is different from toCurrency, if not, show an alert
  const handleAddTransaction = () => {
    if (!description || !location || !date || !fromCurrency || !toCurrency || !fromAmount || !toAmount) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (fromCurrency === toCurrency) {
      Alert.alert("Error", "From Currency and To Currency cannot be the same");
      return;
    }

    const formattedDate = date.toISOString();
    
    console.log("Transaction added:", { description, location, date: formattedDate, fromCurrency, toCurrency, fromAmount, toAmount });
    navigation.navigate('TransactionHistory', { description, location, date: formattedDate, fromCurrency, toCurrency, fromAmount, toAmount });
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
      <View style={[styles.rowContainer, { zIndex: 1000 }]}>
        <View>
          <Text style={styles.label}>From Currency</Text>
          <DropDownMenu base={fromCurrency} onSelect={setFromCurrency} />
        </View>
        <View style={styles.amountInputContainer}>
          <TextInput
            value={fromAmount}
            onChangeText={setFromAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            style={styles.amountInput}
          />
        </View>
      </View>
      <View style={[styles.rowContainer, { zIndex: 900 }]}>
        <View>
          <Text style={styles.label}>To Currency</Text>
          <DropDownMenu base={toCurrency} onSelect={setToCurrency} />
        </View>
        <View style={styles.amountInputContainer}>
          <TextInput
            value={toAmount}
            onChangeText={setToAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            style={styles.amountInput}
          />
        </View>
      </View>
      <RegularButton onPress={handleAddTransaction}>Add Transaction</RegularButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  label: {
    fontSize: textSizes.medium,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  amountInputContainer: {
    marginTop: 20, 
    width: '30%',
  },
  amountInput: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    paddingVertical: 15,
    fontSize: textSizes.medium,
  },
});
