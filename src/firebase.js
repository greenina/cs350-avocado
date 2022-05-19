import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC9pftT4dIMXTh-EwKPWT4HLwXf1hDq9Qo",
  authDomain: "sokik-d679c.firebaseapp.com",
  projectId: "sokik-d679c",
  storageBucket: "sokik-d679c.appspot.com",
  messagingSenderId: "712612822064",
  appId: "1:712612822064:web:8a52b2240c0351c49281f5"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence();
const db = firebaseApp.firestore();

export {db, firebaseApp, firebase};