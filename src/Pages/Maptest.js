/* eslint-disable react/style-prop-object */
/* eslint-disable no-loop-func */
/*global kakao*/ 
import { listItemIconClasses } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './Maptest.css'


const Maptest=()=>{

  useEffect(()=>{
    
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude,
            lon = position.coords.longitude;

        var locPosition = new kakao.maps.LatLng(lat, lon)
        kakaoMap.setCenter(locPosition)
      })
    } else {
      var locPosition2 = new kakao.maps.LatLng(37.7683909618184, -122.51089453697205)
      alert("현재 위치를 찾을 수 없습니다!")
    }
    }, [])


    return (
      <div className="map_wrap">
        <div id="map" style={{width:500, height:500}}></div>
        <div><iframe width="100%" height="600px"src = "http://kko.to/NmwDUXvWP"></iframe></div>
  
      <div id="menu_wrap" className="bg_white">
          <div className="option">
              <div>
                  <form className="form">
                      키워드 : <input type="text" defaultValue="" id="keyword" size="15"/> 
                      <button type="submit">검색하기</button> 
                  </form>
              </div>
          </div>
          <hr/>
          <ul id="placesList"></ul>
          <div id="pagination"></div>
      </div>
  </div>
    )
}

export default Maptest;