import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Rates from "./screens/Rates";
import Conversion from "./screens/Conversion";
import Assets from "./screens/Assets";
import LocationFinder from "./screens/LocationFinder";
import Profile from "./screens/Profile";
import ProfileDetail from "./screens/ProfileDetail";
import TransactionHistory from "./screens/TransactionHistory";
import AddTransaction from "./screens/AddTransaction";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { colors } from "./helpers/ConstantsHelper";
import ConvertButton from "./components/ConvertButton";
import { auth } from "./firebase/firebaseSetup";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

// Logout function
const handleLogout = async (navigation) => {
  try {
    await signOut(auth);
    console.log(auth.currentUser);
    navigation.navigate("LogInScreen");
  } catch (error) {
    console.error("Error logging out: ", error);
  }
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
              headerShown: true,
              headerRight: () => (
                <View style={{ paddingRight: 16 }}>
                  <Pressable onPress={() => handleLogout(navigation)}>
                    <MaterialIcons name="logout" size={24} color="black" />
                  </Pressable>
                </View>
              ),
            })}
          />
          <ProfileStack.Screen
            name="ProfileDetail"
            component={ProfileDetail}
            options={{
              title: "Edit Profile",
              headerBackTitle: "Back",
              headerStyle: styles.headerStyle,
            }}
          />
          <ProfileStack.Screen
            name="TransactionHistory"
            component={TransactionHistory}
            options={{
              title: "Transaction History",
              headerBackTitle: "Back",
              headerStyle: styles.headerStyle,
            }}
          />
          <ProfileStack.Screen
            name="AddTransaction"
            component={AddTransaction}
            options={{
              title: "Add Transaction",
              headerBackTitle: "Back",
              headerStyle: styles.headerStyle,
            }}
          />
        </>
      )}
    </ProfileStack.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Rates"
          screenOptions={{
            tabBarStyle: {},
          }}
        >
          <Tab.Screen
            name="Rates"
            component={Rates}
            options={{
              headerTitle: "Recent Rates",
              headerStyle: styles.headerStyle,
              tabBarLabel: "Rates",
              tabBarActiveTintColor: colors.secondTheme,
              tabBarInactiveTintColor: colors.firstTheme,
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="finance"
                  size={24}
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
              headerStyle: styles.headerStyle,
              tabBarActiveTintColor: colors.secondTheme,
              tabBarInactiveTintColor: colors.firstTheme,
              tabBarIcon: ({ focused }) => (
                <MaterialIcons
                  name="attach-money"
                  size={24}
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
              headerStyle: styles.headerStyle,
              tabBarActiveTintColor: colors.secondTheme,
              tabBarInactiveTintColor: colors.firstTheme,
              tabBarButton: () => (
                <ConvertButton
                  onPress={() => navigation.navigate("Conversion")}
                />
              ),
            })}
          />
          <Tab.Screen
            name="Finder"
            component={LocationFinder}
            options={{
              headerTitle: "Nearby places to change currency",
              headerStyle: { backgroundColor: colors.thirdTheme },
              tabBarActiveTintColor: colors.secondTheme,
              tabBarInactiveTintColor: colors.firstTheme,
              tabBarIcon: ({ focused }) => (
                <MaterialIcons
                  name="location-pin"
                  size={24}
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
              headerStyle: styles.headerStyle,
              tabBarActiveTintColor: colors.secondTheme,
              tabBarInactiveTintColor: colors.firstTheme,
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={focused ? colors.secondTheme : colors.firstTheme}
                />
              ),
            }}
          />
        </Tab.Navigator>
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
