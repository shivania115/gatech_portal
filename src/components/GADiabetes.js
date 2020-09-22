// React
import React, {useEffect, useState, setState} from "react";
import ErrorBoundary from "react-error-boundary";
import GAMap from "./GAMap";
import {GADMProvider, useGADM} from './GADMProvider';
import { 
  Container, 
  Grid, 
  Table,
  Header,
  Divider,
  List
} from 'semantic-ui-react'
import {gatech} from '../stitch/mongodb';
import { aggregateBy, groupBy, process } from '@progress/kendo-data-query';
import { mean } from "d3-array";


function DetTable(props){
  const subgroup = props.subgroup;
  const categories = props.categories;
  const [count,setCount] = useState([]);
  const [avg,setAvg] = useState([]);
  const {selectedVariable, 
    selectedCounty, 
    actions: {handlePageStateChange}} = useGADM();

  const GetValue = async()=> {
    var countArray = [];
    var avgArray = [];
    const query = {"subgroup":subgroup, "county":selectedCounty.NAME+" County"};
    const query2 = {"subgroup":subgroup};
    const prom = await gatech.find(query,{projection:{"value":1}}).toArray();
    const prom2 = await gatech.find(query2,{projection:{"subsubgroup":1,"value":1}}).toArray();
    var obj;
    var obj2;
    for (obj in prom){
      //var val_temp = Math.round(prom[obj].value *100)/100;
      var val_temp = parseFloat(prom[obj].value).toFixed(2);
      countArray.push(val_temp);
    }
    for (obj2 in prom2){
      avgArray.push(prom2[obj2]);
    }
    const byGroup = avgArray.reduce((acc, index) => {
      if (!acc[index.subsubgroup]) {
        acc[index.subsubgroup] = [];
      }
      acc[index.subsubgroup].push(index);
      return acc;
    }, {});
    
    setCount(countArray);
    //setAvg(byGroup);
    var i1;
    var i2;
    var resultArray = [];
    //console.log(avg);   // set of subsubgroup
    for (i1 in byGroup){
      //console.log(avg[i1]);   // each subsubgroup; length 159
      var sum = 0;
      for (i2 in byGroup[i1]){
        sum += byGroup[i1][i2].value;
      }
      resultArray.push((sum/159).toFixed(2));
    }
    setAvg(resultArray);
  };

  

  //console.log(resultArray);
  

  useEffect(()=>{
    GetValue();
  }, [selectedVariable, selectedCounty, subgroup]);


  const zipped = categories.map((category,index) =>{
    return(
    <Table.Row key={category.toString()}>
      <Table.Cell>{category}</Table.Cell>
      <Table.Cell>{count[index]}</Table.Cell>    
    <Table.Cell>{avg[index]}</Table.Cell>            
    </Table.Row>);
  });
  return (
    <Table.Body>{zipped}</Table.Body>
  );
}


