import React, { useState, useRef } from 'react'
import './QRcode.css'
import Camera, {FACING_MODES} from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';
import { useNavigate, useLocation  } from "react-router-dom";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {Box} from '@chakra-ui/react'
import ButtonAppBar from '../Components/ButtonAppBar';

const QRcode = () =>{
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#ffffff',
    bgcolor: '#000000',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open,setOpen] = useState(false)
  let navigate = useNavigate();
  let location = useLocation();
  function handleTakePhoto (dataUri) {
    setOpen(true)
  }
    const routeChange = () =>{ 
      let path = '/'; 
      navigate(path);
    }
    const proceed = () => {
      let path = '/timer'
      navigate(path, {state: {option: location.state.option}});
    }

    return(
      <div>
        <ButtonAppBar/>
        <div id="return">
        <Button  variant="outlined" onClick={routeChange}>return</Button>
        </div>
        
      <div className="camera">
      
      <Camera
        idealFacingMode = {FACING_MODES.ENVIRONMENT}
        isImageMirror = {false}
        isFullscreen = {true}
        sizeFactor = {1}
        onTakePhoto = { (dataUri) => { 
          handleTakePhoto(dataUri)
         } }
      />
      <div className="qrTag"/>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ready to start the ride? 🛴
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You cannot view the screen while riding due to <br/>safety reason
          </Typography>
          <div className='buttons'>
            <Button variant="outlined" onClick={()=>{setOpen(false)}} >BACK</Button>
            <Button variant="contained" onClick={()=>proceed()} >START</Button>
          </div>
        </Box>
      </Modal>
    </div>
    </div>)
}

export default QRcode; 