import React, { useEffect } from 'react'
import './Billing.css'
import {auth} from '../firebase'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Map from './map.png'
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import ButtonAppBar from '../Components/ButtonAppBar'
import gpay from './images/gpay.png'

const Billing = () =>{
    const [bill, setBill] = useState(false);
    let location = useLocation();
    const riding_info = location.state.option;
    console.log(location.option);
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = '/'; 
        navigate(path);
      }
    return(
    <div>
        <ButtonAppBar/>
        <div className='box'>
        <div className="image">
            <img src={Map} alt="MAP"/>
        </div>
        <div className='info'>
            <h3>Riding Info</h3>
            <div>Distance <span>{riding_info.distance}km</span> </div>
            <div>Time <span>00:{riding_info.time}:00</span> </div>
            <div>Cost <span>{riding_info.price===0?"Free rider":riding_info.price+"won"}</span> </div>
            {riding_info.price===0?<Button variant="contained" onClick={()=>setBill(true)}>CONFIRM</Button>:<Button variant="contained" onClick={()=>{setBill(true)}}>PAYMENT</Button>}

        </div>
        {bill&&<div className='block'><div className='billing_popup'>
            <div><img src={gpay} width="80%"/></div>
            <div>Click <b>Complete</b><br/>  after Google Paying</div>
            <Button variant="contained" onClick={routeChange}>Complete</Button>
            <div id="close" onClick ={()=>setBill(false)}>Cancel</div>
        </div></div>}
    </div>
    </div>
    )
}

export default Billing; 