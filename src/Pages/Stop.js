import React, { useEffect } from 'react'
import './Stop.css'
import {auth} from '../firebase'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import RouteOption from '../Components/RouteOption';
import mapImg from './images/map2.png'
import ButtonAppBar from '../Components/ButtonAppBar';

const Stop = () =>{
    const info = {distance:2.2, time:13, price:2500, slope: [2, 1, 0, 0, 0, null, null, null, null, 1, 1, 1, 2, 4, null, null, 21, 26, 32, 42, null, null, null, null, null, 71, 77, 92, 98, 100]
      , rough: [1, 0, 1, 2, 0, null, null, null, null, 1, 1, 0, 2, 0, null, null, 0, 1, 0, 0, null, null, null, null, null, 2, 0, 1, 1, 1]
      ,pos:15}
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = '/billing'; 
      navigate(path);
    }
    return(
    <div>
      <ButtonAppBar/>
      <div className='wrapper'>
      <RouteOption info={info}/>
      <div className='imgwr'>
        <img className='image2' src={mapImg}/>
      </div>
      <Button variant="outlined" onClick={routeChange}>End Riding</Button>
    </div>
    </div>)
}

export default Stop; 