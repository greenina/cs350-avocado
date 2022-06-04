import React, { useEffect } from 'react'
import './Riding.css'
import {auth} from '../firebase'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import riding from '../assets/riding.gif'

const Riding = () =>{let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = '/billing'; 
      navigate(path);
    }
    return(
    <div className="riding" align="center" >
        <img src={riding} alt='loading...'/>
        <p>You cannot see the map while riding a kickboard</p>
        <Button variant="outlined" onClick={routeChange}>End Riding</Button>
    </div>)
}

export default Riding; 