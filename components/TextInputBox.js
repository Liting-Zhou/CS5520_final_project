import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, textSizes } from "../helpers/ConstantsHelper";

export default function TextInputBox({
  label,
  value,
  onChangeText,
  placeholder,
  editable = true,
  secureTextEntry = false,
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: textSizes.medium,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
});
