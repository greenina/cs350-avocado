import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login'
import Search from './Pages/Search'
import Timer from './Pages/Timer'
import Riding from './Pages/Riding'
import Billing from './Pages/Billing'
import QRcode from "./Pages/QRcode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>} />
        <Route path="/search" element = {<Search/>} />
        <Route path="/timer" element = {<Timer/>} />
        <Route path="/riding" element = {<Riding/>} />
        <Route path="/billing" element = {<Billing/>} />
        <Route path="/qrcode" element = {<QRcode/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
