import React, { useEffect, useState } from 'react'
import Geographies from './Geographies';
import Geography from './Geography';
import ComposableMap from './ComposableMap';
import { scaleQuantile } from "d3-scale";
import {useGADM} from './GADMProvider';
import { useStitchAuth } from "./StitchAuth";
import ReactTooltip from "react-tooltip";
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const geoUrl ="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/GA-13-georgia-counties.json"


export default function GAMap(props) {
  const [hover, setHover] = useState(0);
  const [hoverCounty, setHoverCounty] = useState("Fulton County");
  console.log("init county",hoverCounty)
  const [toolTipVal, setToolTipVal] = useState(10.4);    // does not show variable
  //useEffect(()=>{setToolTipVal(10.4)},[]);
  console.log("init val ",toolTipVal);
  const {selectedVariable, 
    selectedTable,
    selectedCounty, 
    fetchedData,
    actions: {handlePageStateChange}} = useGADM();
  const colorPalette = [
    "#D8E7E9",
    "#A4C8CB",
    "#71A8AD", 
    "#4A7C82",
    "#34575B",
    "#253E41"
  ];
  const [mapColor, setMapColor] = useState(0);
  const [legendSplit, setLegendSplit] = useState([]);
  const [legendMin, setLegendMin] = useState();
  const [legendMax, setLegendMax] = useState();

  
  useEffect(()=>{
    var statedata = _.filter(fetchedData, {'subsubgroup': selectedVariable.varName});
    console.log("var ", selectedVariable.varName);
    console.log("fetched ", fetchedData);
    console.log("state ", statedata);
    var varData = _.map(statedata,'value');
    console.log("var data ", varData);
    varData = varData.filter((number)=> number!=='N/A');
    setLegendMin(Math.min(...varData).toFixed(1));
    setLegendMax(Math.max(...varData).toFixed(1));
    const scaler = scaleQuantile().domain(varData).range(colorPalette);
    let scaleMap = {};
    _.forEach(statedata, item => {
      scaleMap[item.county] = scaler(item.value)
    });
    setMapColor(scaleMap);
    setLegendSplit(scaler.quantiles());
    console.log("sm",scaleMap);
  },[selectedVariable, fetchedData]);



  const Legend = () => {
    if (Object.keys(mapColor).length>0) {
      return (
      <svg width="280" height="80" transform="translate(-20,-10)"> 
      {/* transform="translate(-20,-60) */}
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
        <text x={42} y={74} style={{fontSize: '0.7em'}}>Low {selectedVariable.unit}</text>
        <text x={80+20 * (colorPalette.length - 1)} y={74} style={{fontSize: '0.7em'}}>High {selectedVariable.unit}</text>

        <rect x={220} y={40} width="20" height="20" style={{fill: "#FFFFFF", strokeWidth:0.5, stroke: "#000000"}}/>                    
        <text x={245} y={48} style={{fontSize: '0.7em'}}> None </text>
        <text x={245} y={58} style={{fontSize: '0.7em'}}> Reported </text>
      </svg>);
    } else {
      return ;
    }
  };

  const useStyles = makeStyles((theme) => ({
    customSize: {
      width: 130,
      height: 50,
      position: 'fixed',
      top: '10px',
      left: '-130px',
      fontSize: '0.85rem',
      padding: '0.7em'
    },
  }));

  const classes = useStyles();

  useEffect(()=>{
    var ttval = _.map(_.filter(fetchedData, {'subsubgroup': selectedVariable.varName, 'county': hoverCounty}),'value');
    if (ttval!== "N/A"){
      var sp = (ttval + '').split('.');
      if (sp[1]!==undefined && sp[1].length>2){
        ttval = parseFloat(ttval).toFixed(2);
      }
    }
    console.log("filtered", ttval);
    setToolTipVal(ttval);
  },[hoverCounty, fetchedData, selectedVariable]);


  return (
      <div>  
        <div>
          {Legend()}
        </div>
        <Tooltip id='tooltip' placement="top-end" open={hover>-1} classes={{ tooltip: classes.customSize }}
          title={
            <p>
              {hoverCounty}<br/>
              County stat: {toolTipVal}
            </p>
        }>
        {/* open={hover>0} */}
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
          <Geographies geography={geoUrl} transform="translate(10,0)">
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
                      setHoverCounty(geo.properties.NAME+" County");
                    }}
                    onMouseLeave={()=>{
                      setHover(0);
                      setHoverCounty(selectedCounty.NAME+" County");
                    }}
                    fill = {(hover===geo.properties.GEOID) ? '#f2a900':
                      (mapColor[(geo.properties.NAME+" County")]===undefined)?'white':mapColor[(geo.properties.NAME+" County")]}
                    strokeWidth = {selectedCounty.GEOID===geo.properties.GEOID ? 3.5:0.5}
                    stroke = {selectedCounty.GEOID===geo.properties.GEOID ? '#da291c':'black'}
                  />
                ))}
              </svg>
            }
          </Geographies>
        </ComposableMap>
        </div>
        </Tooltip>
        {/* <ReactTooltip place='right' style={{position:'absolute'}} data-offset="{'top': 100, 'left': 100}"> 
          <p>{hoverCounty}</p>
        </ ReactTooltip>  */}
        {/* <div>
          {Legend()}
        </div> */}
      </div>
      );
}