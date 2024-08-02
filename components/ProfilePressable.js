import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const ProfilePressable = ({ onPress, children }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
      <FontAwesome name="chevron-right" size={12} color="gray" style={styles.chevron} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
    width: '90%',
    marginVertical: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    marginLeft: 'auto',
  },
});

export default ProfilePressable;
