import React, { useEffect } from 'react'
import './Login.css'
import {auth, SignIn} from '../firebase'
// import { arrayUnion, updateDoc } from "firebase/firestore";

const Login = () =>{
    useEffect(()=>{
        console.log("enrolling")
        async function enroll(){
          await console.log("auth:", auth.currentUser)
        }
        enroll()
      },[])
    return(
    <div>
        Login Page aa
        <iframe width="100%" height="600px"src = "http://kko.to/NmwDUXvWP"></iframe>
        <SignIn/>
    </div>)
}

export default Login; 