import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import AddButton from "../components/AddButton";
import { useNavigation, useRoute } from '@react-navigation/native';
import { textSizes } from "../helpers/Constants";

export default function TransactionHistory() {
  const navigation = useNavigation();
  const route = useRoute();
  const { description, location, date } = route.params || {};

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
      <Text style={styles.text}>Your exchange transaction history:</Text>
      {description && <Text style={styles.item}>Description: {description}</Text>}
      {location && <Text style={styles.item}>Location: {location}</Text>}
      {date && <Text style={styles.item}>Date: {new Date(date).toLocaleDateString()}</Text>}
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
    fontSize: textSizes.medium,
  },
  item: {
    fontSize: textSizes.small,
    marginTop: 10,
  },
});
