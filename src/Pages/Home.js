import React from 'react'
import './Home.css'
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
  } from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import TextField from '@mui/material/TextField';
import routeImage1 from './route1.png'
import routeImage2 from './route2.png'
import { Navigate, Route } from 'react-router';
import { Link } from "react-router-dom"; 
import RouteOption from '../Components/RouteOption';
  
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
    const [ route, setRoute ] = useState({display: 'block'})
    const [ display, setDisplay ] = useState({display: 'none'})
    const options = [
        {distance:2.9, time:17, price:2900, slope: [1,2,3,4,5,7,1,8,8,7], rough: [1,2,3,4,5,6,7,8,9,10]},
        {distance:3.5, time:25, price:0, slope: [1,2,3,4,5,7,null,null,null,null], rough: [1,2,3,4,5,6,null,null,null,null]},
        {distance:2.2, time:13, price:2500, slope: [5,2,5,7,6,6,5,3,2,1], rough: [5,6,7,1,2,3,8,9,5,4]}
    ]


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
        <HStack spacing={2} justifyContent='space-between'>
          {/* <TextField flexGrow={1} id="outlined-basic" variant="outlined" >
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </TextField> */}
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={(calculateRoute)}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
        <button style={display}><Link to="/timer" className="btn btn-primary">START</Link></button>
        <HStack style={route}>
            <div className='routeList'>
              {/* {options.map(x => {
                <RouteOption info={x}/>
              })}
              <RouteOption /> */}
                {options.map(x=> 
                <div className='item' onClick={e=>{
                    setRoute({display:'none'})
                    setDisplay({display:'block'})
                }}>
                    <RouteOption info={x}/>
                </div>
                )}
            </div>
        </HStack>
      </Box>
    </Flex>
    </div>)
}

export default Home; 