import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyBM5lbVclUqbAOcnyQ_8fXVQElkJBn2y",
  authDomain: "applibros-b2992.firebaseapp.com",
  databaseURL: "https://applibros-b2992.firebaseio.com",
  projectId: "applibros-b2992",
  storageBucket: "applibros-b2992.appspot.com",
  messagingSenderId: "567466805771",
  appId: "1:567466805771:web:9b8a0f9036be82c724550e",
  measurementId: "G-ZEC0Z18982"
};
firebase.initializeApp(config);


export default firebase;