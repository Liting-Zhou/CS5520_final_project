import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import AddButton from "../components/AddButton";
import { useNavigation, useRoute } from '@react-navigation/native';
import { textSizes } from "../helpers/Constants";
import TransactionDetail from "../components/TransactionDetail";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {
    id,
    description,
    location,
    date,
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    delete: shouldDelete
  } = route.params || {};

  // this button will be displayed on the right side of the header to add a new transaction
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton onPress={() => navigation.navigate('AddTransaction')} />
      ),
    });
  }, [navigation]);

  // add or edit a transaction, or delete a transaction
  useEffect(() => {
    if (shouldDelete && id) {
      // Delete the transaction
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    } else if (description && location && date && fromCurrency && toCurrency && fromAmount && toAmount) {
      const newTransaction = {
        id,
        description,
        location,
        date,
        fromCurrency,
        toCurrency,
        fromAmount,
        toAmount
      };
      if (id && transactions.some(transaction => transaction.id === id)) {
        // Edit existing transaction
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.id === id ? newTransaction : transaction
          )
        );
      } else {
        // Add new transaction
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          newTransaction
        ]);
      }
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your exchange transaction history:</Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionDetail transaction={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: textSizes.medium,
    marginBottom: 20,
    textAlign: 'center',
  },
});
