import React, { useEffect, useState } from 'react'
import Geographies from './Geographies';
import Geography from './Geography';
import ComposableMap from './ComposableMap';
import { scaleQuantile } from "d3-scale";
import configs from "./state_config.json";
import {useGADM} from './GADMProvider';

const geoUrl ="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/GA-13-georgia-counties.json"
const colorPalette = [
        "#e1dce2",
        "#d3b6cd",
        "#bf88b5", 
        "#af5194", 
        "#99528c", 
        "#633c70", 
      ];
const colorHighlight = '#f2a900';


export default function GAMap(props) {

  const {selectedVariable, 
    selectedCounty, 
    actions: {handlePageStateChange}} = useGADM();

  return (
      <div>
              
        <ComposableMap 
          //projection="geoAlbersUsa" 
          projection="geoTransverseMercator"
          data-tip=""
          width={760} 
          height={580}
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
                    }}
                    onMouseLeave={()=>{

                    }}
                    fill='#FFFFFF'
                  />
                ))}
              </svg>
            }
          </Geographies>
        </ComposableMap>      
      </div>
      );
}