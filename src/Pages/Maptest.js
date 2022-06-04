/* eslint-disable react/style-prop-object */
/* eslint-disable no-loop-func */
/*global kakao*/ 
import { listItemIconClasses } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './Maptest.css'


const Maptest=()=>{
  const [map,setMap] = useState(null);
  const [ps, setPs] = useState(null)
  const [infowindow, setInfowindow] = useState(null)
  var markers = []
  let presentPosition;
  const [geo, setGeo] = useState(null)
  

  function searchPlaces(e){
    var keyword = e.target[0].value
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }
    ps.keywordSearch(e.target[0].value, placesSearchCB)
  }
  
  function placesSearchCB(data, status, pagination){
    debugger;
    if(status === kakao.maps.services.Status.OK){
      console.log("OK")
      displayPlaces(data);
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status_ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return 
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert ('검색 결과 중 오류가 발생했습ㄴ디ㅏ.')
      return;
    }
  }
  function displayPlaces(places) {
    debugger;
    var listEl = document.getElementById('placesList'),
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    removeAllChildNods(listEl);
    removeMarker();
    for (var i = 0; i<places.length; i++){
      debugger;
      const lon = places[i].x;
      const lat = places[i].y;
      debugger;
      var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x)
      debugger;
      console.log("placeposition ", placePosition)
      debugger;
      var marker = addMarker(placePosition, i)
      debugger;
      console.log("marker ", marker)
      debugger;
      var itemEl = getListItem(i, places[i])
      debugger;
      console.log("itemEl ", itemEl)
      debugger;

      bounds.extend(placePosition);

      (function(marker, title){
        kakao.maps.event.addListener(marker,'mouseover', function(){
          displayInfowindow(marker, title);
        })
        kakao.maps.event.addListener(marker,'mouseout', function(){
          infowindow.close();
        })
        itemEl.onmouseover = function(){
          displayInfowindow(marker, title);
        }
        itemEl.onmouseout = function(){
          infowindow.close()
        };
      })(marker, places[i].place_name)
      (function(marker, title) {
        var detailAddr;
        kakao.maps.event.addListener(marker, 'click', function() {
            searchDetailAddrFromCoords(presentPosition, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
                    window.location.href = "https://map.kakao.com/?sName="+detailAddr+"&eName="+title                                            
                }   
            });
        })

        itemEl.onclick =  function () {
            searchDetailAddrFromCoords(presentPosition, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
                    window.location.href = "https://map.kakao.com/?sName="+detailAddr+"&eName="+title                                            
                }   
            });
        };
    })(marker, places[i].place_name);

    fragment.appendChild(itemEl);
    }

    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    map.setBounds(bounds);
  }

  function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span className="markerbg marker_' + (index+1) + '"></span>' +
                '<div className="info">' +
                '   <h5>' + places.place_name + '</h5>';
 
    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span className="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span className="tel">' + places.phone  + '</span>' +
                '</div>';           
 
    el.innerHTML = itemStr;
    el.className = 'item';
 
    return el;
}
function addMarker(position, idx, title) {
  debugger;
  var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
      imgOptions =  {
          spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
          marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage 
      });
  console.log("MAP",map)
  debugger;
  marker.setMap(map); // 지도 위에 마커를 표출합니다
  
  markers.push(marker);  // 배열에 생성된 마커를 추가합니다

  return marker;
} 
  function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
  }

  function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 
 
    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }
 
    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;
 
        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }
 
        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}
function displayInfowindow(marker, title) {
  var content = '<div style={{padding:5px, z-index:1}}>' + title + '</div>';

  infowindow.setContent(content);
  infowindow.open(map, marker);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
  debugger;
  while (el.hasChildNodes()) {
      el.removeChild (el.lastChild);
  }
}

// 좌표 -> 주소

function searchDetailAddrFromCoords(coords, callback) {
  geo.coord2Address(coords.getLng(), coords.getLat(), callback);
}


  var markerPosition  = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488); 
  var marker = new kakao.maps.Marker({
    position: markerPosition
});
marker.setMap(map);

  useEffect(()=>{
    
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };

    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap)
    console.log("UNDER", map)
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude,
            lon = position.coords.longitude;

        var locPosition = new kakao.maps.LatLng(lat, lon)
        presentPosition = locPosition
        console.log("MAP,",map)
        console.log("KAKAO,", kakaoMap)
        kakaoMap.setCenter(locPosition)
      })
    } else {
      var locPosition = new kakao.maps.LatLng(37.7683909618184, -122.51089453697205)
      alert("현재 위치를 찾을 수 없습니다!")
    }
    var geocoder = new kakao.maps.services.Geocoder();
    setGeo(geocoder)

    var kakaops = new kakao.maps.services.Places();
    setPs(kakaops)

    var infow = new kakao.maps.InfoWindow({zIndex:1})
    setInfowindow(infow)
    
    }, [])


    return (
      <div className="map_wrap">
      <div id="map" style={{width:500, height:500}}></div>
  
      <div id="menu_wrap" className="bg_white">
          <div className="option">
              <div>
                  <form className="form" onSubmit={searchPlaces} >
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