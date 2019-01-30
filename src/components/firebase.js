import firebase from 'firebase';
import 'firebase/firestore';

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyA6HvZhBBzZ4C6H2Ufo0zoIQhwXrkrHyLY",
    authDomain: "chirpy-6815c.firebaseapp.com",
    databaseURL: "https://chirpy-6815c.firebaseio.com",
    projectId: "chirpy-6815c",
    storageBucket: "chirpy-6815c.appspot.com",
    messagingSenderId: "226772301718"
  };
  firebase.initializeApp(config);

export default firebase;