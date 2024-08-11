import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import AddButton from "../components/AddButton";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { colors, textSizes } from "../helpers/ConstantsHelper";
import TransactionDetail from "../components/TransactionDetail";
import { readTransactionsFromDB } from "../firebase/firebaseHelper";
import { getAuth } from "firebase/auth";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  // Fetch transactions from Firestore when the component mounts or when the screen is focused
  useEffect(() => {
    const fetchTransactions = async () => {
      if (userId) {
        const fetchedTransactions = await readTransactionsFromDB(userId);
        setTransactions(fetchedTransactions);
      }
    };

    if (isFocused) {
      fetchTransactions();
    }
  }, [isFocused, userId]);

  // Set the header right button to add a new transaction
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton
          onPress={() => navigation.navigate("AddTransaction")}
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
    backgroundColor:colors.thirdTheme,
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
