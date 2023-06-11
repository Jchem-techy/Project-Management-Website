import firebase from 'firebase/app';
// firestore packages
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, Timestamp } from 'firebase/firestore';

// Authentication packages
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyD-w9HvhajEwroqc6GGyC4HIXqGMuIM8BQ',
  authDomain: 'mymoney-fa770.firebaseapp.com',
  projectId: 'mymoney-fa770',
  storageBucket: 'mymoney-fa770.appspot.com',
  messagingSenderId: '79079327750',
  appId: '1:79079327750:web:9de714c9dc81a80ea65b87',
};
const app = initializeApp(firebaseConfig);
// initialize services
const db = getFirestore(app); // firestore
// collection refrence
let colRef = collection(db, 'transactions');
const auth = getAuth(); // auth

// firebase timestamps
const timestamp = Timestamp.fromDate(new Date());
export { db, auth, colRef, timestamp };
