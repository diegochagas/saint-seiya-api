const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = require('./firebaseConfig.js');

const content = require('./Content.js');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);
  
const db = firebase.firestore();

async function addCollection (collectionPromise, collectionPath) {
  const collection = await collectionPromise;

  for (let i = 0; i < collection.length; i++) {
    const document = collection[i];
    
    const isCollectionWrited = await db.collection(collectionPath).doc(document.id).set(document);

    console.log(`${collectionPath} document written with ID: ${document.id}`);
  }
}

const execute = async () => {
  const collections = await content.getColletions();

  for (let i = 0; i < collections.length; i++) {
    const { collection, collectionPath } = collections[i];
    
    const isCollectionAdded = await addCollection(collection, collectionPath);
  }

  console.log('Collections created with success! Good luck!');
}

execute();

module.exports = { execute };