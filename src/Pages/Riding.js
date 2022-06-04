import React, { useEffect } from 'react'
import './Riding.css'
import {auth} from '../firebase'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import RouteOption from '../Components/RouteOption';
import mapImg from './images/map2.png'

const Riding = () =>{
    const info = {distance:2.9, time:17, price:2900, slope: [1,2,3,4,5,7,1,8,8,7], rough: [1,2,3,4,5,6,7,8,9,10], pos:5}
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = '/billing'; 
      navigate(path);
    }
    return(
    <div className='wrapper'>
      <RouteOption info={info}/>
      <div className='imgwr'>
        <img className='image2' src={mapImg}/>
      </div>
      <Button variant="outlined" onClick={routeChange}>End Riding</Button>
    </div>)
}

export default Riding; 