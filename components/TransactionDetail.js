import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, textSizes } from '../helpers/Constants';

export default function TransactionDetail({ transaction }) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{transaction.description}</Text>
      <Text style={styles.location}>{transaction.location}</Text>
      <Text style={styles.date}>{new Date(transaction.date).toLocaleDateString()}</Text>
      <Text style={styles.currency}>From:  {transaction.fromCurrency} {transaction.fromAmount}</Text>
      <Text style={styles.currency}>To:  {transaction.toCurrency} {transaction.toAmount}</Text>
    </View>
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
  },
  description: {
    borderColor: colors.gray,
    fontSize: textSizes.large,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: textSizes.medium,
    color: colors.gray,
  },
  date: {
    fontSize: textSizes.small,
    color: colors.lightGray,
  },
  currency: {
    fontSize: textSizes.small,
    color: colors.darkGray,
  },
});
