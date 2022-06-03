import { display } from '@mui/system';
import React, {useLayoutEffect, useEffect, useRef, useState} from 'react'
import Plot from 'react-plotly.js';
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import './RouteOption.css'
import { yellow } from '@mui/material/colors';

const RouteOption = (props) => {
    console.log("PROPS,",props)
    const dist = props.info.distance
    const time = props.info.time
    const price = props.info.price
    const slope = props.info.slope
    const rough = props.info.rough
    const size = 10
    
    const checkstat = (x) => {
        if (x == null) return '#ffffff' 
        else if(x>7) return '#eb4d4b'
        else if (x>3) return '#ffff00'
        else return '#6ab04c'
    }
    const getScope = (l) => {
        var result = []
        var temp = 0
        var temp_stat = checkstat(l[0])
        for(var i=0;i<l.length;i++){
            if(checkstat(l[i]) === temp_stat){
                temp = temp + 1
            } else {
                result.push({num:temp, stat:temp_stat})
                temp = 1
                temp_stat = checkstat(l[i])
            }
        }
        result.push({num:temp, stat:temp_stat})
        return result
    }

    const datas = getScope(rough)

    let bars = datas && datas.length && datas.map(function(item, i) {
        if(item.num > 0) {
            console.log(item.stat," ", item.num)
            return (
                <div className="bar" style={{backgroundColor: item.stat, width: 10*item.num + '%'}}  key={i}>
                    .
                </div>
            )
        }
    }, this);

    return (
        <div className='route-option'>
            <div className='info'>
                {dist} km | {time} min | {price} won
            </div>
            <div>
                <div className="multicolor-bar">
                    <div className="values">
                    {bars == ''?'':bars}
                    </div>
                </div>
            </div>
            
            <Plot
                divId="plotlyChart"
                data={[
                    {
                    x: [...Array(size).keys()],
                    y: slope,
                    mode: 'lines',
                    marker: {color: 'black'},
                    },
                ]}
                layout={ { 
                    showlegend: false, 
                    height:50,
                    width : 300,
                    margin: {
                    l: 10,
                    r: 10,
                    b: 7,
                    t: 10,
                    pad: 3
                    }, 
                    xaxis:{visible:false}, 
                    yaxis:{visible:false}, 
                    autosize: true} }
                useResizeHandler
                config={{responsive: true}}
            />
        </div>
    )
}

export default RouteOption