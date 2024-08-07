import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, textSizes } from "../helpers/ConstantsHelper";

export default function TransactionDetail({ transaction }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("AddTransaction", { transaction });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: pressed ? colors.lightGray : colors.white },
      ]}
      android_ripple={{ color: colors.lightGray }}
    >
      <View style={styles.leftColumn}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.date}>
          {new Date(transaction.date).toLocaleDateString()}
        </Text>
        <Text style={styles.location}>{transaction.location}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.currency}>
          From: {transaction.fromAmount} {transaction.fromCurrency}
        </Text>
        <Text style={styles.currency}>
          To: {transaction.toAmount} {transaction.toCurrency}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    flex: 1,
    paddingRight: 10,
  },
  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: 35,
  },
  description: {
    fontSize: textSizes.large,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: textSizes.small,
    color: colors.gray,
    marginBottom: 5,
  },
  location: {
    fontSize: textSizes.small,
    color: colors.gray,
    marginBottom: 5,
  },
  currency: {
    fontSize: textSizes.small,
    color: colors.darkGray,
    marginBottom: 5,
  },
});
