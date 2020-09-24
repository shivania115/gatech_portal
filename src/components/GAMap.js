import React, { useEffect, useState } from 'react'
import Geographies from './Geographies';
import Geography from './Geography';
import ComposableMap from './ComposableMap';
import { scaleQuantile } from "d3-scale";
import {useGADM} from './GADMProvider';
import { useStitchAuth } from "./StitchAuth";
import _ from 'lodash';

const geoUrl ="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/GA-13-georgia-counties.json"


export default function GAMap(props) {
  const [hover, setHover] = useState(0);
  const {selectedVariable, 
    selectedTable,
    selectedCounty, 
    fetchedData,
    firstRender,
    actions: {handlePageStateChange}} = useGADM();
  const colorPalette = [
    "#edcfa9",
    "#e89f71",
    "#d57149", 
    "#aa4a30",
    "#7d321e",
    "#541f11"
  ];
  const colorHighlight = 'yellow';
  const [mapColor, setMapColor] = useState(0);
  const [legendSplit, setLegendSplit] = useState([]);
  const [legendMin, setLegendMin] = useState();
  const [legendMax, setLegendMax] = useState();

  
  useEffect(()=>{
    var varData = _.map(fetchedData[selectedVariable.varName],'value');
    varData = varData.filter((number)=> number!=='N/A');
    setLegendMin(Math.min(...varData).toFixed(1));
    setLegendMax(Math.max(...varData).toFixed(1));
    const scaler = scaleQuantile().domain(varData).range(colorPalette);
    let scaleMap = {};
    _.forEach(fetchedData[selectedVariable.varName], item => {
      scaleMap[item.county] = scaler(item.value)
    });
    setMapColor(scaleMap);
    setLegendSplit(scaler.quantiles());
    console.log("sm",scaleMap);
  },[selectedVariable,firstRender]);

  console.log(fetchedData);
  console.log(mapColor);


  const Legend = () => {
    if (Object.keys(mapColor).length>0) {
      return (
      <svg width="280" height="80" transform="translate(-20,-45)">
        {_.map(legendSplit, (splitpoint, i) => {
          if(legendSplit[i] < 1){
            return <text key = {i} x={64 + 24 * (i)} y={35} style={{fontSize: '0.6em'}}> {legendSplit[i].toFixed(1)}</text>                    
          }else if(legendSplit[i] > 999999){
            return <text key = {i} x={64 + 24 * (i)} y={35} style={{fontSize: '0.6em'}}> {(legendSplit[i]/1000000).toFixed(1) + "M"}</text>                    
          }else if(legendSplit[i] > 999){
            return <text key = {i} x={64 + 24 * (i)} y={35} style={{fontSize: '0.6em'}}> {(legendSplit[i]/1000).toFixed(1) + "K"}</text>                    
          }
          return <text key = {i} x={64 + 24 * (i)} y={35} style={{fontSize: '0.6em'}}> {legendSplit[i].toFixed(1)}</text>                    
        })} 
        <text x={40} y={35} style={{fontSize: '0.7em'}}>{legendMin}</text>
        <text x={182} y={35} style={{fontSize: '0.7em'}}>{legendMax}</text>
        {_.map(colorPalette, (color, i) => {
          return <rect key={i} x={50+24*i} y={40} width="22" height="20" style={{fill: color, strokeWidth:1, stroke: color}}/>                    
        })} 
        <text x={42} y={74} style={{fontSize: '0.7em'}}>Low</text>
        <text x={80+20 * (colorPalette.length - 1)} y={74} style={{fontSize: '0.7em'}}>High</text>

        <rect x={210} y={40} width="20" height="20" style={{fill: "#FFFFFF", strokeWidth:0.5, stroke: "#000000"}}/>                    
        <text x={235} y={48} style={{fontSize: '0.7em'}}> None </text>
        <text x={235} y={58} style={{fontSize: '0.7em'}}> Reported </text>
      </svg>);
    } else {
      return ;
    }
  };


  
  return (
      <div>  
        <ComposableMap 
          //projection="geoAlbersUsa" 
          projection="geoTransverseMercator"
          data-tip=""
          width={760} 
          height={530}
          strokeWidth= {0.5}
          stroke= 'black'
          projectionConfig={{scale: 6000}}
          
           >
          <Geographies geography={geoUrl} transform="translate(10,5)">
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
                      setHover(geo.properties.GEOID);
                    }}
                    onMouseLeave={()=>{
                      setHover(0);
                    }}
                    fill = {(hover===geo.properties.GEOID) ? colorHighlight:
                      (mapColor[(geo.properties.NAME+" County")]===undefined)?'white':mapColor[(geo.properties.NAME+" County")]}
                    strokeWidth = {selectedCounty.GEOID===geo.properties.GEOID ? 3.5:0.5}
                    stroke = {selectedCounty.GEOID===geo.properties.GEOID ? 'red':'black'}
                  />
                ))}
              </svg>
            }
          </Geographies>
        </ComposableMap>
        <div>
          {Legend()}
        </div>
      </div>
      );
}