import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View, Alert, Pressable, Text, TextInput } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import RegularButton from "../components/RegularButton";
import TextInputBox from "../components/TextInputBox";
import DateTimePickerComponent from "../components/DateTimePickerComponent";
import DropDownMenu from "../components/DropDownMenu";
import { colors, textSizes } from "../helpers/Constants";
import Entypo from 'react-native-vector-icons/Entypo';
import TrashBinButton from "../components/TrashBinButton";
import { writeTransactionToDB, updateTransactionInDB, deleteTransactionFromDB } from '../firebase/firebaseHelper';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';

export default function AddTransaction() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId = "User1", transactionId } = route.params || {};

  const [transaction, setTransaction] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  useEffect(() => {
    if (transactionId) {
      fetchTransaction();
    }
  }, [transactionId]);

  const fetchTransaction = async () => {
    try {
      const transactionDocRef = doc(db, `users/${userId}/transactions`, transactionId);
      const transactionDoc = await getDoc(transactionDocRef);
      if (transactionDoc.exists()) {
        const transactionData = transactionDoc.data();
        setTransaction(transactionData);
        setDescription(transactionData.description);
        setLocation(transactionData.location);
        setDate(new Date(transactionData.date));
        setFromCurrency(transactionData.fromCurrency);
        setToCurrency(transactionData.toCurrency);
        setFromAmount(transactionData.fromAmount);
        setToAmount(transactionData.toAmount);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching transaction: ", error);
    }
  };

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

  const handleSaveTransaction = async () => {
    if (!description || !location || !date || !fromCurrency || !toCurrency || !fromAmount || !toAmount) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (fromCurrency === toCurrency) {
      Alert.alert("Error", "From Currency and To Currency cannot be the same");
      return;
    }

    const formattedDate = date.toISOString();

    const newTransaction = {
      description,
      location,
      date: formattedDate,
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount
    };

    try {
      if (transaction) {
        newTransaction.id = transaction.id;
        await updateTransactionInDB(userId, newTransaction);
      } else {
        const newTransactionId = await writeTransactionToDB(userId, newTransaction);
        newTransaction.id = newTransactionId;
      }
      navigation.navigate('TransactionHistory', { transaction: newTransaction });
    } catch (error) {
      console.error("Error saving transaction: ", error);
      Alert.alert("Error", "There was a problem saving your transaction.");
    }
  };

  const handleDeleteTransaction = async () => {
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
          onPress: async () => {
            try {
              await deleteTransactionFromDB(userId, transaction.id);
              navigation.navigate('TransactionHistory', { shouldDelete: true });
            } catch (error) {
              console.error("Error deleting transaction: ", error);
              Alert.alert("Error", "There was a problem deleting your transaction.");
            }
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
