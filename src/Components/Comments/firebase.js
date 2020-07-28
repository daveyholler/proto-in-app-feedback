import firebase from 'firebase';

 const firebaseConfig = {
   apiKey: "AIzaSyAu4Y269Cej35yYg5krCaV4EcxRvDEAVGo",
   authDomain: "react-firebase-comments-7ea1a.firebaseapp.com",
   databaseURL: "https://react-firebase-comments-7ea1a.firebaseio.com",
   projectId: "react-firebase-comments-7ea1a",
   storageBucket: "react-firebase-comments-7ea1a.appspot.com",
   messagingSenderId: "124899574030",
   appId: "1:124899574030:web:6f0ecc7acb965a01aa575f"
 };

 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 export default firebase;
