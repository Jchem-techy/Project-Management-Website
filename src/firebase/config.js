import firebase from 'firebase/app';
// firestore packages
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, Timestamp } from 'firebase/firestore';

// Authentication packages
import { getAuth } from 'firebase/auth';

// firebase storage packages
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyB3D9715fL3frCHYAfeRDWYln-5wY54Qzo',
  authDomain: 'project-management-259e2.firebaseapp.com',
  projectId: 'project-management-259e2',
  storageBucket: 'project-management-259e2.appspot.com',
  messagingSenderId: '576951246199',
  appId: '1:576951246199:web:60eb6ed713b939ca2cd572',
};
// initialize services
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const db = getFirestore(app); // firestore
// collection refrence
let colRef = collection(db, 'transactions');

const auth = getAuth(); // auth

//storage refrence

// firebase timestamps
const timestamp = Timestamp.fromDate(new Date());
export { db, auth, colRef, timestamp, storage };
