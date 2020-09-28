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
  List, Segment
} from 'semantic-ui-react'
import {gatech} from '../stitch/mongodb';
import { Menu,Button } from 'semantic-ui-react'
import _ from 'lodash';
import styled from 'styled-components';


function DetTable(props){
  const categories = props.categories;
  const [count,setCount] = useState([]);
  const [stateAvg,setStateAvg] = useState([]);
  const {selectedCounty, 
    selectedTable,
    selectedVariable,
    firstRender,
    actions: {handlePageStateChange}} = useGADM();
  const {isLoggedIn} = useStitchAuth();


  const GetValue = async()=> {

    const query = {"subgroup":selectedTable.qryName};
    const prom = await gatech.find(query,{projection:{"subsubgroup":1,"value":1,"county":1}}).toArray();

    //county stats
    var countArray = _.sortBy(_.filter(prom,['county',selectedCounty.NAME+" County"]),['subsubgroup']);
    setCount(countArray);
    
    //state avg stats
    const byGroup = _.groupBy(prom,'subsubgroup');  // sets of subsubgroup; by table; sorted here i guess
    handlePageStateChange({fetchedData:byGroup});   //save for map
    var i1;
    var resultArray = [];
    for (i1 in byGroup){   // each subsubgroup,length 159
      var mean = _.meanBy(_.reject(byGroup[i1],['value','N/A']),function(o){return o.value;});
      resultArray.push(mean.toFixed(1));
    }
    setStateAvg(resultArray);
  };
  
  useEffect(()=>{
    if (isLoggedIn === true){
      GetValue();
    }
  }, [selectedCounty, selectedTable]);

  // const MyRow = styled(Table.Row)`
  // &:active {
  //   background: orange !important;
  //   color:red !important;
  // }
  // `;

  const zipped = count.map((obj,index) =>{
    var val;   //deal with na
    if (obj.value!== "N/A"){
      val = obj.value.toFixed(1);
    } else {
      val = obj.value;
    }  
    return(
    <Table.Row key={index}
              onClick={()=>{
                handlePageStateChange({selectedVariable: {varName:obj.subsubgroup,
                                                    printName:categories[index]}
                                                  });}}
                active = {selectedVariable.printName === categories[index]}
                >
                  {/* style ={{color: selectedVariable.printName === categories[index] ? 'red':'green'}} */}
      <Table.Cell style={{fontSize: '0.9em',verticalAlign:"middle",textAlign:"left", paddingLeft:'0.5em'}}>{categories[index]}</Table.Cell>
      <Table.Cell style={{fontSize: '1em',verticalAlign:"middle",textAlign:"center"}}>{val}</Table.Cell>    
      <Table.Cell style={{fontSize: '1em',verticalAlign:"middle",textAlign:"center"}}>{stateAvg[index]}</Table.Cell>            
    </Table.Row>);
  });

  
  if (firstRender === true){
    handlePageStateChange({firstRender:false});
  }


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

  const {selectedTable,
    selectedVariable, 
    selectedCounty, 
    actions: {handlePageStateChange}} = useGADM();


  const RowCat = () =>{    // determines the printname
    if (selectedTable.tableName==="Demographic Composition") {
      return(["% of 65 y or older",
                                    "% Black/African American",
                                    "% Asian",
                                    "% Foreign born",
                                    "% Hispanic",
                                    "Median age (y)",
                                    "Total Population, thousands",
                                    "% Women"]);
    }
    if (selectedTable.qryName==="Cardiometabolic disease morbidity") {
      return(["% CHD Prevalence in Medicaid population",
              "% with Diabetes",
              "% with Hypertension in Medicaid population",
              "Newly diagnosed diabetes (new cases per 1,000)",
              "% Obese"]);
    }
    if (selectedTable.qryName==="Clinical events") {
      return(["CVD deaths per 100,000",
              "CVD hospitalizations per 100,000",
              "Diabetes deaths per 100,000",
              "Diabetes hospitalizations per 100,000",
              "Kidney hospitalizations per 100,000"]);
    }
    if (selectedTable.qryName==="Lifestyle Related Risk Factors"){
      return(["% Excessive drinkers",
              "% Physical inactive",
              "% Insufficient sleep (<7 hours)",
              "% Current Smokers"]);
    }
    if (selectedTable.qryName==="Healthcare"){
      return(["% Diabetes in Medicaid Population",
              "Cardiologists",
              "Endocrinologists",
              "Primary care doctors (ratio of population to primary care physicians)",
              "% Uninsured"]);
    }
    if (selectedTable.qryName==="Socioeconomic Factors") {
      return(["% Graduates high school in 4 years",
              "% In poverty",
              "Income Inequality",
              "Median income ($)",
              "% Unemployed"]);
    }
    if (selectedTable.qryName==="Environmental Factors") {
      return(["% Exercise opportunities",
              "Food environment index",
              "% Severe housing problems",
              "Residential segregation score"]);
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
                <Table.HeaderCell style={{borderTop: 0, fontWeight:500,textAlign:"center", width:'49%'}}>Characteristic</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0, fontWeight:500,textAlign:"center", width:'29%'}}>County Stat</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0, fontWeight:500,textAlign:"center", width:'24%'}}>State Mean</Table.HeaderCell>                                
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
          <Header as='h4' style={{fontWeight: 300, paddingTop:'1.2em', paddingLeft:'4em', paddingBottom:'-1em', textAlign:'left',color:'#da291c'}}>
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


  return (
    <GADMProvider>
      <Container style={{paddingLeft: '0em', paddingRight:'0em'}}>
        <Grid style={{paddingTop: '2em'}}>
          <Grid.Row columns={1}
          style={{ backgroundColor: `#FFFFF`}}>
            {/* style={{ backgroundImage: `url(${require("../bg2.jpg")})`}} `#d9d9d6`*/}
            <Grid.Column textAlign="center">
              <Header as='h1' style={{fontWeight: 300,color:'black'}}>
                Georgia Diabetes Data Portal
                <Header.Subheader style={{fontWeight: 300,color:'black'}}>
                  Interactive Dashboard of Diabetes-related Health Determinants
                </Header.Subheader>
              </Header>
              {/* <Header as='h4' style={{fontWeight: 300}}>
                A Quick User Guide
              </Header> */}
              <List bulleted style={{fontWeight: 300, color:'black'}} size="mini">
                <List.Item>
                  Click on a category in the menu to see the <br/>
                  characteristics under each category in the table.
                </List.Item>
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
          <Divider/>
          <Grid.Row columns={2}>
            <Grid.Column width={8} textAlign="center">
              <DataPanel />
            </Grid.Column>
            <Grid.Column width={8} textAlign="center">
              <MapPanel />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </GADMProvider>
  );
}