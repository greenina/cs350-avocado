import React from 'react'
import './Home.css'
import {
    Box,
    Flex,
    HStack,
    Input,
    SkeletonText,
    Text,
  } from '@chakra-ui/react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { Link } from "react-router-dom"; 
import RouteOption from '../Components/RouteOption';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
  
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
import { useRef, useState } from 'react'
  
const center = { lat: 36.372143, lng: 127.360390 }

const Home = () =>{
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
      })
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [ route, setRoute ] = useState({display: 'none'})
    const options = [
        {distance:2.9, time:17, price:2900, slope: [1,2,3,4,5,7,1,8,8,7], rough: [1,2,3,4,5,6,7,8,9,10], pos:0},
        {distance:3.5, time:25, price:0, slope: [1,2,3,4,5,7,null,null,null,null], rough: [1,2,3,4,5,6,null,null,null,null],pos:0},
        {distance:2.2, time:13, price:2500, slope: [5,2,5,7,6,6,5,3,2,1], rough: [5,6,7,1,2,3,8,9,5,4],pos:0}
    ]
    const [showNav, setShowNav] = useState({display: 'none'})
    let navigate = useNavigate(); 
    const [open, setOpen] = useState(false)
    const [ride, setRide] = useState({display: 'none'})

    const routeChange = () =>{ 
      let path = `/timer`; 
      navigate(path);
    }
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: '#ffffff',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };


    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()

    if (!isLoaded) {
    return <SkeletonText />
    }
    async function calculateRoute() {

        if (originRef.current.value === '' || destiantionRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            // origin: '37.7683909618184, -122.51089453697205',
            // destination: '41.850033, -87.6500523',
            // origin: '36.374409, 127.364228',
            // destination: '36.356395, 127.378302',
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
        })
        console.log("origin:",originRef.current.value)
        console.log("destination:",destiantionRef.current.value)
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text) 
        setRoute({display: 'block'})
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }
    
    return(
    <div>
            <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <div style={showNav}><iframe width="100%" height="600px"src = "http://kko.to/NmwDUXvWP"></iframe></div>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
        w='80%'
      >
        
        <div className='nav-wrap'>
          <div className='search-wrap'>
            <TextField size="small" fullWidth id="outlined-basic" label="Destination" variant="outlined" />
            <IconButton onClick={()=>{
              setShowNav({display:'block'})
              setRoute({display:'block'})
            }}color="primary" aria-label="upload picture" component="span">
              <SearchIcon />
            </IconButton>
          </div>
          <div style={route}>
              <div className='routeList'>
                <ButtonGroup
                  orientation="vertical"
                  aria-label="vertical outlined button group"
                >
                  {options.map(x=> 
                  <div onClick={e=>{
                      setRoute({display:'none'}) 
                      setRide({display:'block'})
                  }}>
                      <RouteOption info={x}/>
                  </div>
                  )}
                </ButtonGroup>
                  
              </div>
          </div>
        </div>
        
        
      </Box>
      <div style={ride} className='ride'>
      <Button size="large"sx={ { borderRadius: 28 } }onClick={()=>{setOpen(true)}} variant="contained">RIDE</Button>
      </div>
      
    </Flex>
    <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ready to start the ride? 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You cannot view the screen while riding due to safety reason
          </Typography>
          <div className='buttons'>
            <Button variant="outlined" onClick={()=>{setOpen(false)}} >DISMISS</Button>
            <Button variant="contained" onClick={routeChange} >START</Button>
          </div>
        </Box>
      </Modal>
    </div>)
}

export default Home; 