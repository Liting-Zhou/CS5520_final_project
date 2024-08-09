import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { colors } from "../helpers/ConstantsHelper";
import { mapsApiKey } from "@env";

export default function LocationFinder() {
  const [location, setLocation] = useState(null);
  const [exchangePlaces, setExchangePlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission not granted",
          "Please enable location services"
        );
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log("LocationFinder.js 23 -> location", location);
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // fetch nearby currency exchange places
      const apiKey = mapsApiKey;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=currency+exchange&location=${location.coords.latitude},${location.coords.longitude}&radius=1500&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        console.log("LocationFinder.js 35 -> fetch places from API");
        console.log(
          "LocationFinder.js 36 -> response's first item",
          response.data.results[0]
        );
        setExchangePlaces(response.data.results);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    })();
  }, []);

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
          {exchangePlaces.map((place, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              title={place.name}
              description={place.vicinity}
            />
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
