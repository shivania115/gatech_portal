import React, { useEffect, useState } from 'react'
import Geographies from './Geographies';
import Geography from './Geography';
import ComposableMap from './ComposableMap';
import { scaleQuantile } from "d3-scale";
import {useGADM} from './GADMProvider';
import _ from 'lodash';

const geoUrl ="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/GA-13-georgia-counties.json"


export default function GAMap(props) {
  const [hover, setHover] = useState(0);
  const {selectedVariable, 
    selectedCounty, 
    fetchedData,
    actions: {handlePageStateChange}} = useGADM();
  const colorPalette = [
    "#edcfa9",
    "#e89f71",
    "#d57149", 
    "#aa4a30"
  ];
  const colorHighlight = 'white';
  const [mapColor, setMapColor] = useState(0);
  
  useEffect(()=>{
    var varData = _.map(fetchedData[selectedVariable.varName],'value');
    const scaler = scaleQuantile().domain(varData).range(colorPalette);
    let scaleMap = {};
    _.forEach(fetchedData[selectedVariable.varName], item => {
      scaleMap[item.county] = scaler(item.value)
    });
    setMapColor(scaleMap);
  },[selectedVariable]);


  return (
      <div>
              
        <ComposableMap 
          //projection="geoAlbersUsa" 
          projection="geoTransverseMercator"
          data-tip=""
          width={760} 
          height={560}
          strokeWidth= {0.5}
          stroke= 'black'
          projectionConfig={{scale: 6000}}
           >
          <Geographies geography={geoUrl}>
            {({ geographies }) => 
              <svg>
                {geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={()=>{
                      handlePageStateChange({selectedCounty: geo.properties});
                    }}
                    onMouseEnter={()=>{
                      //handlePageStateChange({selectedCounty: geo.properties});
                      setHover(geo.properties.GEOID);
                    }}
                    onMouseLeave={()=>{
                      setHover(0);
                    }}
                    fill = {(hover===geo.properties.GEOID) ? colorHighlight:
                      (Object.keys(mapColor).length===0)? 'white':mapColor[(geo.properties.NAME+" County")]}
                    strokeWidth = {selectedCounty.GEOID===geo.properties.GEOID ? 3:0.5}
                    stroke = {selectedCounty.GEOID===geo.properties.GEOID ? 'white':'black'}
                  />
                ))}
              </svg>
            }
          </Geographies>
        </ComposableMap>      
      </div>
      );
}