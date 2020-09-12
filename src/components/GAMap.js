import React, { useEffect, useState } from 'react'
import { Container, Grid, Dropdown, Breadcrumb, Header, List, Loader, Divider, Image } from 'semantic-ui-react'
import { geoCentroid } from "d3-geo";
import Geographies from './Geographies';
import Geography from './Geography';
import ComposableMap from './ComposableMap';
import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import { scaleQuantile } from "d3-scale";
import configs from "./state_config.json";
import ReactDOM from 'react-dom';


function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

//const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
//const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"
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

  const [stateName, setStateName] = useState('Georgia');
  const [fips, setFips] = useState('13');
  const [tooltipContent, setTooltipContent] = useState('');
  const history = useHistory();
  const [dataFltrd, setDataFltrd] = useState();

  const [dataStateFltrd, setDataStateFltrd] = useState();
  const [dataState, setDataState] = useState();

  const [data, setData] = useState();
  const [date, setDate] = useState('');
  const [stateLabels, setStateLabels] = useState();
  const [colorScale, setColorScale] = useState();

  const [legendMax, setLegendMax] = useState([]);
  const [legendMin, setLegendMin] = useState([]);
  const [legendSplit, setLegendSplit] = useState([]);

  const [metric, setMetric] = useState('mean7daycases');


  return (
      <div>
              
        <ComposableMap 
          //projection="geoAlbersUsa" 
          projection="geoTransverseMercator"
          data-tip=""
          width={1000} 
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
                    //key={geo.rsmKey}
                    geography={geo}

                    //fill={fips===geo.id.substring(0,2)?colorHighlight:
                    fill={fips===13?colorHighlight:
                    ((colorScale && data[geo.id] && (data[geo.id][metric]) > 0)?
                        colorScale[data[geo.id][metric]]: 
                        (colorScale && data[geo.id] && data[geo.id][metric] === 0)?
                          '#e1dce2':'#FFFFFF')}
                  />
                ))}
              </svg>
            }
          </Geographies>
        </ComposableMap>      
      </div>
      );
}