import React, { useEffect } from 'react'
import './Billing.css'
import {auth} from '../firebase'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Map from './map.png'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const Billing = () =>{
    const [bill, setBill] = useState(false);
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = '/'; 
        navigate(path);
      }
    return(
    <div className='box'>
        <div className="image">
            <img src={Map} alt="MAP"/>
        </div>
        <div className='info'>
            <h3>Riding Info</h3>
            <div>Distance <span>2000m</span> </div>
            <div>Time <span>00:20:00</span> </div>
            <div>Cost <span>6000won</span> </div>
            <Button variant="contained" onClick={()=>{setBill(true)}}>CONFIRM</Button>
        </div>
        {bill&&<div className='block'><div className='billing_popup'>
            <div>카카오페이 결제 후, <br/> <b>결제완료</b> 버튼을 눌러주세요</div>
            <Button variant="contained" onClick={routeChange}>결제완료</Button>
            <div id="close" onClick ={()=>setBill(false)}>취소하기</div>
        </div></div>}
    </div>
    )
}

export default Billing; 