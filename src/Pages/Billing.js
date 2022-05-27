import React, { useEffect } from 'react'
import './Billing.css'
import {auth} from '../firebase'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Map from './map.png'
import { useNavigate } from "react-router-dom";

const Billing = () =>{
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = '/'; 
        navigate(path);
      }
    return(
    <div className='box'>
        <div className='info'>
            <div>Your BILLING Info</div>
            <div>Riding : </div>
            <div>Billing Info : </div>
            <div>Billing Info : </div>
        </div>
        <div className="image">
            <img src={Map} alt="MAP"/>
        </div>
        <div>
            <Button variant="outlined">REPORT</Button>
            <Button variant="contained" onClick={routeChange}>CONFIRM</Button>
        </div>
    </div>
    )
}

export default Billing; 