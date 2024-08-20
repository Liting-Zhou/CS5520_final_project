import React from "react";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// this component is used in the Header component to navigate back to the previous screen
const ChevronBackButton = ({ color = "black", size = 24, style = {}, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          marginLeft: 10,
          opacity: pressed ? 0.5 : 1, 
          ...style,
        },
      ]}
      android_ripple={{ color: 'lightgray' }} 
    >
      <Ionicons name="chevron-back" size={size} color={color} />
    </Pressable>
  );
};

export default ChevronBackButton;
