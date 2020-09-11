import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Segment} from 'semantic-ui-react';
import User from './User';
import Admin from './Admin';
import PactContext from "../contexts/PactContext";


const Info = () => {

  const pactContext = useContext(PactContext);

  return (
      <div>
        <Grid.Row style={{marginTop: 100}}>
        </Grid.Row>
        <Message color="green" style={{marginLeft: 100, marginRight: 100, marginTop: 230}}>

          <Segment style={{margin: 20, marginTop: 20}}>
          <a href="https://kadena.io/" target="_blank">
            <img src={require("../assets/kadena.png")} style={{height:70}}/>
          </a>
          <div>
          <a href="https://explorer.chainweb.com/testnet" target="_blank">
            TESTNET
          </a>
          <Radio
            style={{marginLeft: 20, marginRight: 20}}
            slider
            color="green"
            defaultChecked={pactContext.network !== 'testnet'}
            onChange={async (e, { value }) => await pactContext.changeNetwork()}
            />
          <a href="https://explorer.chainweb.com/mainnet" target="_blank">
            MAINNET
          </a>
          </div>
          </Segment>
          <Message.Header style={{marginTop: 20, fontSize: 20}}>
            Your connection to the decentralized internet
          </Message.Header>
          <div style={{marginTop: 20}}>
            Trade <a href="" target="_blank">Digital Peso (MXP)</a> through this platform with no gas fees!
          </div>
          <div style={{marginTop: 10, marginBottom: 20}}>
            powered by <a href="https://kadena.io/" target="_blank">Kadena</a>
          </div>

        </Message>

      </div>


  );
}

export default Info;
