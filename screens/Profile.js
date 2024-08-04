import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfilePressable from '../components/ProfilePressable';
import defaultUserPhoto from '../assets/default_user_photo.jpg';

export default function Profile() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('username@example.com');
  const navigation = useNavigation();

  const updateProfile = (newName, newEmail, newPhoto) => {
    setName(newName);
    setEmail(newEmail);
    setPhoto(newPhoto);
  };

  return (
    <View style={styles.container}>
      <ProfilePressable onPress={() => navigation.navigate('ProfileDetail', { name, email, photo, updateProfile })}>
        <Image source={photo ? { uri: photo } : defaultUserPhoto} style={styles.photo} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </ProfilePressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
});
