import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
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

import { colors, textSizes } from "./helpers/ConstantsHelper";
import ConvertButton from "./components/ConvertButton";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

// ProfileStackNavigator is a stack navigator for the Profile screen
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator initialRouteName="LogInScreen">
            <ProfileStack.Screen
        name="LogInScreen"
        component={Login}
        options={{ title: "Log In" }}
      />
                  <ProfileStack.Screen
        name="SignUpScreen"
        component={Signup}
        options={{ title: "Sign Up" }}
      />
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ title: "Profile" }}
      />
      {/* ProfileDetail is a screen allow users to edit the Profile */}
      <ProfileStack.Screen
        name="ProfileDetail"
        component={ProfileDetail}
        options={{
          title: "Edit Profile",
          headerBackTitle: "Back",
        }}
      />
      <ProfileStack.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        options={{
          title: "Transaction History",
          headerBackTitle: "Back",
        }}
      />
      <ProfileStack.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{
          title: "Add Transaction",
          headerBackTitle: "Back",
        }}
      />
    </ProfileStack.Navigator>
  );
}

export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
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
              headerShown: false,
              headerStyle: styles.headerStyle,
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
    // </SafeAreaView>
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
