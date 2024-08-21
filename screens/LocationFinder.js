import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Button,
  Linking,
  Platform,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import CustomText from "../components/CustomText";
import { colors } from "../helpers/ConstantsHelper";
import { mapsApiKey } from "@env";

export default function LocationFinder() {
  const [location, setLocation] = useState(null);
  const [exchangePlaces, setExchangePlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, requestPermission] = Location.useForegroundPermissions();

  // check if permission of location use service is granted
  const verifyPermission = async () => {
    if (response && response.granted) {
      return true;
    }
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  };

  useEffect(() => {
    const getLocations = async () => {
      try {
        // check if permission is granted
        const hasPermission = await verifyPermission();
        // console.log("LocationFinder.js 39, hasPermission", hasPermission);
        if (!hasPermission) {
          Alert.alert(
            "Permission not granted",
            "Please enable location services"
          );
          setLoading(false);
          return;
        }

        // get current location
        const location = await Location.getCurrentPositionAsync({});
        // console.log("LocationFinder.js 51, location", location);
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // set loading to false and show the map
        setLoading(false);

        // use the nearby search API to fetch nearby currency exchange places
        const apiKey = mapsApiKey;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=currency+exchange&location=${location.coords.latitude},${location.coords.longitude}&radius=1500&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        // console.log("LocationFinder.js 65, fetch places from API", data);
        setExchangePlaces(data.results);
      } catch (error) {
        console.error("get locations error: ", error);
      }
    };
    getLocations();
  }, []);

  // open google maps and locate accordingly, when a marker is clicked
  const openGoogleMaps = (lat, lng) => {
    // console.log("LocationFinder.js 76, open google maps");
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred when opening google maps", err)
    );
  };

  // show loading indicator
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.firstTheme} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your are here"
            pinColor="blue"
          />
          {exchangePlaces &&
            exchangePlaces.map((place, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                }}
              >
                <Callout>
                  <View>
                    <CustomText style={{ marginBottom: 5 }}>
                      {place.name}
                    </CustomText>
                    <Text>{place.vicinity}</Text>
                    {Platform.OS === "ios" && (
                      <Button
                        title="Open in Google Maps"
                        onPress={() =>
                          openGoogleMaps(
                            place.geometry.location.lat,
                            place.geometry.location.lng
                          )
                        }
                      />
                    )}
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>
      ) : (
        <Text>Location not available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.thirdTheme,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
