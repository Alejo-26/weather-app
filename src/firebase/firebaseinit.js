import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPjLqVWFXZ-Z5nabWg92AMnLbGnNuii10",
  authDomain: "weatherappyt-7e158.firebaseapp.com",
  projectId: "weatherappyt-7e158",
  storageBucket: "weatherappyt-7e158.firebasestorage.app",
  messagingSenderId: "1075276933047",
  appId: "1:1075276933047:web:808b37caf8c50d600d2a32"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()