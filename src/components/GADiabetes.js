// React
import React, {useEffect, useState, } from "react";
import ErrorBoundary from "react-error-boundary";
import GAMap from "./GAMap";
import {GADMProvider, useGADM} from './GADMProvider';
import { 
  Container, 
  Grid, 
  Table,
  Header,
  Divider,
  List,
} from 'semantic-ui-react'

function DataPanel() {

  const {selectedVariable, 
    selectedCounty, 
    actions: {handlePageStateChange}} = useGADM();

  useEffect(()=>{
    console.log('DataPanel ' + JSON.stringify(selectedCounty));
  }, [selectedVariable, selectedCounty]);

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
            <Table.Body>
              <Table.Row> 
                <Table.Cell>Example</Table.Cell>
                <Table.Cell>use _.map()</Table.Cell>
                <Table.Cell>..</Table.Cell>                            
              </Table.Row>
            </Table.Body>
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
            <Table.Body>
              <Table.Row> 
                <Table.Cell>Example</Table.Cell>
                <Table.Cell>use _.map()</Table.Cell>
                <Table.Cell>..</Table.Cell>                            
              </Table.Row>
            </Table.Body>
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
            <Table.Body>
              <Table.Row> 
                <Table.Cell>Example</Table.Cell>
                <Table.Cell>use _.map()</Table.Cell>
                <Table.Cell>..</Table.Cell>                            
              </Table.Row>
            </Table.Body>
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
            <Table.Body>
              <Table.Row> 
                <Table.Cell>Example</Table.Cell>
                <Table.Cell>use _.map()</Table.Cell>
                <Table.Cell>..</Table.Cell>                            
              </Table.Row>
            </Table.Body>
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
            <Table.Body>
              <Table.Row> 
                <Table.Cell>Example</Table.Cell>
                <Table.Cell>use _.map()</Table.Cell>
                <Table.Cell>..</Table.Cell>                            
              </Table.Row>
            </Table.Body>
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
            <Table.Body>
              <Table.Row> 
                <Table.Cell>Example</Table.Cell>
                <Table.Cell>use _.map()</Table.Cell>
                <Table.Cell>..</Table.Cell>                            
              </Table.Row>
            </Table.Body>
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
