import { SafeAreaView, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Rates from "./screens/Rates";
import Conversion from "./screens/Conversion";
import Assets from "./screens/Assets";
import LocationFinder from "./screens/LocationFinder";
import Profile from "./screens/Profile";
import ProfileDetail from "./screens/ProfileDetail";
import TransactionHistory from "./screens/TransactionHistory";
import AddTransaction from "./screens/AddTransaction";

import { colors, textSizes } from "./helpers/Constants";
import RegularButton from "./components/RegularButton";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

// ProfileStackNavigator is a stack navigator for the Profile screen
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileScreen">
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
    <SafeAreaView style={styles.container}>
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
              tabBarLabel: "Rates",
              headerTitle: "Recent Rates",
            }}
          />
          <Tab.Screen
            name="Assets"
            component={Assets}
            options={{
              headerTitle: "Asset Management",
            }}
          />
          <Tab.Screen
            name="Conversion"
            component={Conversion}
            options={({ navigation }) => ({
              headerTitle: "Convert Currency",
              tabBarButton: () => (
                <RegularButton
                  onPress={() => navigation.navigate("Conversion")}
                  childrenStyle={styles.convertButtonChildren}
                  buttonStyle={styles.convertButton}
                  buttonTextStyle={{ fontSize: textSizes.small }}
                >
                  <Text>Convert</Text>
                </RegularButton>
              ),
            })}
          />
          <Tab.Screen name="Finder" component={LocationFinder} />
          <Tab.Screen
            name="Profile"
            component={ProfileStackNavigator}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  convertButton: {
    top: -10,
    backgroundColor: "none",
    margin: 0,
  },
  convertButtonChildren: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.tabBarbutton,
    justifyContent: "center",
    alignItems: "center",
  },
});
