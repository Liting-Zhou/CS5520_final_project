import React from 'react';
import { View } from 'react-native';
// using the action sheet from expo
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';

const ImageManager = ({ imageUriHandler, children, triggerActionSheet }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = ImagePicker.useMediaLibraryPermissions();

  // Function to handle the image selection from the camera or gallery
  const handleImageSelection = async (index) => {
    // if the user selects the camera option, check if the camera permission is granted
    if (index === 0) {
      if (cameraPermission?.status !== "granted") {
        const { status } = await requestCameraPermission();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Camera permission is required to take a photo.");
          return;
        }
      }
      // launch the camera and get the image uri
      const result = await ImagePicker.launchCameraAsync({ allowsEditing: false });
      if (!result.canceled) {
        imageUriHandler(result.assets[0].uri);
      }
      // if the user selects the gallery option, check if the media library permission is granted
    } else if (index === 1) {
      if (mediaLibraryPermission?.status !== "granted") {
        const { status } = await requestMediaLibraryPermission();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Media library permission is required to select a photo.");
          return;
        }
      }
      // launch the image library and get the image uri
      const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
      if (!result.canceled) {
        imageUriHandler(result.assets[0].uri);
      }
    }
  };

  // Function to show the action sheet with the options
  const showActionSheet = () => {
    console.log("showActionSheet");
    const options = ['Take Photo', 'Choose from Gallery', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButtonIndex) {
          handleImageSelection(buttonIndex);
        }
      }
    );
  };

  if (triggerActionSheet) {
    triggerActionSheet(showActionSheet);
  }

  return <View>{children}</View>;
};

export default ImageManager;
