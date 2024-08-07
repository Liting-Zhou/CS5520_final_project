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

// Function to write a new profile to Firestore
export const writeProfileToDB = async (
  { userId, name, email, photo },
  collectionName
) => {
  try {
    // Reference to the user document
    const userDocRef = doc(db, collectionName, userId);

    // Save the profile information to the user document
    await setDoc(userDocRef, { name, email, photo }, { merge: true });

    console.log("Profile saved successfully");
  } catch (error) {
    console.error("Error saving profile: ", error);
  }
};

// Function to updtate the profile information in Firestore
export const updateProfileInDB = async (userId, { name, email, photo }, collectionName) => {
  try {
    // Reference to the user document
    const userDocRef = doc(db, collectionName, userId);

    // Update the profile information in the user document
    await updateDoc(userDocRef, { name, email, photo });

    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile: ", error);
  }
};


// Function to write a new transaction to Firestore with an auto-generated ID
export const writeTransactionToDB = async (userId, transaction) => {
  try {
    const transactionsCollectionRef = collection(db, `users/${userId}/transactions`);
    const transactionDocRef = await addDoc(transactionsCollectionRef, transaction);
    console.log("Transaction written successfully with ID: ", transactionDocRef.id);
  } catch (error) {
    console.error("Error writing transaction: ", error);
  }
};

// Function to update an existing transaction in Firestore
export const updateTransactionInDB = async (userId, transaction) => {
  try {
    const transactionDocRef = doc(db, `users/${userId}/transactions`, transaction.id);
    await updateDoc(transactionDocRef, transaction);
    console.log("Transaction updated successfully");
  } catch (error) {
    console.error("Error updating transaction: ", error);
  }
};

// Function to delete a transaction from Firestore
export const deleteTransactionFromDB = async (userId, transactionId) => {
  try {
    const transactionDocRef = doc(db, `users/${userId}/transactions`, transactionId);
    await deleteDoc(transactionDocRef);
    console.log("Transaction deleted successfully");
  } catch (error) {
    console.error("Error deleting transaction: ", error);
  }
};
