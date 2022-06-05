import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import Button from '@mui/material/Button';
import signinBtn from './assets/signin.png'
import './firebase.css'

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
const auth = firebase.auth();
const storage = firebase.storage();

function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
    window.location.href='/'
  }

  return (
    <div className='google'>
      <img width="50%" src={signinBtn} onClick = {signInWithGoogle}/>
    </div>
  )
}

function SignOut() {
  const signOutWithGoogle = () => {
    // auth.signOut()
    window.location.href='/login'
  }
  return (
    <div>
      <Button color="inherit" onClick = {signOutWithGoogle}>SignOut</Button>
    </div>
  )
}

export {db, firebaseApp, firebase, storage, auth, SignIn, SignOut};