import React, { useEffect } from 'react'
import './Billing.css'
import {auth} from '../firebase'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Map from './map.png'
import {Link} from 'react-router-dom'

const Billing = () =>{
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
            <Button variant="contained"><Link to="/" className="btn btn-primary">CONFIRM</Link></Button>
        </div>
    </div>
    )
}

export default Billing; 