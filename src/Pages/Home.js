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
import ButtonAppBar from '../Components/ButtonAppBar';
  
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
        {
          distance:2.9, 
          time:17, 
          price:2900, 
          slope: [2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 4, 10, 15, 21, 26, 32, 42, 56, 65, 66, 67, 68, 71, 77, 92, 98, 100], 
          rough: [1, 0, 1, 2, 0, 2, 1, 2, 2, 1, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 1, 2, 0, 0, 0, 2, 0, 1, 1, 1], 
          pos:0
        },
        {distance:3.5, time:25, price:3100, slope: [0, 0, 0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 15, 20, 26, 31, 38, 45, 46, 46, 47, 47, 49, 55, 77, 96, 98, 98, 99]
          , rough: [0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 2, 1, 1, 1, 0, 2, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],pos:0},
        {distance:2.2, time:13, price:2500, slope: [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5, 5, 7, 6, 9, 14, 20, 27, 33, 40, 45, 48, 48, 49, 50, 67, 89, 99, 99, 100]
          , rough: [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 0, 1, 0, 2, 2, 0, 1, 1, 1, 1, 2],pos:0},
        {
          distance:2.3, 
          time:14, 
          price:0, 
          slope: [2,1,0,0,0,null,null,null,null,1,1,1,2,4,null,null,21,26,32,42,null,null,null,null,null,71,77,92,98,100], 
          rough: [1,0,1,2,0,null,null,null,null,1,1,0,2,0,null,null,0,1,0,0,null,null,null,null,null,2,0,1,1,1]
          ,pos:0
        }
    ]
    const [showNav, setShowNav] = useState({display: 'none'})
    let navigate = useNavigate(); 
    const [open, setOpen] = useState(false)
    const [ride, setRide] = useState({display: 'none'})
    const [option, setOption] = useState(null);

    const routeChange = () =>{ 
      let path = `/qrcode`; 
      navigate(path, {state: {option:option}});
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
      <ButtonAppBar/>
            <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <div style={showNav} id="fcontainer"><iframe id="frame" src = "https://kko.to/NmwDUXvWP"></iframe></div>
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
        w='95%'
      >
        
        <div className='nav-wrap'>
          <div className='search-wrap'>
            <TextField size="small" fullWidth id="outlined-basic" label="Destination" variant="outlined" name = "destination"/>
            <IconButton onClick={()=>{
              setShowNav({display:'block'})
              setRoute({display:'block'})
            }}color="primary" aria-label="upload picture" component="span">
              <SearchIcon id = "search"/>
            </IconButton>
          </div>
          <div style={route}>
              <div className='routeList'>
                <ButtonGroup
                  orientation="vertical"
                  aria-label="vertical outlined button group"
                  fullWidth
                >
                  {options.map((x,index)=> 
                  <div 
                      className='route_button'
                      id ={"route"+index}
                      onClick={e=>{
                      setRoute({display:'none'}) 
                      setRide({display:'block'})
                      setOption(x)
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
      <Button color="error"size="large"sx={ { borderRadius: 28 } } onClick={()=>{routeChange()}} variant="contained" id = "ride">RIDE</Button>
      </div>
      
    </Flex>
    </div>)
}

export default Home; 