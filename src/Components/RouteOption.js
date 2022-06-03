import { display } from '@mui/system';
import React from 'react'
import Plot from 'react-plotly.js';
import './RouteOption.css'

const RouteOption = () => {
    const slope = [1,2,3,4,5,7,1,8,8,7,6,4,2]
    const options = [
        {distance:2.9, time:17, price:2900, slope:[1,2,3,4,5,7,1,8,8,7,6,4,2], rough:[1,5,2,3,5,3,4,3,2,3,4]},
        {distance:2.9, time:17, price:2900},
        {distance:3.5, time:25, price:'Free'}
    ]
    let readings = [
        {
            name: 'Apples',
            value: 60,
            color: '#eb4d4b'
        },
        {
            name: 'Blueberries',
            value: 7,
            color: '#22a6b3'
        },
        {
            name: 'Guavas',
            value: 23,
            color: '#6ab04c'
        },
        {
            name: 'Grapes',
            value: 10,
            color: '#e056fd'
        }
    ]
    let bars = readings && readings.length && readings.map(function(item, i) {
        if(item.value > 0) {
            return (
                <div className="bar" style={{backgroundColor: item.color, width: item.value + '%'}}  key={i}>
                    .
                </div>
            )
        }
    }, this);

    return (
        <div>
            <div>
                <div className="multicolor-bar">
                    <div className="values">
                    {bars == ''?'':bars}
                    </div>
                </div>
                {/* <div>
                <hr
                    style={{
                    backgroundColor: 'red',
                    height: 5
                    }}
                />
                </div>
                <div>
                <hr
                    style={{
                    backgroundColor: 'blue',
                    height: 5
                    }}
                />
                </div> */}
                
            </div>
            
            <Plot
                data={[
                    {
                    x: [0,1,2,3,4,5,6,7,8,9,10,11,12],
                    y: slope,
                    mode: 'lines',
                    marker: {color: 'black'},
                    },
                ]}
                layout={ {width: 320, height: 240, showlegend: false, xaxis:{visible:false}, yaxis:{visible:false}} }
            />
        </div>
    )
}

export default RouteOption