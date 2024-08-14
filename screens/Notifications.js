import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { textSizes, colors } from "../helpers/ConstantsHelper";
import NotificationItem from "../components/NotificationItem";

export default function Notifications() {
  const [items, setItems] = useState([
    { from: "USD", to: "CNY", rate: 7.0101 },
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notify me when:</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <NotificationItem item={item} />}
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
    backgroundColor: colors.thirdTheme,
  },
  text: {
    fontSize: textSizes.medium,
    marginBottom: 20,
    // textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
});
