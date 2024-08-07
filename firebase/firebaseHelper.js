import {
  addDoc,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "./firebaseSetup";

export const writeRatesToDB = async (
  { userId, base, selectedCurrencies },
  collectionName
) => {
  try {
    // reference to the user document
    const userDocRef = doc(db, collectionName, userId);

    // save the base currency to the user document
    await setDoc(userDocRef, { ratesBase: base });

    // reference to the subcollection
    const subCollectionRef = collection(userDocRef, "myRates");

    // save each selected currency to the subcollection
    for (const currency of selectedCurrencies) {
      const currencyDocRef = doc(subCollectionRef, currency);
      await setDoc(currencyDocRef, { currency });
    }
    console.log("Rates saved successfully");
  } catch (error) {
    console.error("Error saving rates: ", error);
  }
};
