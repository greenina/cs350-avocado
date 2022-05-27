import React, { useEffect } from 'react'
import './Search.css'
import {auth} from '../firebase'

const Search = () =>{
    useEffect(()=>{
        console.log("enrolling")
        async function enroll(){
          await console.log("auth:", auth.currentUser)
        }
        enroll()
      },[])
    return(
    <div>
        <textarea/>
    </div>)
}

export default Search; 