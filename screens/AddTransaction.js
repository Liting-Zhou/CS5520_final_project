import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Alert, Pressable, Text, TextInput } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import RegularButton from "../components/RegularButton";
import TextInputBox from "../components/TextInputBox";
import DateTimePickerComponent from "../components/DateTimePickerComponent";
import DropDownMenu from "../components/DropDownMenu";
import { colors, textSizes } from "../helpers/Constants";
import Entypo from 'react-native-vector-icons/Entypo';
import TrashBinButton from "../components/TrashBinButton";

export default function AddTransaction() {
  const navigation = useNavigation();
  const route = useRoute();
  const { transaction } = route.params || {};

  const [description, setDescription] = useState(transaction?.description || '');
  const [location, setLocation] = useState(transaction?.location || '');
  const [date, setDate] = useState(transaction ? new Date(transaction.date) : null);
  const [fromCurrency, setFromCurrency] = useState(transaction?.fromCurrency || '');
  const [toCurrency, setToCurrency] = useState(transaction?.toCurrency || '');
  const [fromAmount, setFromAmount] = useState(transaction?.fromAmount || '');
  const [toAmount, setToAmount] = useState(transaction?.toAmount || '');

  // use useLayoutEffect to set the header title dynamically based on whether we are adding or editing a transaction
  // also add a delete icon to the right side of the header when editing
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: transaction ? 'Edit Transaction' : 'Add Transaction',
      headerRight: () => (
        transaction && (
          <TrashBinButton onPress={handleDeleteTransaction} />
        )
      ),
    });
  }, [navigation, transaction]);

  // check if all fields are filled out and if the from and to currencies are different
  const handleSaveTransaction = () => {
    if (!description || !location || !date || !fromCurrency || !toCurrency || !fromAmount || !toAmount) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (fromCurrency === toCurrency) {
      Alert.alert("Error", "From Currency and To Currency cannot be the same");
      return;
    }

    const formattedDate = date.toISOString();

    // create a new transaction object
    // give id a random value if it's a new transaction, otherwise use the existing id
    const newTransaction = {
      id: transaction?.id || Math.random().toString(),
      description,
      location,
      date: formattedDate,
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount
    };

    navigation.navigate('TransactionHistory', { transaction: newTransaction });
  };

  const handleDeleteTransaction = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            navigation.navigate('TransactionHistory', { transaction, shouldDelete: true });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionInputWrapper}>
            <TextInputBox 
              label="Description"
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
            />
          </View>
          <Pressable onPress={() => console.log('Camera icon pressed')} style={styles.cameraIcon}>
            <Entypo name="camera" size={24} color="black" />
          </Pressable>
        </View>
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
      <RegularButton onPress={handleSaveTransaction}>
        {transaction ? 'Save Changes' : 'Add Transaction'}
      </RegularButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  descriptionContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionInputWrapper: {
    flex: 1,
  },
  cameraIcon: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
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
