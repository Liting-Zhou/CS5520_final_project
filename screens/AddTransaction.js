import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import RegularButton from "../components/RegularButton";
import TextInputBox from "../components/TextInputBox";
import DateTimePickerComponent from "../components/DateTimePickerComponent";
import DropDownMenu from "../components/DropDownMenu";
import { colors, textSizes } from "../helpers/ConstantsHelper";
import Entypo from "react-native-vector-icons/Entypo";
import TrashBinButton from "../components/TrashBinButton";
import {
  writeTransactionToDB,
  updateTransactionInDB,
  deleteTransactionFromDB,
} from "../firebase/firebaseHelper";
import { getAuth } from "firebase/auth";

export default function AddTransaction() {
  const navigation = useNavigation();
  const route = useRoute();
  const { transaction } = route.params || {};
  const transactionId = transaction ? transaction.id : undefined;

  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  // Initialize the state variables for the transaction information
  const [description, setDescription] = useState(
    transaction ? transaction.description : ""
  );
  const [location, setLocation] = useState(
    transaction ? transaction.location : ""
  );
  const [date, setDate] = useState(
    transaction ? new Date(transaction.date) : null
  );
  const [fromCurrency, setFromCurrency] = useState(
    transaction ? transaction.fromCurrency : ""
  );
  const [toCurrency, setToCurrency] = useState(
    transaction ? transaction.toCurrency : ""
  );
  const [fromAmount, setFromAmount] = useState(
    transaction ? transaction.fromAmount : ""
  );
  const [toAmount, setToAmount] = useState(
    transaction ? transaction.toAmount : ""
  );

  // Set the header title and right button based on whether the transaction is new or existing
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: transactionId ? "Edit Transaction" : "Add Transaction",
      headerRight: () =>
        transactionId && <TrashBinButton onPress={handleDeleteTransaction} />,
    });
  }, [navigation, transactionId]);

  // Save the transaction to Firestore
  const handleSaveTransaction = async () => {
    if (
      !description ||
      !location ||
      !date ||
      !fromCurrency ||
      !toCurrency ||
      !fromAmount ||
      !toAmount
    ) {
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
      toAmount,
    };

    try {
      // If transactionId exists, update the transaction in Firestore
      if (transactionId) {
        newTransaction.id = transactionId;
        await updateTransactionInDB(userId, newTransaction);
      } else {
        // If transactionId does not exist, write a new transaction to Firestore
        const newTransactionId = await writeTransactionToDB(
          userId,
          newTransaction
        );
        newTransaction.id = newTransactionId;
      }
      navigation.navigate("TransactionHistory");
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
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTransactionFromDB(userId, transactionId);
              navigation.navigate("TransactionHistory");
            } catch (error) {
              console.error("Error deleting transaction: ", error);
              Alert.alert(
                "Error",
                "There was a problem deleting your transaction."
              );
            }
          },
        },
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
          <Pressable
            onPress={() => console.log("Camera icon pressed")}
            style={styles.cameraIcon}
          >
            <Entypo name="camera" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <DateTimePickerComponent date={date} setDate={setDate} />
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
        {transactionId ? "Save Changes" : "Add Transaction"}
      </RegularButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.thirdTheme,
  },
  descriptionContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  amountInputContainer: {
    marginTop: 20,
    width: "30%",
  },
  amountInput: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    paddingVertical: 15,
    fontSize: textSizes.medium,
  },
});
