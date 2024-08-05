import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, textSizes } from '../helpers/Constants';

export default function TransactionDetail({ transaction }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.date}>{new Date(transaction.date).toLocaleDateString()}</Text>
        <Text style={styles.location}>{transaction.location}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.currency}>From: {transaction.fromCurrency} {transaction.fromAmount}</Text>
        <Text style={styles.currency}>To: {transaction.toCurrency} {transaction.toAmount}</Text>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    paddingRight: 10,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 35,
  },
  description: {
    fontSize: textSizes.large,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: textSizes.small,
    color: colors.lightGray,
    marginBottom: 5,
  },
  location: {
    fontSize: textSizes.medium,
    color: colors.gray,
    marginBottom: 5,
  },
  currency: {
    fontSize: textSizes.small,
    color: colors.darkGray,
    marginBottom: 5,
  },
});
