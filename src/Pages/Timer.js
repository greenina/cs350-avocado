import React, { useEffect, useState } from 'react'
import './Timer.css'
import {auth} from '../firebase'
import { useCountdown, CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { Navigate } from 'react-router';
import ButtonAppBar from '../Components/ButtonAppBar';
import { Button } from '@mui/material';

const Timer = () =>{
  let navigate = useNavigate();
  let location = useLocation();
    const [display, setDisplay] = useState({display:'block'})
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            setDisplay({display:'none'})
            let path = '/riding'; 
            navigate(path, {state: {option: location.state.option}});
          ;
        }
        return (
          <div className="timer">
            <div className="value">{remainingTime}</div>
          </div>
        );
      };

    return(
    <div>
      <ButtonAppBar/>
      <div className='area'>
        <p>Connecting to Kickboard A323</p>
        <p>Start Navigation Guide in</p>
        <div align="center" >
          <CountdownCircleTimer
            isPlaying
            duration={3}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: true, delay: 1 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
    </div>
    </div>)
}

export default Timer; 