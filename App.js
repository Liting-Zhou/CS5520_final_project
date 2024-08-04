import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";

import Rates from "./screens/Rates";
import Conversion from "./screens/Conversion";
import Assets from "./screens/Assets";
import LocationFinder from "./screens/LocationFinder";
import Profile from "./screens/Profile";
import ProfileDetail from './screens/ProfileDetail';
import TransactionHistory from "./screens/TransactionHistory";

import TabBarButton from "./components/TabBarButton";
import { colors, textSizes } from "./helpers/Constants";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

// ProfileStackNavigator is a stack navigator for the Profile screen
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileScreen">
      <ProfileStack.Screen 
        name="ProfileScreen" 
        component={Profile} 
        options={{ title: 'Profile' }}
      />
      {/* ProfileDetail is a screen allow users to edit the Profile */}
      <ProfileStack.Screen 
        name="ProfileDetail" 
        component={ProfileDetail} 
        options={{ 
          title: 'Edit Profile', 
          headerBackTitle: 'Back' 
        }} 
      />
        <ProfileStack.Screen 
        name="TransactionHistory" 
        component={TransactionHistory} 
        options={{ 
          title: 'Transaction History', 
          headerBackTitle: 'Back' 
        }} 
        
      />
    </ProfileStack.Navigator>
  );
}

export default function App() {
  return (
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
        <Tab.Screen name="Assets" component={Assets} />
        <Tab.Screen
          name="Conversion"
          component={Conversion}
          options={({ navigation }) => ({
            tabBarButton: () => (
              <TabBarButton onPress={() => navigation.navigate("Conversion")}>
                <Text style={styles.buttonText}>Convert</Text>
              </TabBarButton>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: textSizes.small,
  },
});
