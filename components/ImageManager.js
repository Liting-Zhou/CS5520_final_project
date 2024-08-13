import React, { useState } from "react";
import { View, Pressable, Alert, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Entypo from "react-native-vector-icons/Entypo";

const ImageManager = ({ imageUriHandler }) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);

  const verifyPermissions = async () => {
    if (status?.granted) {
      return true;
    }
    const { granted } = await requestPermission();
    return granted;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      Alert.alert("You need to grant camera permissions to use this app.");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      setImageUri(result.assets[0].uri);
      imageUriHandler(result.assets[0].uri);
    } catch (e) {
      console.error("Error taking image:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={takeImageHandler}
        style={styles.cameraIcon}
      >
        <Entypo name="camera" size={24} color="black" />
      </Pressable>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
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
