// React
import React, {useEffect, useState} from "react";
import GAMap from "./GAMap";
import { GADMProvider, useGADM } from './GADMProvider';
import { useStitchAuth,StitchAuthProvider } from "./StitchAuth";
import { 
  Container, 
  Grid, 
  Table,
  Header,
  Divider,
  Loader,
  Menu,
  Dropdown,
  Icon
} from 'semantic-ui-react'
import {Alert, AlertTitle} from '@material-ui/lab';
import {gatech} from '../stitch/mongodb';
import _ from 'lodash';
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ComposableMap from "./ComposableMap";
import { useForkRef } from "@material-ui/core";
import { Pane } from "react-leaflet";

// table in DataPanel
function DetTable(props){
  const categories = _.map(props.categories,'cat');
  const unit = _.map(props.categories,'unit');
  const [count,setCount] = useState([]);
  const [stateAvg,setStateAvg] = useState([]);
  const {selectedCounty, 
    selectedTable,
    selectedVariable,
    fetchedData,
    actions: {handlePageStateChange}} = useGADM();

  const GetValue = () => {

    const prom = fetchedData;
    //county stats
    var countArray = _.sortBy(_.filter(_.reject(fetchedData,['subsubgroup','% Diabetes in Medicaid Population']),{'subgroup': selectedTable.qryName,'county': selectedCounty.NAME+" County"}),['subsubgroup']);
    setCount(countArray);
    console.log("count ",countArray);
    
    //state avg stats
    const byGroup = _.sortBy(_.groupBy(_.filter(_.reject(fetchedData,['subsubgroup','% Diabetes in Medicaid Population']),{'subgroup': selectedTable.qryName}),'subsubgroup'),['subsubgroup']);  // sets of subsubgroup; by table; sorted here i guess
    var i1;
    var resultArray = [];
    for (i1 in byGroup){   // each subsubgroup,length 159
      var mean = _.meanBy(_.reject(byGroup[i1],['value','N/A']),function(o){return o.value;});
      resultArray.push(mean.toFixed(1));
    }
    console.log("avg ", resultArray);
    setStateAvg(resultArray);
  };
  
  useEffect(()=>{
      GetValue();
  }, [selectedCounty, selectedTable, fetchedData]);

  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
  } 

  const zipped = count.map((obj,index) =>{
    var val;   //deal with na
    if (obj.value!== "N/A"){
      var sp = (obj.value + '').split('.');
      if (sp[1]!==undefined && sp[1].length>2){
        val = obj.value.toFixed(1);
      }else{
        val = obj.value;
      }
    } else {
      val = obj.value;
    }
    
    return(
    <Table.Row key={index}
              onClick={()=>{
                handlePageStateChange({selectedVariable: {varName:obj.subsubgroup,
                                                    printName:categories[index],
                                                    unit: unit[index]},
                                                    });}}
                active = {selectedVariable.printName === categories[index]}
                >
      <Table.Cell style={{fontSize: '0.9em',verticalAlign:"middle",textAlign:"left", paddingLeft:'0.5em'}}>{categories[index]}</Table.Cell>
      <Table.Cell style={{fontSize: '0.9em',verticalAlign:"middle",textAlign:"center", paddingLeft:'0.2em',paddingRight:'0.2em'}}>{numberWithCommas(val)}</Table.Cell>    
      <Table.Cell style={{fontSize: '0.9em',verticalAlign:"middle",textAlign:"center", paddingLeft:'0.2em',paddingRight:'0.2em'}}>{numberWithCommas(stateAvg[index])}</Table.Cell>            
    </Table.Row>);
  });

    return (
    <Table.Body>{zipped}</Table.Body>
  );
}


