const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyBixh-W4SxzctmZzGOKJVjfIRK1OE8PaN4",
  authDomain: "saint-seiya-api-accd5.firebaseapp.com",
  databaseURL: "https://saint-seiya-api-accd5.firebaseio.com",
  projectId: "saint-seiya-api-accd5",
  storageBucket: "saint-seiya-api-accd5.appspot.com",
  messagingSenderId: "293913041675",
  appId: "1:293913041675:web:e6e8c85166c2b023"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase.firestore();