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
  const { transaction, shouldDelete } = route.params || {};

  // this button will be displayed on the right side of the header to add a new transaction
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton onPress={() => navigation.navigate('AddTransaction')} />
      ),
    });
  }, [navigation]);

  // add, edit or delete a transaction
  useEffect(() => {
    console.log(transaction);
    if (shouldDelete && transaction?.id) {
      // Delete the transaction
      setTransactions((prevTransactions) =>
        prevTransactions.filter((t) => t.id !== transaction.id)
      );
    } else if (transaction) {
      if (transactions.some((t) => t.id === transaction.id)) {
        // Edit existing transaction
        setTransactions((prevTransactions) =>
          prevTransactions.map((t) =>
            t.id === transaction.id ? transaction : t
          )
        );
      } else {
        // Add new transaction
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          transaction
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
