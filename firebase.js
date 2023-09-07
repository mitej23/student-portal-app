// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB58Z_LPp5rdfYn6RkKD3d83tSbyobObo",
  authDomain: "college-portal-56b61.firebaseapp.com",
  projectId: "college-portal-56b61",
  storageBucket: "college-portal-56b61.appspot.com",
  messagingSenderId: "614105213138",
  appId: "1:614105213138:web:4a0386bdb1e2ce669be50b",
  measurementId: "G-Z4VBZL3JBE"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})