import { display } from '@mui/system';
import React, {useLayoutEffect, useEffect, useRef, useState} from 'react'
import Plot from 'react-plotly.js';
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import './RouteOption.css'
import { yellow } from '@mui/material/colors';
import Button from '@mui/material/Button';

const RouteOption = (props) => {
    console.log("PROPS,",props)
    const pos = props.info.pos
    const dist = props.info.distance
    const time = props.info.time
    const price = props.info.price
    const slope = props.info.slope
    const rough = props.info.rough
    const size = 30
    
    const checkstat = (x) => {
        if (x == null) return '#ffffff' 
        else if(x===2) return '#eb4d4b'
        else if (x===1) return '#ffff00'
        else if(x===0) return '#6ab04c'
        else return '#ffffff' 
    }
    const getScope = (l) => {
        var result = []
        var temp = 0
        var temp_stat = checkstat(l[0])
        for(var i=0;i<l.length;i++){
            if(pos === i+1 && pos!=0){
                result.push({num:temp, stat:temp_stat})
                result.push({num:1, stat:'#000000'})
                temp = 1
                temp_stat = checkstat(l[i+1])
            }
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
        if(item.stat === '#000000') return <div className="pos" style={{backgroundColor: item.stat, width: 2*item.num + '%'}}  key={i}>
        .
    </div>
        if(item.num > 0) {
            return (
                <div className="bar" style={{backgroundColor: item.stat, width: 20*item.num + '%'}}  key={i}>
                    .
                </div>
            )
        }
    }, this);

    return (
        <div >
            <Button variant="outlined" fullWidth>
            <div className='route-option'>
            <div className='route-info'>
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
                    width : 400,
                    margin: {
                    l: 0,
                    r: 0,
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
            
            </Button>
            
        </div>
    )
}

export default RouteOption