function MenuButton() {
  const {selectedTable,
        selectedVariable,
        fetchedData,
        actions: {handlePageStateChange}} = useGADM();
  const getOptions = (tableName) =>{    // determines the printname
    if (tableName==="Demographic Composition") {
      return([{key:1, text:"% 65 y or older", value:"65 yrs or older"},
                                    {key:2, text:"% Black/African American",value:"Black"},
                                    {key:3, text:"% Asian",value:3},
                                    {key:4, text:"% Foreign born",value:4},
                                    {key:5, text:"% Hispanic",value:5},
                                    {key:6, text:"Median age (y)",value:6},
                                    {key:7, text:"Total Population, thousands", value:7},
                                    {key:8, text:"% Women",value:8}]);
    }
    if (tableName==="Cardiometabolic disease morbidity") {
      return([{key:1, text:"% CHD Prevalence in Medicaid population",value:1},
      {key:2, text:"% with Diabetes",value:2},
      {key:3, text:"% with Hypertension in Medicaid population",value:3},
      {key:4, text:"Newly diagnosed diabetes (new cases per 1,000)",value:4},
      {key:5, text:"% Obese",value:5}]);
    }
    if (tableName==="Clinical events") {
      return([{key:1, text:"CVD deaths per 100,000",value:1},
      {key:2, text:"CVD hospitalizations per 100,000",value:2},
      {key:3, text:"Diabetes deaths per 100,000",value:3},
      {key:4, text:"Diabetes hospitalizations per 100,000",value:4},
      {key:5, text:"Kidney hospitalizations per 100,000",value:5}]);
    }
    if (tableName==="Lifestyle Related Risk Factors"){
      return([{key:1, text:"% Excessive drinkers",value:1},
      {key:2, text:"% Physically inactive",value:2},
      {key:3, text:"% Insufficient sleep (<7 hours)",value:3},
      {key:4, text:"% Current smokers",value:4}]);
    }
    if (tableName==="Healthcare"){
      return([
        // "% Diabetes Screening",
        {key:1, text:"Cardiologists",value:1},
        {key:2, text:"Endocrinologists",value:2},
        {key:3, text:"Primary care doctors (ratio of population to primary care physicians)",value:3},
        {key:4, text:"% Uninsured",value:4}]);
    }
    if (tableName==="Socioeconomic Factors") {
      return([{key:1, text:"% Graduates high school in 4 years",value:1},
      {key:2, text:"% In poverty",value:2},
      {key:3, text:"Income inequality",value:3},
      {key:4, text:"Median income ($)",value:4},
      {key:5, text:"% Unemployed",value:5}]);
    }
    if (tableName==="Environmental Factors") {
      return([{key:1, text:"% Exercise opportunities",value:1},
      {key:2, text:"Food environment index",value:2},
      {key:3, text:"Residential segregation score",value:3},
      {key:4, text:"% Severe housing problems",value:4}]);
    }
  }

  const [qryname, setQryname] = useState();
  
  useEffect(()=>{
  const qry = _.groupBy(_.sortBy(_.filter(_.reject(fetchedData,['subsubgroup','% Diabetes in Medicaid Population']), {'subgroup': selectedTable.qryName}),'subsubgroup'),'subsubgroup');
  setQryname(Object.keys(qry))
  },[selectedTable]);
  
  const RowCat = () =>{    // determines the printname
    if (selectedTable.tableName==="Demographic Composition") {
      return([{'cat':"% 65 years and older", 'unit':'(%)'},
                                    {'cat':"% Black/African American",'unit':'(%)'},
                                    {'cat':"% Asian",'unit':'(%)'},
                                    {'cat':"% Foreign born",'unit':'(%)'},
                                    {'cat':"% Hispanic",'unit':'(%)'},
                                    {'cat':"Median age (y)","unit":'(y)'},
                                    {'cat':"Total Population, thousands", "unit":'(K)'},
                                    {'cat':"% Women",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Cardiometabolic disease morbidity") {
      return([{'cat':"% CHD Prevalence in Medicaid population",'unit':'(%)'},
      {'cat':"% Diabetes",'unit':'(%)'},
      {'cat':"% Hypertension in Medicaid population",'unit':'(%)'},
      {'cat':"Newly diagnosed diabetes (new cases per 1,000)",'unit':'(per K)'},
      {'cat':"% Obese",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Clinical events") {
      return([{'cat':"CVD deaths per 100,000",'unit':'(per M)'},
      {'cat':"CVD hospitalizations per 100,000",'unit':'(per M)'},
      {'cat':"Diabetes deaths per 100,000",'unit':'(per M)'},
      {'cat':"Diabetes hospitalizations per 100,000",'unit':'(per M)'},
      {'cat':"Kidney hospitalizations per 100,000",'unit':'(per M)'}]);
    }
    if (selectedTable.qryName==="Lifestyle Related Risk Factors"){
      return([{'cat':"% Excessive drinkers",'unit':'(%)'},
      {'cat':"% Physically inactive",'unit':'(%)'},
      {'cat':"% Insufficient sleep (<7 hours)",'unit':'(%)'},
      {'cat':"% Current smokers",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Healthcare"){
      return([
        // "% Diabetes Screening",
        {'cat':"Cardiologists",'unit':''},
        {'cat':"Endocrinologists",'unit':''},
        {'cat':"Primary care doctors (ratio of population to primary care physicians)",'unit':''},
        {'cat':"% Uninsured",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Socioeconomic Factors") {
      return([{'cat':"% Graduates high school in 4 years",'unit':'(%)'},
      {'cat':"% In poverty",'unit':'(%)'},
      {'cat':"Income inequality",'unit':''},
      {'cat':"Median income ($)",'unit':'$'},
      {'cat':"% Unemployed",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Environmental Factors") {
      return([{'cat':"% Exercise opportunities",'unit':'(%)'},
      {'cat':"Food environment index",'unit':''},
      {'cat':"Residential segregation score",'unit':''},
      {'cat':"% Severe housing problems",'unit':'(%)'}]);
    }
  }
  
  const categories = RowCat();
  const item = categories.map((obj,index)=>
  <Dropdown.Item key={index} active={selectedVariable.printName === obj.cat} onMouseDown={()=>{
    handlePageStateChange({selectedVariable: {varName:qryname[index],
                                        printName:obj.cat,
                                        unit: obj.unit},
                                        });}}>{obj.cat}</Dropdown.Item>
                          )

  console.log("var ", selectedVariable.printName)
  console.log("cat ", categories)
  // useEffect(()=>{},[]);

  if(fetchedData.length>10){
  return(
    <Grid.Column>  
      <Menu vertical tabular style={{width:'96%', fontSize:'0.9rem', verticalAlign: "middle"}}>
    <Dropdown item openOnFocus={false} pointing='left' closeOnBlur text='Demographic Composition' style={{lineHeight:'1.3em', height: '4rem'}}
                direction = 'right'
                active = {(selectedTable.tableName==='Demographic Composition').toString()}
                onClick={()=>{
                  handlePageStateChange({selectedTable: {tableName:'Demographic Composition',
                                                        qryName:'Demographic Composition'}});
            }}>
      <Dropdown.Menu>{item}</Dropdown.Menu>
    </Dropdown>
    <Dropdown item closeOnBlur openOnFocus={false} pointing='left' closeOnBlur text='Cardiometabolic Disease Morbidity' style={{lineHeight:'1.3em', height: '4rem'}} 
                active = {(selectedTable.tableName==='Cardiometabolic Disease Morbidity').toString()}
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Cardiometabolic Disease Morbidity',
                                                            qryName:'Cardiometabolic disease morbidity'}});
            }}>
         <Dropdown.Menu>{item}</Dropdown.Menu>
    </Dropdown>
    <Dropdown item closeOnBlur openOnFocus={false} pointing='left' closeOnBlur text='Clinical Events' style={{lineHeight:'2.2rem', height: '4rem'}}
                active = {(selectedTable.tableName==='Clinical Events').toString()}
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Clinical Events',
                                                            qryName:'Clinical events'}});
            }}>
      <Dropdown.Menu>{item}</Dropdown.Menu>
    </Dropdown> 
    <Dropdown item closeOnBlur openOnFocus={false} pointing='left' closeOnBlur text='Lifestyle Related Risk Factors' style={{lineHeight:'1.3em', height: '4rem'}}
                active = {(selectedTable.tableName==='Lifestyle Related Risk Factors').toString()}
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Lifestyle Related Risk Factors',
                                                            qryName:'Lifestyle Related Risk Factors'}});
            }}>
      <Dropdown.Menu>{item}</Dropdown.Menu>
      </Dropdown>
      <Dropdown item closeOnBlur openOnFocus={false} pointing='left' closeOnBlur text='Healthcare' style={{lineHeight:'2.2em', height: '4rem'}}
                active = {(selectedTable.tableName==='Healthcare').toString()}
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Healthcare',
                                                            qryName:'Healthcare'}});
            }}>
        <Dropdown.Menu>{item}</Dropdown.Menu>
      </Dropdown>
      <Dropdown item closeOnBlur openOnFocus={false} pointing='left' closeOnBlur text='Socioeconomic Factors' style={{lineHeight:'1.3em', height: '4rem'}}
                active = {(selectedTable.tableName==='Socioeconomic Factors').toString()}
                onClick={()=>{
                    handlePageStateChange({selectedTable: {tableName:'Socioeconomic Factors',
                                                          qryName:'Socioeconomic Factors'}});
            }}>
        <Dropdown.Menu>{item}</Dropdown.Menu>
      </Dropdown>
      <Dropdown item closeOnBlur openOnFocus={false} pointing='left' closeOnBlur text='Environmental Factors' style={{lineHeight:'1.3em', height: '4rem'}} 
                active = {(selectedTable.tableName==='Environmental Factors').toString()}
                onClick={()=>{
                    handlePageStateChange({selectedTable: {tableName:'Environmental Factors',
                                                          qryName:'Environmental Factors'}});
            }}>
        <Dropdown.Menu>{item}</Dropdown.Menu>
        </Dropdown>

    </Menu>
    </Grid.Column>
  )}
    else {
      return <Loader active inline='centered' style={{marginTop: '5rem'}}/>
  } 
}

