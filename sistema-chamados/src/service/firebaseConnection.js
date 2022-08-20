import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyDfHKF6dqdb3cefosA-yfJv9map2MwLQx4",
  authDomain: "sistema-chamados-166fb.firebaseapp.com",
  projectId: "sistema-chamados-166fb",
  storageBucket: "sistema-chamados-166fb.appspot.com",
  messagingSenderId: "77240884404",
  appId: "1:77240884404:web:e2603c6eacb69a63048be1",
  measurementId: "G-0V2MP2LL51"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

