import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function TrashBinButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
      <AntDesign name="delete" size={24} color="black" style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
  },
});