// leftside menu
function MenuPanel() {
  const {fetchedData} = useGADM()
  
  return (
  <Grid>
  <Grid.Row>
    <Header as='h4' style={{fontWeight: 300, color:'#da291c', paddingLeft:'3em', paddingTop: '0.1rem'}}><i><b>Select an indicator</b></i></Header>
  </Grid.Row>
  <Grid.Row style={{paddingTop: '0.5rem',paddingLeft:'1.5rem', width:'95%', textAlign:'left', display: fetchedData!='undefined' ? "block": "none"}}>
    <MenuButton/>
  </Grid.Row>
  </Grid>
  )
}


// rightside data panel
function DataPanel() {
  const [desc,setDesc] = useState();
  const [source,setSource] = useState();

  const {selectedTable,
    selectedVariable, 
    selectedCounty, 
    fetchedData,
    actions: {handlePageStateChange}} = useGADM();

  const {
    isLoggedIn,
    actions: { handleAnonymousLogin },
  } = useStitchAuth();

  const fetchData = async()=> {
    const prom = await gatech.find({},{projection:{"subgroup":1,"subsubgroup":1,"value":1,"county":1,"desc":1,"source":1}}).toArray();
    handlePageStateChange({fetchedData:prom});
  }

  useEffect(()=>{
    if (isLoggedIn === true){
      fetchData();
    } else {
      handleAnonymousLogin();
    }
  },[isLoggedIn]);

  useEffect(()=>{
    var desc = _.map(_.filter(fetchedData,{'subsubgroup':selectedVariable.varName,'county':'Fulton County'}),'desc');
    setDesc(desc);
    var source = _.map(_.filter(fetchedData,{'subsubgroup':selectedVariable.varName,'county':'Fulton County'}),'source');
    setSource(source);
  },[selectedVariable,fetchedData]);


  const RowCat = () =>{    // determines the printname
    if (selectedTable.tableName==="Demographic Composition") {
      return([{'cat':"% 65 years and older", 'unit':'(%)'},
                                    {'cat':"% Black/African American",'unit':'(%)'},
                                    {'cat':"% Asian",'unit':'(%)'},
                                    {'cat':"% Foreign born",'unit':'(%)'},
                                    {'cat':"% Hispanic",'unit':'(%)'},
                                    {'cat':"Median age (y)","unit":'(y)'},
                                    {'cat':"Total Population, thousands", "unit":'(K)'},
                                    {'cat':"% Women",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Cardiometabolic disease morbidity") {
      return([{'cat':"% CHD Prevalence in Medicaid population",'unit':'(%)'},
      {'cat':"% Diabetes",'unit':'(%)'},
      {'cat':"% Hypertension in Medicaid population",'unit':'(%)'},
      {'cat':"Newly diagnosed diabetes (new cases per 1,000)",'unit':'(per K)'},
      {'cat':"% Obese",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Clinical events") {
      return([{'cat':"CVD deaths per 100,000",'unit':'(per M)'},
      {'cat':"CVD hospitalizations per 100,000",'unit':'(per M)'},
      {'cat':"Diabetes deaths per 100,000",'unit':'(per M)'},
      {'cat':"Diabetes hospitalizations per 100,000",'unit':'(per M)'},
      {'cat':"Kidney hospitalizations per 100,000",'unit':'(per M)'}]);
    }
    if (selectedTable.qryName==="Lifestyle Related Risk Factors"){
      return([{'cat':"% Excessive drinkers",'unit':'(%)'},
      {'cat':"% Physically inactive",'unit':'(%)'},
      {'cat':"% Insufficient sleep (<7 hours)",'unit':'(%)'},
      {'cat':"% Current smokers",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Healthcare"){
      return([
        // "% Diabetes Screening",
        {'cat':"Cardiologists",'unit':''},
        {'cat':"Endocrinologists",'unit':''},
        {'cat':"Primary care doctors (ratio of population to primary care physicians)",'unit':''},
        {'cat':"% Uninsured",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Socioeconomic Factors") {
      return([{'cat':"% Graduates high school in 4 years",'unit':'(%)'},
      {'cat':"% In poverty",'unit':'(%)'},
      {'cat':"Income inequality",'unit':''},
      {'cat':"Median income ($)",'unit':'$'},
      {'cat':"% Unemployed",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Environmental Factors") {
      return([{'cat':"% Exercise opportunities",'unit':'(%)'},
      {'cat':"Food environment index",'unit':''},
      {'cat':"Residential segregation score",'unit':''},
      {'cat':"% Severe housing problems",'unit':'(%)'}]);
    }
  }

 
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column style={{paddingLeft:'3rem'}}>
          <Header as='h3' style={{fontWeight: 300}}>
            Characteristics of {selectedCounty.NAME} County
            <Header.Subheader style={{fontWeight: 300}}>
              The table below show diabetes-related health determinants of {selectedCounty.NAME} county.
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        {/* <Grid.Column textAlign="left" style={{paddingTop: '1em', paddingLeft:'4em'}}> */}
          <Grid.Row>
            <Header as='h4' style={{fontWeight: 300, color:'#da291c', paddingLeft:'5em'}}><i><b>Select a category of county characteristics for display</b></i></Header>
          </Grid.Row>
        <TablePanel />
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{paddingLeft: '5em',fontSize:'0.9rem', textAlign:"left"}}>
          <b>Description: </b>{desc}<br/>
          <b>Source: </b>{source}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function TablePanel() {
  // const [desc,setDesc] = useState();
  // const [source,setSource] = useState();

  const {selectedTable,
    selectedVariable, 
    selectedCounty, 
    fetchedData,
    actions: {handlePageStateChange}} = useGADM();

  // const {
  //   isLoggedIn,
  //   actions: { handleAnonymousLogin },
  // } = useStitchAuth();

  // const fetchData = async()=> {
  //   const prom = await gatech.find({},{projection:{"subgroup":1,"subsubgroup":1,"value":1,"county":1,"desc":1,"source":1}}).toArray();
  //   handlePageStateChange({fetchedData:prom});
  // }

  // useEffect(()=>{
  //   if (isLoggedIn === true){
  //     fetchData();
  //   } else {
  //     handleAnonymousLogin();
  //   }
  // },[isLoggedIn]);

  // useEffect(()=>{
  //   var desc = _.map(_.filter(fetchedData,{'subsubgroup':selectedVariable.varName,'county':'Fulton County'}),'desc');
  //   setDesc(desc);
  //   var source = _.map(_.filter(fetchedData,{'subsubgroup':selectedVariable.varName,'county':'Fulton County'}),'source');
  //   setSource(source);
  // },[selectedVariable,fetchedData]);


  const RowCat = () =>{    // determines the printname
    if (selectedTable.tableName==="Demographic Composition") {
      return([{'cat':"% 65 years and older", 'unit':'(%)'},
                                    {'cat':"% Black/African American",'unit':'(%)'},
                                    {'cat':"% Asian",'unit':'(%)'},
                                    {'cat':"% Foreign born",'unit':'(%)'},
                                    {'cat':"% Hispanic",'unit':'(%)'},
                                    {'cat':"Median age (y)","unit":'(y)'},
                                    {'cat':"Total Population, thousands", "unit":'(K)'},
                                    {'cat':"% Women",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Cardiometabolic disease morbidity") {
      return([{'cat':"% CHD Prevalence in Medicaid population",'unit':'(%)'},
      {'cat':"% Diabetes",'unit':'(%)'},
      {'cat':"% Hypertension in Medicaid population",'unit':'(%)'},
      {'cat':"Newly diagnosed diabetes (new cases per 1,000)",'unit':'(per K)'},
      {'cat':"% Obese",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Clinical events") {
      return([{'cat':"CVD deaths per 100,000",'unit':'(per M)'},
      {'cat':"CVD hospitalizations per 100,000",'unit':'(per M)'},
      {'cat':"Diabetes deaths per 100,000",'unit':'(per M)'},
      {'cat':"Diabetes hospitalizations per 100,000",'unit':'(per M)'},
      {'cat':"Kidney hospitalizations per 100,000",'unit':'(per M)'}]);
    }
    if (selectedTable.qryName==="Lifestyle Related Risk Factors"){
      return([{'cat':"% Excessive drinkers",'unit':'(%)'},
      {'cat':"% Physically inactive",'unit':'(%)'},
      {'cat':"% Insufficient sleep (<7 hours)",'unit':'(%)'},
      {'cat':"% Current smokers",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Healthcare"){
      return([
        // "% Diabetes Screening",
        {'cat':"Cardiologists",'unit':''},
        {'cat':"Endocrinologists",'unit':''},
        {'cat':"Primary care doctors (ratio of population to primary care physicians)",'unit':''},
        {'cat':"% Uninsured",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Socioeconomic Factors") {
      return([{'cat':"% Graduates high school in 4 years",'unit':'(%)'},
      {'cat':"% In poverty",'unit':'(%)'},
      {'cat':"Income inequality",'unit':''},
      {'cat':"Median income ($)",'unit':'$'},
      {'cat':"% Unemployed",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Environmental Factors") {
      return([{'cat':"% Exercise opportunities",'unit':'(%)'},
      {'cat':"Food environment index",'unit':''},
      {'cat':"Residential segregation score",'unit':''},
      {'cat':"% Severe housing problems",'unit':'(%)'}]);
    }
  }

 
    if(fetchedData.length>10){
      return( 
        <Grid.Column style={{paddingTop: '2.4em',paddingLeft:'6rem',textAlign:"center", height:'33rem'}}>
          {/* <Grid.Row> */}
          <Header block as='h4' style={{fontWeight: 550, width:'20rem', backgroundColor:'#012169',color:'whitesmoke', verticalAlign:'center',paddingTop:'0.4em',paddingBottom:'0.4em',border:'0',borderRadius:'0.6em 0em 0.6em 0em'}}>
          {/* style={{fontWeight: 550, color:'#012169',verticalAlign:'center',margin:'0em',paddingTop:'0.4em',paddingBottom:'0.4em',border:'0',borderRadius:'0.6em 0em 0.6em 0em'}}  */}
            {selectedTable.tableName}
          </Header>
          {/* </Grid.Row> */}
          
            <Table selectable basic='very' fixed style={{width:'20rem'}}>    
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{borderTop: 0, fontWeight:500,textAlign:"center", width:'50%'}}>Characteristic</Table.HeaderCell>
                  <Table.HeaderCell style={{borderTop: 0, fontWeight:500,textAlign:"center", width:'27%', paddingLeft:'0',paddingRight:'0'}}>County</Table.HeaderCell>
                  <Table.HeaderCell style={{borderTop: 0, fontWeight:500,textAlign:"center", width:'25%'}}>State</Table.HeaderCell>                                
                </Table.Row>
              </Table.Header>
              <DetTable categories={RowCat()} />
            </Table>
        </Grid.Column>)
        }else{
          return (
            <Grid.Column style={{height:'33rem'}}>
              <Loader active inline='centered' style={{marginTop:'11rem'}}/>
            </Grid.Column>)
        }
    }

function MapPanel() {
  const {selectedVariable, 
    selectedCounty, 
    fetchedData,
    actions: {handlePageStateChange}} = useGADM();

if(fetchedData){
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as='h3' style={{fontWeight: 600, paddingLeft:'1rem', height:'3em',color:'#b58500'}}>
            {selectedVariable.printName}
            <Header.Subheader style={{fontWeight: 300, margin:'0em',paddingLeft:'0rem'}}>
              The color shows the distribution of {selectedVariable.printName} across the Georgia counties.
            </Header.Subheader>
          </Header>
          <Header as='h4' style={{fontWeight: 300, paddingTop:'0em', paddingLeft:'4em', paddingBottom:'-1em', textAlign:'left',color:'#da291c'}}>
            <i><b>Select a county to see detailed characteristics</b></i>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{padding:'0'}}>
        <Grid.Column>
          <GAMap />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );}

}

export default function GADiabetes() {
  const [Warning, setWarning] = useState(false);
  const [userWidth, setUserWidth] = useState(0);
  
  let wid = 0;
  useEffect(()=>{
    var d = document, root= d.documentElement, body= d.body;
    wid = window.innerWidth || root.clientWidth || body.clientWidth;
    setUserWidth(wid);
    if (wid<1200){
      setWarning(true);
    }
  },[userWidth, window.innerWidth]
  )
  console.log(userWidth);


  return (
    <GADMProvider>
      <Container>
        <Grid style={{paddingTop: '2em'}}>
          <Grid.Row centered columns={1}
          style={{ background: 'linear-gradient(to bottom, #0c2340, #012169)', height: '6rem'}}>
            {/* style={{ backgroundImage: `url(${require("../bg2.jpg")})`}} `#d9d9d6` backgroundColor: `#012169`*/}
            <Grid.Column textAlign="center">
              <Header as='h1' style={{fontWeight: 500,color:'whitesmoke'}}>
                Georgia Diabetes Data Portal
                <Header.Subheader style={{fontWeight: 300,color:'whitesmoke'}}>
                  Interactive Dashboard of Diabetes-Related Health Determinants
                </Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row> */}
              {/* <Header as='h4' style={{fontWeight: 600, paddingLeft: '5rem', paddingTop: '1rem'}}>
                A Quick User Guide:
              </Header> */}
              {/* <List style={{fontWeight: 400, color:'black', paddingTop: '2rem'}} size="small">    */}
              {/* bulleted */}
                {/* <List.Item> */}
                  {/* <Icon name='hand point right outline' /> Click on a characteristic on the table located <i>on the right</i> to see the county-level distribution on the map <i>on the left</i>. <br /> */}
                {/* </List.Item> */}
                {/* <List.Item> */}
                  {/* <Icon name='hand point right outline' /> Click on a county on the map located <i>on the left</i> to see its full characteristics on the table <i>on the right</i>. */}
                {/* </List.Item> */}
              {/* </List> */}
          {/* </Grid.Row> */}
          <Divider/>
          <Grid.Row centered columns={3} style={{ display: Warning ? "none" : "block", paddingTop:'2em' }}>
            <Grid.Column width={3} textAlign="center">  
              <MenuPanel />
            </Grid.Column>
            <Grid.Column width={7} textAlign="center">
              <MapPanel />
            </Grid.Column>
            <Grid.Column width={6} textAlign="center">  
              <DataPanel />
            </Grid.Column>
          </Grid.Row>
          {/* hide content if window is too small */}
          <Grid.Row style={{ display: Warning ? "block" : "none", textAlign:"left", color:"red", paddingTop:'4em',paddingLeft:'2em'}}>
            <Grid.Column>
              <Alert severity="error">
                <AlertTitle style={{fontSize: '1.3rem'}}>Warning</AlertTitle>
                Please expand your browser window and refresh the page to view the content.
                If you are using a mobile device, please use a PC to visit this page.
              </Alert>
              </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </GADMProvider>
  );
}