function DataPanel() {

  const {selectedVariable, 
    selectedCounty, 
    actions: {handlePageStateChange}} = useGADM();

  const [count,setCount] = useState([]);

  const DemographicComposition = ["65 years or older",
                                  "African American",
                                  "Asian",
                                  "Foreign born",
                                  "Hispanic",
                                  "Median age",
                                  "Total Population",
                                  "Women"];
  const CardioDiseaseMorbidity = ["CHD Prevalence",
                                  "Diabetes Prevalence",
                                  "Hypertension Prevalence",
                                  "Newly diagnosed diabetes",
                                  "Obesity Prevalence"];
  const ClinicalEvents = [];
  const LifestyleRelatedRiskFactors = ["Alcohol Consumption",
                                        "Physical Inactivity",
                                        "Sleep",
                                        "Smoking"];
  const HealthCare = ["% Diabetes in Medicaid Population",
                      "Cardiologists",
                      "Endocrinologists",
                      "Primary Care Doctors",
                      "Uninsured"];
  const SocioeconomicFactors = ["Graduates High School in 4 Years",
                                "In Poverty",
                                "Income Inequality",
                                "Median Income (2015)",
                                "Unemployed"];
  


  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as='h3' style={{fontWeight: 300}}>
            Statistics of {selectedCounty.NAME}
            <Header.Subheader style={{fontWeight: 300}}>
              The tables below show diabetes-related health determinants of the {selectedCounty.NAME} county.
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column textAlign="left">
          <Header as='h4' style={{fontWeight: 300}}>
            1. Demographic Composition
          </Header>
          <Table selectable basic='very' size='small'  >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{borderTop: 0}}>Variable</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>County Stat</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>State Stat</Table.HeaderCell>                                
              </Table.Row>
            </Table.Header>
            <DetTable subgroup={"Demographic Composition"} categories={DemographicComposition} />
          </Table>
        </Grid.Column>
        <Grid.Column textAlign="left">
          <Header as='h4' style={{fontWeight: 300}}>
            2. Cardiometabolic Disease Morbidity
          </Header>
          <Table selectable basic='very' size='small'  >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{borderTop: 0}}>Variable</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>County Stat</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>State Stat</Table.HeaderCell>                                
              </Table.Row>
            </Table.Header>
              <DetTable subgroup="Cardiometabolic disease morbidity" categories={CardioDiseaseMorbidity} />
          </Table>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column textAlign="left">
          <Header as='h4' style={{fontWeight: 300}}>
            3. Clinical Events
          </Header>
          <Table selectable basic='very' size='small'  >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{borderTop: 0}}>Variable</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>County Stat</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>State Stat</Table.HeaderCell>                                
              </Table.Row>
            </Table.Header>
              <DetTable subgroup="Clinical Events" categories={ClinicalEvents} />
          </Table>
        </Grid.Column>
        <Grid.Column textAlign="left">
          <Header as='h4' style={{fontWeight: 300}}>
            4. Lifestyle Related Risk Factors
          </Header>
          <Table selectable basic='very' size='small'  >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{borderTop: 0}}>Variable</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>County Stat</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>State Stat</Table.HeaderCell>                                
              </Table.Row>
            </Table.Header>
            <DetTable subgroup="Lifestyle Related Risk Factors" categories={LifestyleRelatedRiskFactors} />
          </Table>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column textAlign="left">
          <Header as='h4' style={{fontWeight: 300}}>
            5. Health Care
          </Header>
          <Table selectable basic='very' size='small'  >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{borderTop: 0}}>Variable</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>County Stat</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>State Stat</Table.HeaderCell>                                
              </Table.Row>
            </Table.Header>
            <DetTable subgroup="Healthcare" categories={HealthCare} />
          </Table>
        </Grid.Column>
        <Grid.Column textAlign="left">
          <Header as='h4' style={{fontWeight: 300}}>
            6. Socioeconomic Factors
          </Header>
          <Table selectable basic='very' size='small'  >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{borderTop: 0}}>Variable</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>County Stat</Table.HeaderCell>
                <Table.HeaderCell style={{borderTop: 0}}>State Stat</Table.HeaderCell>                                
              </Table.Row>
            </Table.Header>
            <DetTable subgroup="Socioeconomic Factors" categories={SocioeconomicFactors} />
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
          <Header as='h3' style={{fontWeight: 300}}>
            {selectedVariable.printName}
            <Header.Subheader style={{fontWeight: 300}}>
              The color on the map shows the {selectedVariable.printName} of the Georgia Counties.
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
  // const [db, setDb] = useState();
  // const [dbp, setDbp] = useState();
  
  // // const get = async()=> {
  // //   const query = {"subsubgroup":"65 years or older", "county":"DeKalb County"};
  // //   const prom = await gatech.find(query,{projection:{"value":1}}).toArray();
  // //   console.log("hhhhh",prom);
  // //   return prom;
  // // }
  // //get();
  // useEffect(()=>{
  //   const get = async()=> {
  //   //get();
  //   //setDb(get);
  //     const query = {"subsubgroup":"65 years or older", "county":"DeKalb County"};
  //     const prom = await gatech.find(query,{projection:{"value":1}}).toArray();
  //     setDbp(prom);
  //   };
  //   //get();
  // },[]);
  // console.log("ni hao:" , dbp);



  return (
    <GADMProvider>
      <Container>
        <Grid style={{paddingTop: '2em'}}>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Header as='h1' style={{fontWeight: 300}}>
                Georgia Diabetes Data Poral
                <Header.Subheader style={{fontWeight: 300}}>
                  Interactive Dashboard of Diabetes-related Health Determinants
                </Header.Subheader>
              </Header>
              <Header as='h4' style={{fontWeight: 300}}>
                A Quick User Guide
              </Header>
              <List bulleted style={{fontWeight: 300}} size="mini">
                <List.Item>
                  Click on a county on the map located <i>(on the left)</i> <br/>
                  to see its full statistics on the table <i>(on the right)</i>.
                </List.Item>
                <List.Item>
                  Click on a variable on the table located <i>(on the right)</i> <br/>
                  to see the county-level distribution on the map <i>(on the left)</i>.
                </List.Item>                
              </List>
            </Grid.Column>
          </Grid.Row>
          <Divider/>
          <Grid.Row columns={2}>
            <Grid.Column width={8} textAlign="center">
              <MapPanel />
            </Grid.Column>
            <Grid.Column width={8} textAlign="center">
              <DataPanel />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </GADMProvider>
  );
}
