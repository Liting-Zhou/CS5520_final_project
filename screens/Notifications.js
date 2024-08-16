import { StyleSheet, Text, View, FlatList } from "react-native";
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as ExpoNotifications from "expo-notifications";
import { textSizes, colors } from "../helpers/ConstantsHelper";
import NotificationItem from "../components/NotificationItem";
import AddButton from "../components/AddButton";
import RegularButton from "../components/RegularButton";
import { getAuth } from "firebase/auth";
import { readNotificationsFromDB } from "../firebase/firebaseHelper";
import { getExchangeRate } from "../helpers/RatesHelper";

export default function Notifications() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const verifyPermission = async () => {
    try {
      const response = await ExpoNotifications.getPermissionsAsync();
      console.log("Notifications.js 27, response: ", response);
      if (response.granted) {
        return true;
      }
      const newResponse = await ExpoNotifications.requestPermissionsAsync();
      return newResponse.granted;
    } catch (err) {
      console.error("permission error: ", err);
    }
  };

  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      console.log("Notifications.js 41, hasPermission: ", hasPermission);
      if (hasPermission) {
        for (const notification of notifications) {
          console.log("Notifications.js 44, notification: ", notification);

          const exchangeRate = await getExchangeRate({
            from: notification.from,
            to: notification.to,
          });
          const exchangeRateNumber = parseFloat(exchangeRate);
          const thresholdNumber = parseFloat(notification.threshold);
          if (exchangeRateNumber > thresholdNumber) {
            await ExpoNotifications.scheduleNotificationAsync({
              content: {
                title: "Exchange Rate Alert",
                body: `${notification.from} based on ${
                  notification.to
                } is now ${exchangeRateNumber.toFixed(
                  4
                )}, exceeding ${thresholdNumber.toFixed(4)}.`,
              },
              trigger: {
                seconds: 3,
              },
            });
          }
        }
      }
    } catch (err) {
      console.error("notification error: ", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      if (userId) {
        const fetchedNotifications = await readNotificationsFromDB(userId);
        setNotifications(fetchedNotifications);
      }
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };

  // fetch notifications from DB when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  // fetch notifications when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [userId])
  );

  // headerRight button to add a notification
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton onPress={() => navigation.navigate("AddNotification")} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notify me when:</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <RegularButton
        onPress={scheduleNotificationHandler}
        buttonStyle={styles.buttonStyle}
      >
        Activate Notifications
      </RegularButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.thirdTheme,
  },
  text: {
    fontSize: textSizes.medium,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  buttonStyle: {
    marginBottom: 40,
  },
});
