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
  List
} from 'semantic-ui-react'
import {gatech} from '../stitch/mongodb';
import { Menu } from 'semantic-ui-react'
import _ from 'lodash';


function DetTable(props){
  const categories = props.categories;
  const [count,setCount] = useState([]);
  const [stateAvg,setStateAvg] = useState([]);
  const {selectedCounty, 
    selectedTable,
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

  const zipped = count.map((obj,index) =>{
    var val;   //deal with na
    if (obj.value!== "N/A"){
      val = obj.value.toFixed(1);
    } else {
      val = obj.value;
    }  
    return(
    <Table.Row key={index} onClick={()=>{
           handlePageStateChange({selectedVariable: {varName:obj.subsubgroup,
                                                    printName:categories[index]}
                                                  });
           }}>
      <Table.Cell>{obj.subsubgroup}</Table.Cell>
      <Table.Cell>{val}</Table.Cell>    
    <Table.Cell>{stateAvg[index]}</Table.Cell>            
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
    <Menu pointing vertical size='small'>
      <Menu.Item name='Demographic Composition'
                active = {selectedTable.tableName === 'Demographic Composition'}  
                onClick={()=>{
                  handlePageStateChange({selectedTable: {tableName:'Demographic Composition',
                                                        qryName:'Demographic Composition'}});
            }}/>
      <Menu.Item name='Cardiometabolic Disease Morbidity'
                active = {selectedTable.tableName === 'Cardiometabolic Disease Morbidity'}  
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Cardiometabolic Disease Morbidity',
                                                            qryName:'Cardiometabolic disease morbidity'}});
            }}/>
      <Menu.Item name='Clinical Events' 
                active = {selectedTable.tableName === 'Clinical Events'}  
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Clinical Events',
                                                            qryName:'Clinical events'}});
            }}/>
      <Menu.Item name='Lifestyle Related Risk Factors' 
                active = {selectedTable.tableName === 'Lifestyle Related Risk Factors'}  
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Lifestyle Related Risk Factors',
                                                            qryName:'Lifestyle Related Risk Factors'}});
            }}/>
      <Menu.Item name='Health Care' 
                active = {selectedTable.tableName === 'Healthcare'}  
                onClick={()=>{
                      handlePageStateChange({selectedTable: {tableName:'Healthcare',
                                                            qryName:'Healthcare'}});
            }}/>
      <Menu.Item name='Socioeconomic Factors' 
                active = { selectedTable.tableName === 'Socioeconomic Factors'}  
                onClick={()=>{
                    handlePageStateChange({selectedTable: {tableName:'Socioeconomic Factors',
                                                          qryName:'Socioeconomic Factors'}});
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
      return(["% of 65 years or older",
                                    "% of African American",
                                    "% of Asian",
                                    "% of Foreign born",
                                    "% of Hispanic",
                                    "Median age",
                                    "Total Population (thousands)",
                                    "% of Women"]);
    }
    if (selectedTable.qryName==="Cardiometabolic disease morbidity") {
      return(["CHD Prevalence",
              "Diabetes Prevalence",
              "Hypertension Prevalence",
              "Newly diagnosed diabetes",
              "Obesity Prevalence"]);
    }
    if (selectedTable.qryName==="Clinical events") {
      return(["CVD Deaths",
              "CVD Hospitalizations",
              "Diabetes Deaths",
              "Diabetes Hospitalizations",
              "Kidney Hospitalizations"]);
    }
    if (selectedTable.qryName==="Lifestyle Related Risk Factors"){
      return(["Alcohol Consumption",
              "Physical Inactivity",
              "Sleep",
              "Smoking"]);
    }
    if (selectedTable.qryName==="Healthcare"){
      return(["% Diabetes in Medicaid Population",
              "Cardiologists",
              "Endocrinologists",
              "Primary Care Doctors",
              "% of Uninsured"]);
    }
    if (selectedTable.qryName==="Socioeconomic Factors") {
      return(["Graduates High School in 4 Years",
              "In Poverty",
              "Income Inequality",
              "Median Income (2015)",
              "Unemployed"]);
    }
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as='h3' style={{fontWeight: 300}}>
            Statistics of {selectedCounty.NAME}
            <Header.Subheader style={{fontWeight: 300}}>
              The table below show diabetes-related health determinants of {selectedCounty.NAME} county.
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column textAlign="left" style={{paddingTop: '4em', paddingLeft:'4em'}}>
          <MenuButton/>
        </Grid.Column>
        <Grid.Column textAlign="left" style={{paddingTop: '4em'}}>
          <Header as='h4' style={{fontWeight: 300}}>
            {selectedTable.tableName}
          </Header>
          <Table selectable basic='very' size='small'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{borderTop: 0}}>Variable</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>County Stat</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>State Stat</Table.HeaderCell>                                
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
          <Header as='h3' style={{fontWeight: 300, paddingLeft:'2em', height:'3em'}}>
            {selectedVariable.printName}
            <Header.Subheader style={{fontWeight: 300}}>
              The color shows the distribution of {selectedVariable.printName} across the Georgia counties.
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
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
      <Container>
        <Grid style={{paddingTop: '2em'}}>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Header as='h1' style={{fontWeight: 300}}>
                Georgia Diabetes Data Portal
                <Header.Subheader style={{fontWeight: 300}}>
                  Interactive Dashboard of Diabetes-related Health Determinants
                </Header.Subheader>
              </Header>
              <Header as='h4' style={{fontWeight: 300}}>
                A Quick User Guide
              </Header>
              <List bulleted style={{fontWeight: 300}} size="mini">
                <List.Item>
                  Click on a category in the menu to see the variables <br/>
                  under each category in the table.
                </List.Item>
                <List.Item>
                  Click on a variable on the table located <i>on the left</i> <br/>
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