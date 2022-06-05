import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login'
import Timer from './Pages/Timer'
import Riding from './Pages/Riding'
import Billing from './Pages/Billing'
import Maptest from './Pages/Maptest'
import Stop from './Pages/Stop'
import QRcode from "./Pages/QRcode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element = {<Home/>}/>
        <Route path="/" element = {<Login/>} />
        <Route path="/timer" element = {<Timer/>} />
        <Route path="/riding" element = {<Riding/>} />
        <Route path="/billing" element = {<Billing/>} />
        <Route path="/map" element = {<Maptest/>} />
        <Route path="/stop" element = {<Stop/>} />
        <Route path="/qrcode" element = {<QRcode/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
