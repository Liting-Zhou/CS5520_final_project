import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL =
  "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest";
const RAPIDAPI_KEY = "98b25a2fc4msh2168b01a868f18dp196105jsna9715150ed92";
const CACHE_KEY = "cachedRates";
const CACHE_TIMESTAMP_KEY = "cachedRatesTimestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// Cache the latest rates to save API calls,
// fetch again only when it is cached over 24 hours
const getLatestRates = async () => {
  try {
    const cachedRates = await AsyncStorage.getItem(CACHE_KEY);
    // console.log("CachedLatestRates.js 17, cachedRates", cachedRates);
    const cachedTimestamp = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);
    const now = new Date().getTime();

    if (
      cachedRates &&
      cachedTimestamp &&
      now - cachedTimestamp < CACHE_DURATION
    ) {
      return JSON.parse(cachedRates);
    } else {
      console.log(
        "CachedLatestRates.js 28, Fetching latest rates from external API!!! ATTENTION!!!"
      );
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const newRates = data.rates;

      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newRates));
      await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());

      return newRates;
    }
  } catch (e) {
    console.error("Error fetching rates:", e);
    return null;
  }
};

export const getSelectedCurrencies = async ({ data }) => {
  const allCurrencies = await getLatestRates();
  //   console.log("CachedLatestRates.js 54, allCurrencies", allCurrencies);
  const { base, selectedCurrencies } = data;
  console.log("CachedLatestRates.js 56, data", data);
  const baseRate = allCurrencies[base];
  console.log("CachedLatestRates.js 58, baseRate", baseRate);
  // find selected currencies from all currencies
  const selectedRates = selectedCurrencies.map((currency) => ({
    currency,
    rate: (allCurrencies[currency] / baseRate).toFixed(4),
  }));
  console.log("CachedLatestRates.js 64, selectedRates", selectedRates);
  return selectedRates;
};
