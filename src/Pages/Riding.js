import React, { useEffect } from 'react'
import './Riding.css'
import {auth} from '../firebase'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Riding = () =>{
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = '/billing'; 
      navigate(path);
    }
    return(
    <div>
        RIDING PAGE
        <Button variant="outlined" onClick={routeChange}>End Riding</Button>
    </div>)
}

export default Riding; 