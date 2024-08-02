import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Rates from "./screens/Rates";
import Conversion from "./screens/Conversion";
import Assets from "./screens/Assets";
import LocationFinder from "./screens/LocationFinder";
import Profile from "./screens/Profile";

import TabBarButton from "./components/TabBarButton";
import AddButton from "./components/AddButton";
import { colors, textSizes } from "./helpers/Constants";

const Tab = createBottomTabNavigator();
export default function App() {
  const handleAdd = () => {
    console.log("Add button pressed");
  };
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
            headerRight: () => <AddButton onPress={handleAdd} />,
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
        <Tab.Screen name="Profile" component={Profile} />
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
