import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ExpoNotifications from "expo-notifications";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ChevronBackButton from "./components/ChevronBackButton";

import Rates from "./screens/Rates";
import Conversion from "./screens/Conversion";
import Assets from "./screens/Assets";
import LocationFinder from "./screens/LocationFinder";
import Profile from "./screens/Profile";
import ProfileDetail from "./screens/ProfileDetail";
import TransactionHistory from "./screens/TransactionHistory";
import AddTransaction from "./screens/AddTransaction";
import Notifications from "./screens/Notifications";
import AddNotification from "./screens/AddNotification";
import Welcome from "./screens/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ConvertButton from "./components/ConvertButton";

import { colors, textSizes } from "./helpers/ConstantsHelper";
import { auth } from "./firebase/firebaseSetup";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const MainStack = createStackNavigator();

ExpoNotifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//  clear intervals when logged out
const clearIntervals = async () => {
  const storedIds = await AsyncStorage.getItem("intervalIds");
  if (storedIds) {
    const ids = JSON.parse(storedIds);
    ids.forEach((id) => clearInterval(id));
    console.log("App.js 49, Intervals cleared when logged out: ", ids);
    await AsyncStorage.removeItem("intervalIds");
  }
};

// Logout function
const handleLogout = async (navigation) => {
  Alert.alert(
    "Confirm Logout",
    "Are you sure you want to log out?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Logout cancelled"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            await clearIntervals();

            await signOut(auth);
            navigation.navigate("LogInScreen");
          } catch (error) {
            console.error("Error logging out: ", error);
          }
        },
      },
    ],
    { cancelable: false }
  );
};

// ProfileStackNavigator is a stack navigator for the Profile screen
function ProfileStackNavigator() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ProfileStack.Navigator
      initialRouteName={isUserAuthenticated ? "ProfileScreen" : "LogInScreen"}
    >
      {!isUserAuthenticated && (
        <>
          <ProfileStack.Screen
            name="LogInScreen"
            component={Login}
            options={{ title: "Log In", headerShown: false }}
          />
          <ProfileStack.Screen
            name="SignUpScreen"
            component={Signup}
            options={{ title: "Sign Up", headerShown: false }}
          />
        </>
      )}
      {isUserAuthenticated && (
        <>
          <ProfileStack.Screen
            name="ProfileScreen"
            component={Profile}
            options={({ navigation }) => ({
              headerStyle: styles.headerStyle,
              title: "Profile",
              headerLeft: () => null,
              headerShown: true,
              headerRight: () => (
                <View style={{ paddingRight: 16 }}>
                  <Pressable
                    onPress={() => handleLogout(navigation)}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                    ]}
                    android_ripple={{ color: "lightgray" }}
                  >
                    <MaterialIcons name="logout" size={24} color="black" />
                  </Pressable>
                </View>
              ),
            })}
          />
          <ProfileStack.Screen
            name="ProfileDetail"
            component={ProfileDetail}
            options={({ navigation }) => ({
              title: "Edit Profile",
              headerBackImage: () => (
                <ChevronBackButton onPress={() => navigation.goBack()} />
              ),
              headerBackTitleVisible: false,
              headerStyle: styles.headerStyle,
            })}
          />
          <ProfileStack.Screen
            name="TransactionHistory"
            component={TransactionHistory}
            options={({ navigation }) => ({
              title: "Transaction History",
              headerBackImage: () => (
                <ChevronBackButton onPress={() => navigation.goBack()} />
              ),
              headerBackTitleVisible: false,
              headerStyle: styles.headerStyle,
            })}
          />
          <ProfileStack.Screen
            name="AddTransaction"
            component={AddTransaction}
            options={({ navigation }) => ({
              title: "Add Transaction",
              headerBackImage: () => (
                <ChevronBackButton onPress={() => navigation.goBack()} />
              ),
              headerBackTitleVisible: false,
              headerStyle: styles.headerStyle,
            })}
          />
          <ProfileStack.Screen
            name="Notifications"
            component={Notifications}
            options={({ navigation }) => ({
              title: "Notification Settings",
              headerBackImage: () => (
                <ChevronBackButton onPress={() => navigation.goBack()} />
              ),
              headerBackTitleVisible: false,
              headerStyle: styles.headerStyle,
            })}
          />
          <ProfileStack.Screen
            name="AddNotification"
            component={AddNotification}
            options={({ navigation }) => ({
              title: "Add Notification",
              headerBackImage: () => (
                <ChevronBackButton onPress={() => navigation.goBack()} />
              ),
              headerBackTitleVisible: false,
              headerStyle: styles.headerStyle,
            })}
          />
        </>
      )}
    </ProfileStack.Navigator>
  );
}

function MainApp() {
  return (
    <Tab.Navigator
      initialRouteName="Rates"
      screenOptions={{
        headerStyle: styles.headerStyle,
        tabBarActiveTintColor: colors.secondTheme,
        tabBarInactiveTintColor: colors.firstTheme,
        tabBarLabelStyle: { fontSize: textSizes.small },
      }}
    >
      <Tab.Screen
        name="Rates"
        component={Rates}
        options={{
          headerTitle: "Exchange Rates",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="finance"
              size={textSizes.iconSize}
              color={focused ? colors.secondTheme : colors.firstTheme}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Assets"
        component={Assets}
        options={{
          headerTitle: "Asset Management",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="attach-money"
              size={textSizes.iconSize}
              color={focused ? colors.secondTheme : colors.firstTheme}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Conversion"
        component={Conversion}
        options={({ navigation }) => ({
          headerTitle: "Convert Currency",
          tabBarButton: () => (
            <ConvertButton onPress={() => navigation.navigate("Conversion")} />
          ),
        })}
      />
      <Tab.Screen
        name="Finder"
        component={LocationFinder}
        options={{
          headerTitle: "Nearby places to change currency",
          headerStyle: { backgroundColor: colors.thirdTheme },
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="location-pin"
              size={textSizes.iconSize}
              color={focused ? colors.secondTheme : colors.firstTheme}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={textSizes.iconSize}
              color={focused ? colors.secondTheme : colors.firstTheme}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Welcome">
          <MainStack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="MainApp"
            component={MainApp}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: colors.firstTheme,
  },
});
