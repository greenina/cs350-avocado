import React, { useEffect } from 'react'
import './Login.css'
import {auth, SignIn} from '../firebase'
// import { arrayUnion, updateDoc } from "firebase/firestore";
import sokik from '../assets/sokik1.png'
import ButtonAppBar2 from '../Components/ButtonAppBar2'
import riding from '../assets/riding.gif'

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
        <div className="riding2" align="center">
        <div className='signin' align="center" width="50%">
            <SignIn width="50%"/>
          </div>
        
          <div align="center">
            <div className='img2' align="center">
              <img id="rider"src={riding} alt='loading...' width="70%"/>
            </div>
            <div className='logo' align="center">
            <img src={sokik}  width="80%"/>
            </div>
          </div>
          
          
        </div>
      </div>
    )
}

export default Login; 