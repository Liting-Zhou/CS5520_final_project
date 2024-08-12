import AsyncStorage from "@react-native-async-storage/async-storage";
import { rapidApiKey } from "@env";

const API_URL =
  "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest";
const RAPIDAPI_KEY = rapidApiKey;
const CACHE_KEY = "cachedRates";
const CACHE_TIMESTAMP_KEY = "cachedRatesTimestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// Cache all the latest rates to save API calls,
// fetch again only when it is cached over 24 hours
const getLatestRates = async () => {
  try {
    const cachedRates = await AsyncStorage.getItem(CACHE_KEY);
    // console.log("CachedLatestRates.js 16, cachedRates", cachedRates);
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

// return selected currencies with rates based on the base currency
export const getSelectedCurrencies = async ({ data }) => {
  const allCurrencies = await getLatestRates();
  //   console.log("CachedLatestRates.js 54, allCurrencies", allCurrencies);
  const { base, selectedCurrencies } = data;
  // console.log("CachedLatestRates.js 56, data", data);
  const baseRate = allCurrencies[base];
  // console.log("CachedLatestRates.js 58, baseRate", baseRate);
  // find selected currencies from all currencies
  const selectedRates = selectedCurrencies.map((currency) => ({
    currency,
    rate: (allCurrencies[currency] / baseRate).toFixed(4),
    id: Math.random() * 1000,
  }));
  // console.log("CachedLatestRates.js 65, selectedRates", selectedRates);
  return selectedRates;
};

// return calculated amount based on the rates and the amount
export const convert = async ({ data }) => {
  const allCurrencies = await getLatestRates();
  const { from, to, amount } = data;
  // console.log("CachedLatestRates.js 73, data", data);
  const result = ((amount * allCurrencies[to]) / allCurrencies[from]).toFixed(
    4
  );
  return result;
};

// return calculated total amount in base currency, based on the rates and the assets
export const calculateTotal = async ({ data }) => {
  const allCurrencies = await getLatestRates();
  const { base, assets } = data;
  // console.log("CachedLatestRates.js 84, data", data);
  const total = assets.reduce((acc, asset) => {
    const { currency, amount } = asset;
    return acc + (amount * allCurrencies[base]) / allCurrencies[currency];
  }, 0);
  // console.log("CachedLatestRates.js 89, total", total);
  return total.toFixed(2);
};
