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
import {Loader} from 'semantic-ui-react'

const geoUrl ="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/GA-13-georgia-counties.json"


export default function GAMap(props) {
  const [hover, setHover] = useState(0);
  const [hoverCounty, setHoverCounty] = useState("Fulton County");
  const [toolTipVal, setToolTipVal] = useState(10.4);    // does not show variable
  const {selectedVariable, 
    selectedTable,
    selectedCounty, 
    fetchedData,
    actions: {handlePageStateChange}} = useGADM();
  // const colorPalette = [
  //   "#D8E7E9",
  //   "#A4C8CB",
  //   "#71A8AD", 
  //   "#4A7C82",
  //   "#34575B",
  //   "#253E41"
  // ];

  // const colorPalette = [
  //   "#deebf7",
  //   "#c6dbef",
  //   "#9ecae1",
  //   "#6baed6",
  //   "#3182bd",
  //   "#08519c"
  //   ];

  const colorPalette = [
    "#cbdcf1",
    "#85B2E0",
    // "#407FBF",
    "#2966A3",
    // "#174C82",
    "#0A335C"
    ];



  const [mapColor, setMapColor] = useState(0);
  const [legendSplit, setLegendSplit] = useState([]);
  const [legendMin, setLegendMin] = useState();
  const [legendMax, setLegendMax] = useState();

  
  useEffect(()=>{
    var statedata = _.filter(fetchedData, {'subsubgroup': selectedVariable.varName});
    var varData = _.map(statedata,'value');
    varData = varData.filter((number)=> number!=='N/A');
    setLegendMin(Math.min(...varData).toFixed(1));
    setLegendMax(Math.max(...varData).toFixed(1));
    var scaler = scaleQuantile().domain(varData).range(colorPalette);
    let scaleMap = {};

    if (selectedVariable.varName === 'Cardiologists' || selectedVariable.varName === 'Endocrinologists'){
      _.forEach(statedata, item => {
        if (item.value == 0){
          scaleMap[item.county] = '#D4E5F7'
        } else {
          varData = varData.filter((number)=> number!=='N/A' && number!==0);
          scaler = scaleQuantile().domain(varData).range(colorPalette.slice(1,4));
          scaleMap[item.county] = scaler(item.value)
          var customeLegendSplit = scaler.quantiles();
          setLegendSplit([0].concat(customeLegendSplit));
          console.log("sq ", legendSplit);
        }
      });
    } else {
      _.forEach(statedata, item => {
        scaleMap[item.county] = scaler(item.value)
      });
      setLegendSplit(scaler.quantiles());
    }

    setMapColor(scaleMap);
    console.log(scaler);
    console.log("sqr ", legendSplit);
  },[selectedVariable, fetchedData]);



  const Legend = () => {
    let MinVal;
    let MaxVal;

      if(legendMin>999999){
        MinVal = <text x={37} y={35} style={{fontSize: '0.7em'}}>{(legendMin/1000000).toFixed(1) + "M"} </text>;
      }else if(legendMin>999){
        MinVal = <text x={37} y={35} style={{fontSize: '0.7em'}}>{(legendMin/1000).toFixed(1) + "K"} </text>;
      }else{
        MinVal = <text x={37} y={35} style={{fontSize: '0.7em'}}>{legendMin}</text>;
      }
  
      if(legendMax>999999){
        MaxVal = <text x={80+20 * (colorPalette.length - 1)} y={35} style={{fontSize: '0.7em'}}>{(legendMax/1000000).toFixed(1) + "M"} </text>;
      }else if(legendMax>999){
        MaxVal = <text x={80+20 * (colorPalette.length - 1)} y={35} style={{fontSize: '0.7em'}}>{(legendMax/1000).toFixed(1) + "K"} </text>;
      }else{
        MaxVal = <text x={80+20 * (colorPalette.length - 1)} y={35} style={{fontSize: '0.7em'}}>{legendMax}</text>;
      }

      if(legendMin>999 && legendMax<999999){
        MinVal = <text x={40} y={35} style={{fontSize: '0.7em'}}>{(legendMin/1000).toFixed(1)} </text>;
        MaxVal = <text x={80+20 * (colorPalette.length - 1)} y={35} style={{fontSize: '0.7em'}}>{(legendMax/1000).toFixed(1)} </text>;
      }

    if (Object.keys(mapColor).length>0 && legendMin>999 && legendMax<999999) {    // income
      return (
      <svg width="280" height="80" transform="translate(-10,-20)"> 
        {_.map(legendSplit, (splitpoint, i) => {
          return <text key = {i} x={64 + 24 * (i)} y={35} style={{fontSize: '0.6em'}}> {(legendSplit[i]/1000).toFixed(1)}</text>                                      
        })}

      {MinVal}
      {MaxVal}
        
        {_.map(colorPalette, (color, i) => {
          return <rect key={i} x={50+24*i} y={40} width="22" height="20" style={{fill: color, strokeWidth:1, stroke: color}}/>                    
        })} 
        <text x={30} y={74} style={{fontSize: '0.7em'}}>Low (K{selectedVariable.unit})</text>
        <text x={80+20 * (colorPalette.length - 1)} y={74} style={{fontSize: '0.7em'}}>High (K{selectedVariable.unit})</text>

        <rect x={200} y={40} width="20" height="20" style={{fill: "#FFFFFF", strokeWidth:0.5, stroke: "#000000"}}/>                    
        <text x={225} y={48} style={{fontSize: '0.7em'}}> None </text>
        <text x={225} y={58} style={{fontSize: '0.7em'}}> Reported </text>
      </svg>);
    } else if (Object.keys(mapColor).length>0) {
      return (
      <svg width="280" height="80" transform="translate(-10,-20)"> 
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

      {MinVal}
      {MaxVal}
        
        {_.map(colorPalette, (color, i) => {
          return <rect key={i} x={50+24*i} y={40} width="22" height="20" style={{fill: color, strokeWidth:1, stroke: color}}/>                    
        })} 
        <text x={30} y={74} style={{fontSize: '0.7em'}}>Low {selectedVariable.unit}</text>
        <text x={80+20 * (colorPalette.length - 1)} y={74} style={{fontSize: '0.7em'}}>High {selectedVariable.unit}</text>

        <rect x={200} y={40} width="20" height="20" style={{fill: "#FFFFFF", strokeWidth:0.5, stroke: "#000000"}}/>                    
        <text x={225} y={48} style={{fontSize: '0.7em'}}> None </text>
        <text x={225} y={58} style={{fontSize: '0.7em'}}> Reported </text>
      </svg>);
    } else {
      return;
    }
  };

  const useStyles = makeStyles((theme) => ({
    customSize: {
      width: 120,
      height: 56,
      position: 'fixed',
      top: '10px',
      left: '-135px',
      fontSize: '0.85rem',
      padding: '0 0.9rem',
      display: 'flex',
      alignItems: 'center'
    },
  }));

  const classes = useStyles();

  useEffect(()=>{
    var ttval = _.map(_.filter(fetchedData, {'subsubgroup': selectedVariable.varName, 'county': hoverCounty}),'value');
    if (ttval!== "N/A"){
      var sp = (ttval + '').split('.');
      if (sp[1]!==undefined && sp[1].length>2){
        ttval = parseFloat(ttval).toFixed(1);
      }
    }
    setToolTipVal(ttval);
  },[hoverCounty, fetchedData, selectedVariable]);

  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
  } 
  console.log("fetch", fetchedData)
  if (fetchedData.length>10) {
    return (
      <div>  
        <div>
          {Legend()}
        </div>
        <Tooltip id='tooltip' placement="top-end" open={hover>-1} classes={{ tooltip: classes.customSize }}
          title={
            <p>
              {hoverCounty}<br/>
              Value: {numberWithCommas(toolTipVal)}
            </p>
        }>
        <div>
        <ComposableMap 
          //projection="geoAlbersUsa" 
          projection="geoTransverseMercator"
          data-tip=""
          width={560} 
          height={530}
          strokeWidth= {0.5}
          stroke= 'black'
          projectionConfig={{scale: 5500}}
          
           >
          <Geographies geography={geoUrl} transform="translate(50,-40)">
            { 
            ({ geographies }) => 
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
                )) }
              </svg>
            }
          </Geographies>
        </ComposableMap>
        </div>
        </Tooltip>
      </div>
      );
    }
      else {
        return <Loader active inline='centered' />
    }
}