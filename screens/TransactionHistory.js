import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import AddButton from "../components/AddButton";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { textSizes } from "../helpers/ConstantsHelper";
import TransactionDetail from "../components/TransactionDetail";
import { readTransactionsFromDB } from "../firebase/firebaseHelper";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const userId = "User1";

  // Fetch transactions from Firestore when the component mounts or when the screen is focused
  useEffect(() => {
    const fetchTransactions = async () => {
      const fetchedTransactions = await readTransactionsFromDB(userId);
      setTransactions(fetchedTransactions);
    };

    if (isFocused) {
      fetchTransactions();
    }
  }, [isFocused]);

  // Set the header right button to add a new transaction
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton
          onPress={() => navigation.navigate("AddTransaction", { userId })}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your exchange transaction history:</Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("AddTransaction", {
                userId,
                transaction: item,
              })
            }
          >
            <TransactionDetail transaction={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
});
