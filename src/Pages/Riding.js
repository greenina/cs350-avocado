import React, { useEffect } from 'react'
import './Riding.css'
import {auth} from '../firebase'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import riding from '../Assets/riding.gif'

const Riding = () =>{let navigate = useNavigate(); 
    const routeChangeToBill = () =>{ 
      let path = '/billing'; 
      navigate(path);
    }
    const routeChangeToMap = () =>{ 
      //TODO: 맵 중간 페이지로 이어주기
      let path = '/billing'; 
      navigate(path);
    }
    return(
    <div className="riding" align="center" >
        <img src={riding} alt='loading...'/>
        <p>**You cannot see the map while riding a kickboard**</p>
        <p><Button variant="outlined" onClick={routeChangeToMap}>Pause Riding</Button></p>
        <p><Button variant="outlined" onClick={routeChangeToBill}>End Riding</Button></p>
    </div>)
}

export default Riding; 