import React, { useEffect} from 'react'
import './Riding.css'
import {auth} from '../firebase'
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from "react-router-dom";
import riding from '../assets/riding.gif'
import ButtonAppBar from '../Components/ButtonAppBar';

const Riding = () =>{let navigate = useNavigate();
    //End riding 했을 때 넘어가는 페이지
    let location = useLocation();
    const routeChangeToBill = () =>{ 
      let path = '/billing'; 
      navigate(path, {state: {option:location.state.option}});
    }

    //Pause riding 했을 때 넘어가는 페이지
    const routeChangeToMap = () =>{ 
      //TODO: 맵 중간 페이지로 이어주기
      let path = '/stop'; 
      navigate(path);
    }

    //print direction
    const direction = [0,0,0,-1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,-1,0,0,1,0,1,0]
    for(let i = 1; i < direction.length; i++) {
      notify_direction(i, direction[i])
    }
    function notify_direction(i, dir) {
      setTimeout(function () {
        switch(dir) {
          case 0:
            console.log('go straight')
            break;
          case 1:
            console.log('turn right')
            break;
          case -1:
            console.log('turn left')
            break;
        }
      }, 3000*i);
    }
    return(
      <div>
        <ButtonAppBar/>
        <div className="riding" align="center" >
        <img src={riding} alt='loading...' width="80%"/>
        <p>**You cannot see the map while riding a kickboard**</p>
        {/* <p><Button variant="outlined" onClick={routeChangeToMap}>Pause Riding</Button></p> */}
        <p><Button variant="outlined" onClick={routeChangeToBill}>End Riding</Button></p>
    </div>
      </div>

    )
}

export default Riding; 