import React, { useRef, useState } from "react";
import { View, Alert, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {colors} from "../helpers/ConstantsHelper";

const ImageManager = ({ imageUriHandler, children }) => {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = ImagePicker.useMediaLibraryPermissions();

  const options = ["Take Photo", "Choose from Gallery"];

  const handleImageSelection = async (index) => {
    setModalVisible(false);

    if (index === 0) {
      // Take Photo
      if (cameraPermission?.status !== "granted") {
        const { status } = await requestCameraPermission();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Camera permission is required to take a photo.");
          return;
        }
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        imageUriHandler(result.assets[0].uri);
      }
    } else if (index === 1) {
      // Choose from Gallery
      if (mediaLibraryPermission?.status !== "granted") {
        const { status } = await requestMediaLibraryPermission();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Media library permission is required to select a photo.");
          return;
        }
      }
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
      <View onTouchStart={() => setModalVisible(true)}>
        {children}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleImageSelection(index)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.modalBackground,
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  optionButton: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: colors.blue,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  cancelText: {
    fontSize: 16,
    color: colors.red,
  },
});

export default ImageManager;
