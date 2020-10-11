// React
import React, {useEffect, useState} from "react";
import GAMap from "./GAMap";
import {GADMProvider, useGADM} from './GADMProvider';
import { useStitchAuth } from "./StitchAuth";
import { 
  Container, 
  Grid, 
  Table,
  Header,
  Divider,
  List,
  Menu
} from 'semantic-ui-react'
import {Alert, AlertTitle} from '@material-ui/lab';
import {gatech} from '../stitch/mongodb';
import _ from 'lodash';
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ComposableMap from "./ComposableMap";


function DetTable(props){
  const categories = _.map(props.categories,'cat');
  const unit = _.map(props.categories,'unit');
  console.log("unit ",unit);
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
    console.log('subGroup', selectedTable.qryName);
    console.log('county', selectedCounty.NAME+" County");
    console.log(countArray)
    setCount(countArray);
    
    //state avg stats
    const byGroup = _.groupBy(_.filter(_.reject(fetchedData,['subsubgroup','% Diabetes in Medicaid Population']),{'subgroup': selectedTable.qryName}),'subsubgroup');  // sets of subsubgroup; by table; sorted here i guess
    console.log("groups ", byGroup);
    var i1;
    var resultArray = [];
    for (i1 in byGroup){   // each subsubgroup,length 159
      var mean = _.meanBy(_.reject(byGroup[i1],['value','N/A']),function(o){return o.value;});
      resultArray.push(mean.toFixed(1));
    }
    console.log("ave ", resultArray);
    setStateAvg(resultArray);
  };
  
  useEffect(()=>{
      GetValue();
  }, [selectedCounty, selectedTable, fetchedData]);


  const zipped = count.map((obj,index) =>{
    var val;   //deal with na
    if (obj.value!== "N/A"){
      var sp = (obj.value + '').split('.');
      if (sp[1]!==undefined && sp[1].length>2){
        val = obj.value.toFixed(2);
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
      <Table.Cell style={{fontSize: '0.9em',verticalAlign:"middle",textAlign:"center", paddingLeft:'0.2em',paddingRight:'0.2em'}}>{val}</Table.Cell>    
      <Table.Cell style={{fontSize: '0.9em',verticalAlign:"middle",textAlign:"center", paddingLeft:'0.2em',paddingRight:'0.2em'}}>{stateAvg[index]}</Table.Cell>            
    </Table.Row>);
  });


    return (
    <Table.Body>{zipped}</Table.Body>
  );
}


function MenuButton() {
  const {selectedTable,
        actions: {handlePageStateChange}} = useGADM();

  return(
    <Menu vertical tabular inverted style={{height:'100%',width:'95%'}}>   
    {/* ,width:'90%' */}
      <Menu.Item name='Demographic Composition' style={{lineHeight:'1.3em', color:'black'}}
                color='blue'
                active = {selectedTable.tableName === 'Demographic Composition'}  
                onClick={()=>{
                  handlePageStateChange({selectedTable: {tableName:'Demographic Composition',
                                                        qryName:'Demographic Composition'}});
            }}/>
      <Menu.Item name='Cardiometabolic Disease Morbidity' style={{lineHeight:'1.3em', color:'black'}}
                color='blue'
                active = {selectedTable.tableName === 'Cardiometabolic Disease Morbidity'}  
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Cardiometabolic Disease Morbidity',
                                                            qryName:'Cardiometabolic disease morbidity'}});
            }}/>
      <Menu.Item name='Clinical Events' style={{lineHeight:'1.3em', color:'black'}}
                color='blue'
                active = {selectedTable.tableName === 'Clinical Events'}  
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Clinical Events',
                                                            qryName:'Clinical events'}});
            }}/>
      <Menu.Item name='Lifestyle Related Risk Factors' style={{lineHeight:'1.3em', color:'black'}}
                color='blue'
                active = {selectedTable.tableName === 'Lifestyle Related Risk Factors'}  
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Lifestyle Related Risk Factors',
                                                            qryName:'Lifestyle Related Risk Factors'}});
            }}/>
      <Menu.Item name='Health Care' style={{lineHeight:'1.3em', color:'black'}}
                color='blue'
                active = {selectedTable.tableName === 'Healthcare'}  
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Healthcare',
                                                            qryName:'Healthcare'}});
            }}/>
      <Menu.Item name='Socioeconomic Factors' style={{lineHeight:'1.3em', color:'black'}}
                color='blue'
                active = { selectedTable.tableName === 'Socioeconomic Factors'}  
                onClick={()=>{
                    handlePageStateChange({selectedTable: {tableName:'Socioeconomic Factors',
                                                          qryName:'Socioeconomic Factors'}});
            }}/>
      <Menu.Item name='Environmental Factors' style={{lineHeight:'1.3em', color:'black'}}
                color='blue'
                active = { selectedTable.tableName === 'Environmental Factors'}  
                onClick={()=>{
                    handlePageStateChange({selectedTable: {tableName:'Environmental Factors',
                                                          qryName:'Environmental Factors'}});
            }}/>
    </Menu>
  )
}                          

