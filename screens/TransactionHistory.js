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
    toAmount
  } = route.params || {};

  // this button will be displayed on the right side of the header to add a new transaction
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton onPress={() => navigation.navigate('AddTransaction')} />
      ),
    });
  }, [navigation]);

  // add a new transaction to the list of transactions
  useEffect(() => {
    if (description && location && date && fromCurrency && toCurrency && fromAmount && toAmount) {
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

      if (id) {
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
          { ...newTransaction, id: Math.random().toString() }
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
