import {
  addDoc,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./firebaseSetup";

// save the customized list of currencies to the database
export const writeCurrenciesToDB = async (
  { userId, base, selectedCurrencies },
  collectionName
) => {
  try {
    // reference to the user document
    const userDocRef = doc(db, collectionName, userId);
    // add selected currencies and base to the user's document
    await updateDoc(userDocRef, {
      myCurrencies: selectedCurrencies,
      currenciesBase: base,
    });
    console.log("Currencies saved successfully");
  } catch (error) {
    console.error("Error saving currencies: ", error);
  }
};

// read the customized list of currencies from the database
export const readCurrenciesFromDB = async (userId, collectionName) => {
  try {
    // reference to the user document
    const userDocRef = doc(db, collectionName, userId);
    // get the user's document
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      // console.log("firebaseHelper.js 41, data from DB", data);
      if (data.currenciesBase && data.myCurrencies) {
        return {
          base: data.currenciesBase,
          selectedCurrencies: data.myCurrencies,
        };
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching selected currencies: ", error);
    return null;
  }
};

// save assets to the database
export const writeAssetsToDB = async (
  { userId, base, assets },
  collectionName
) => {
  try {
    // reference to the user document
    const userDocRef = doc(db, collectionName, userId);
    // add asset details and base to the user's document
    await updateDoc(userDocRef, { myAssets: assets, assetsBase: base });
    console.log("Assets saved successfully");
  } catch (error) {
    console.error("Error saving rates: ", error);
  }
};

// read assets from the database
export const readAssetsFromDB = async (userId, collectionName) => {
  try {
    // reference to the user document
    const userDocRef = doc(db, collectionName, userId);
    // get the user's document
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      // console.log("firebaseHelper.js 81, data from DB", data);
      if (data.assetsBase && data.myAssets) {
        return {
          base: data.assetsBase,
          assets: data.myAssets,
        };
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching assets: ", error);
    return null;
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
export const updateProfileInDB = async (
  userId,
  { name, email, photo },
  collectionName
) => {
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

// Function to read a user's profile from Firestore
export const readProfileFromDB = async (userId, collectionName) => {
  try {
    // Reference to the user document
    const userDocRef = doc(db, collectionName, userId);

    // Get the user's document
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        name: data.name || "", 
        email: data.email || "", 
        photo: data.photo || null, 
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile: ", error);
    return null;
  }
};


// Function to write a new transaction to Firestore
export const writeTransactionToDB = async (userId, transaction) => {
  try {
    const transactionRef = doc(collection(db, `users/${userId}/transactions`));
    await setDoc(transactionRef, transaction);
    console.log("Transaction written with ID: ", transactionRef.id);
    return transactionRef.id;
  } catch (error) {
    console.error("Error writing transaction: ", error);
  }
};

// Function to update a transaction in Firestore
export const updateTransactionInDB = async (userId, transaction) => {
  try {
    if (!transaction.id) {
      throw new Error("Transaction ID is required for updating");
    }
    const transactionRef = doc(
      db,
      `users/${userId}/transactions`,
      transaction.id
    );
    await updateDoc(transactionRef, transaction);
    console.log("Transaction updated with ID: ", transaction.id);
  } catch (error) {
    console.error("Error updating transaction: ", error);
  }
};

// Function to delete a transaction from Firestore
export const deleteTransactionFromDB = async (userId, transactionId) => {
  try {
    const transactionRef = doc(
      db,
      `users/${userId}/transactions`,
      transactionId
    );
    await deleteDoc(transactionRef);
    console.log("Transaction deleted with ID: ", transactionId);
  } catch (error) {
    console.error("Error deleting transaction: ", error);
  }
};

// Function to read transactions from Firestore
export const readTransactionsFromDB = async (userId) => {
  try {
    const transactionsCollection = collection(
      db,
      `users/${userId}/transactions`
    );
    const transactionsSnapshot = await getDocs(transactionsCollection);
    const transactionsList = transactionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return transactionsList;
  } catch (error) {
    console.error("Error reading transactions: ", error);
    return [];
  }
};
