import React, { useState, useRef  } from 'react'
import './QRcode.css'
import Camera, {FACING_MODES} from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';
import { useNavigate } from "react-router-dom";


const QRcode = () =>{
  let navigate = useNavigate();
  function handleTakePhoto (dataUri) {
    setTimeout(() => {
      let path = '/timer'; 
      navigate(path);
    }, 1000);
    
  }

    return(
    <div className="camera">
      <Camera
        idealFacingMode = {FACING_MODES.ENVIRONMENT}
        isImageMirror = {false}
        isFullscreen = {true}
        sizeFactor = {1}
        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
      />
      <div className="qrTag"/>
    </div>)
}

export default QRcode; 