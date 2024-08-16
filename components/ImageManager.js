import React, { useRef, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ActionSheet from "react-native-actionsheet";

const ImageManager = ({ imageUriHandler, children }) => {
  const [imageUri, setImageUri] = useState(null);
  const actionSheetRef = useRef(null);

  const options = ["Cancel", "Take Photo", "Choose from Gallery"];
  const cancelButtonIndex = 0;

  const handleImageSelection = async (index) => {
    if (index === 1) {
      // Take Photo
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Camera permission is required to take a photo.");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        imageUriHandler(result.assets[0].uri);
      }
    } else if (index === 2) {
      // Choose from Gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        imageUriHandler(result.assets[0].uri);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View onTouchStart={() => actionSheetRef.current.show()}>
        {children}
      </View>
      <ActionSheet
        ref={actionSheetRef}
        title={"Choose an option"}
        options={options}
        cancelButtonIndex={cancelButtonIndex}
        onPress={(index) => handleImageSelection(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default ImageManager;
