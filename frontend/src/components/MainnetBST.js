import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Menu } from 'semantic-ui-react';
import TXStatus from './TXStatus';
import PactContext from "../contexts/PactContext";

const MainnetBST = () => {

  const pactContext = useContext(PactContext);

  const [amount, setAmount] = useState("")


  const mainnet = () => {
    return (
      <div>
        <Form>
          <Message positive style={{marginLeft: 100, marginRight: 100, marginTop: 30, marginBottom: 30, textAlign: 'center'}}>
            <Message.Header style={{marginTop: 20}}>
              Please <a href="mailto:hello@Digital Peso.co?&cc=info@kadena.io&subject=Digital Peso%20with%20Kadena">contact us</a> directly to buy or sell MXP on Kadena
            </Message.Header>
            <div style={{marginBottom: 10, marginTop: 10}}>
              We will happily assist you with wire transfers and account setup
            </div>
          </Message>
        </Form>
      </div>
    )
  }

  return (
    <div>
      {mainnet()}
    </div>
  );

}

export default MainnetBST;