function DataPanel() {
  const {isLoggedIn} = useStitchAuth();

  const {selectedTable,
    selectedVariable, 
    selectedCounty, 
    fetchedData,
    actions: {handlePageStateChange}} = useGADM();

  const fetchData = async()=> {
    const prom = await gatech.find({},{projection:{"subgroup":1,"subsubgroup":1,"value":1,"county":1}}).toArray();
    handlePageStateChange({fetchedData:prom});
    console.log(prom);
  }

  useEffect(()=>{
    if (isLoggedIn === true){
      fetchData();
    }
  },[]);


  const RowCat = () =>{    // determines the printname
    if (selectedTable.tableName==="Demographic Composition") {
      return([{'cat':"% of 65 y or older", 'unit':'(%)'},
                                    {'cat':"% Black/African American",'unit':'(%)'},
                                    {'cat':"% Asian",'unit':'(%)'},
                                    {'cat':"% Foreign born",'unit':'(%)'},
                                    {'cat':"% Hispanic",'unit':'(%)'},
                                    {'cat':"Median age (y)","unit":'(y)'},
                                    {'cat':"Total Population, thousands", "unit":'(k)'},
                                    {'cat':"% Women",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Cardiometabolic disease morbidity") {
      return([{'cat':"% CHD Prevalence in Medicaid population",'unit':'(%)'},
      {'cat':"% with Diabetes",'unit':'(%)'},
      {'cat':"% with Hypertension in Medicaid population",'unit':'(%)'},
      {'cat':"Newly diagnosed diabetes (new cases per 1,000)",'unit':'(per k)'},
      {'cat':"% Obese",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Clinical events") {
      return([{'cat':"CVD deaths per 100,000",'unit':'(per m)'},
      {'cat':"CVD hospitalizations per 100,000",'unit':'(per m)'},
      {'cat':"Diabetes deaths per 100,000",'unit':'(per m)'},
      {'cat':"Diabetes hospitalizations per 100,000",'unit':'(per m)'},
      {'cat':"Kidney hospitalizations per 100,000",'unit':'(per m)'}]);
    }
    if (selectedTable.qryName==="Lifestyle Related Risk Factors"){
      return([{'cat':"% Excessive drinkers",'unit':'(%)'},
      {'cat':"% Physical inactive",'unit':'(%)'},
      {'cat':"% Insufficient sleep (<7 hours)",'unit':'(%)'},
      {'cat':"% Current Smokers",'unit':'(%)'}]);
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
      {'cat':"Income Inequality",'unit':''},
      {'cat':"Median income ($)",'unit':'($)'},
      {'cat':"% Unemployed",'unit':'(%)'}]);
    }
    if (selectedTable.qryName==="Environmental Factors") {
      return([{'cat':"% Exercise opportunities",'unit':'(%)'},
      {'cat':"Food environment index",'unit':''},
      {'cat':"% Severe housing problems",'unit':'(%)'},
      {'cat':"Residential segregation score",'unit':''}]);
    }
  }


  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as='h3' style={{fontWeight: 300}}>
            Statistics of {selectedCounty.NAME} County
            <Header.Subheader style={{fontWeight: 300}}>
              The table below show diabetes-related health determinants of {selectedCounty.NAME} county.
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column textAlign="left" style={{paddingTop: '1em', paddingLeft:'4em'}}>
          <Grid.Row>
            <Header as='h4' style={{fontWeight: 300, color:'#da291c', paddingLeft:'1em'}}><i><b>Select a category of county characteristics for display</b></i></Header>
          </Grid.Row>
          <Grid.Row style={{paddingTop: '1.2em', width:'95%'}}>
            <MenuButton/>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column style={{paddingTop: '2.4em',textAlign:"center"}}>
          {/* <Grid.Row> */}
          <Header block as='h4' style={{fontWeight: 550, backgroundColor:'#012169',color:'whitesmoke', verticalAlign:'center',margin:'0em',paddingTop:'0.4em',paddingBottom:'0.4em',border:'0',borderRadius:'0.6em 0em 0.6em 0em'}}>
          {/* style={{fontWeight: 550, color:'#012169',verticalAlign:'center',margin:'0em',paddingTop:'0.4em',paddingBottom:'0.4em',border:'0',borderRadius:'0.6em 0em 0.6em 0em'}}  */}
            {selectedTable.tableName}
          </Header>
          {/* </Grid.Row> */}
          <Table selectable basic='very' fixed style={{width:'100%'}}>    
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{borderTop: 0, fontWeight:500,textAlign:"center", width:'50%'}}>Characteristic</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0, fontWeight:500,textAlign:"center", width:'27%', paddingLeft:'0',paddingRight:'0'}}>County Stat</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0, fontWeight:500,textAlign:"center", width:'25%'}}>State Mean</Table.HeaderCell>                                
              </Table.Row>
            </Table.Header>
            <DetTable categories={RowCat()} />
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function MapPanel() {
  const {selectedVariable, 
    selectedCounty, 
    actions: {handlePageStateChange}} = useGADM();

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as='h3' style={{fontWeight: 600, paddingLeft:'2em', height:'3em',color:'#b58500'}}>
            {selectedVariable.printName}
            <Header.Subheader style={{fontWeight: 300, margin:'0em'}}>
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
    );

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
  },[userWidth]
  )
  console.log(userWidth);


  return (
    <GADMProvider>
      <Container>
        <Grid style={{paddingTop: '2em'}}>
          <Grid.Row centered columns={1}
          style={{ background: 'linear-gradient(to bottom, #0c2340, #012169)'}}>
            {/* style={{ backgroundImage: `url(${require("../bg2.jpg")})`}} `#d9d9d6` backgroundColor: `#012169`*/}
            <Grid.Column textAlign="center">
              <Header as='h1' style={{fontWeight: 500,color:'whitesmoke'}}>
                Georgia Diabetes Data Portal
                <Header.Subheader style={{fontWeight: 300,color:'whitesmoke'}}>
                  Interactive Dashboard of Diabetes-Related Health Determinants
                </Header.Subheader>
              </Header>
              {/* <Header as='h4' style={{fontWeight: 300}}>
                A Quick User Guide
              </Header> */}
              <List bulleted style={{fontWeight: 300, color:'whitesmoke'}} size="mini">
                {/* <List.Item>
                  Click on a category in the menu to see the <br/>
                  characteristics under each category in the table.
                </List.Item> */}
                <List.Item>
                  Click on a Characteristic on the table located <i>on the left</i> <br/>
                  to see the county-level distribution on the map <i>on the right</i>.
                </List.Item>
                <List.Item>
                  Click on a county on the map located <i>on the right</i> <br/>
                  to see its full statistics on the table <i>on the left</i>.
                </List.Item>                
              </List>
            </Grid.Column>
          </Grid.Row>
          {/* <Divider/> */}
          <Grid.Row centered columns={2} style={{ display: Warning ? "none" : "block", paddingTop:'4em' }}>
            <Grid.Column width={8} textAlign="center">  
              <DataPanel />
            </Grid.Column>
            <Grid.Column width={8} textAlign="center">
              <MapPanel />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ display: Warning ? "block" : "none", textAlign:"left", color:"red", paddingTop:'4em',paddingLeft:'2em'}}>
            <Grid.Column>
              {/* <List>
                <List.Item>Warning</List.Item>
                <List.Item style={{fontSize:'0.8em'}}>Please expand your browser window and refresh the page to view the content.</List.Item>
                <List.Item style={{fontSize:'0.8em'}}>If you are using a mobile device, please use a PC to visit this page.</List.Item>
              </List> */}
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