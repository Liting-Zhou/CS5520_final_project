import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import TrashBinButton from "./TrashBinButton";
import { colors, textSizes } from "../helpers/ConstantsHelper";
import { useNavigation } from "@react-navigation/native";

export default function NotificationItem({ item }) {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("AddNotification", { item });
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
      {/* <View style={styles.container}> */}
      <AntDesign name="edit" size={24} color={colors.fourthTheme} />

      <Text>
        {item.from} to {item.to} exchange rate exceeds{" "}
        <Text style={{ fontWeight: "bold" }}>
          {Number(item.threshold).toFixed(4)}
        </Text>
      </Text>
      {/* </View> */}
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
    alignItems: "center",
  },
});
