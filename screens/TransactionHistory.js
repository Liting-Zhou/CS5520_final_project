import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AddButton from "../components/AddButton";
import { useNavigation } from '@react-navigation/native';

export default function TransactionHistory() {
  const navigation = useNavigation();

  // this button will be displayed on the right side of the header to add a new transaction
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton onPress={() => navigation.navigate('AddTransaction')} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Transaction History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});
