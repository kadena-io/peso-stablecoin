import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Menu } from 'semantic-ui-react';
import PactContext from "../contexts/PactContext";

const Guide = () => {

  const pactContext = useContext(PactContext);

  const [recp, setRecp] = useState("")
  const [amount, setAmount] = useState("")

  const [action, setAction] = useState('gen')

  const guide = () => {
    return (
      <div>
      <Message color="green" style={{marginLeft: 30, marginRight: 30, marginTop: 20, marginBottom: 40, textAlign: 'left'}}>
        <Message.Header style={{marginTop: 20, fontSize: 25, textAlign: 'center'}}>
          Digital Peso (MXP) with Kadena
        </Message.Header>
        <Message.Header style={{marginTop: 20, fontSize: 16, textAlign: 'center'}}>
          CHAINWEAVER official wallet
        </Message.Header>
        <div style={{marginBottom: 5, marginTop: 10}}>
          1. Visit <a href="https://www.kadena.io/chainweaver">this page</a> and download Chainweaver for your OS
        </div>
        <div style={{marginBottom: 5, marginTop: 10}}>
          2. Generate a keypair in the 'Keys' tab
        </div>
        <div style={{marginBottom: 5, marginTop: 10}}>
          3. Copy and paste the generated public key into the 'Create Account' tab
        </div>
        <div style={{marginBottom: 5, marginTop: 10}}>
          4. To make transfers use the 'sign with wallet' option (make sure to have Chainweaver open)
        </div>
        <div style={{marginBottom: 20, marginTop: 10}}>
          5. Make sure you have the right network selected in the wallet and to sign all of the capabilities
        </div>
        <Message.Header style={{marginTop: 20, fontSize: 16, textAlign: 'center'}}>
          PLAIN KEYPAIR (public + private keys)
        </Message.Header>
        <div style={{marginBottom: 5, marginTop: 10}}>
          1. Provide your own public key or click 'Generate and Download Keypair' in the 'Create Account' tab
        </div>
        <div style={{marginBottom: 5, marginTop: 10}}>
          2. Use the 'Sign with Private Key' option and paste your private key to sign transactions
        </div>
        <Message.Header style={{marginTop: 20, fontSize: 16, textAlign: 'center'}}>
          TESTNET
        </Message.Header>
        <div style={{marginBottom: 5, marginTop: 10}}>
          1. Follow the above instructions for usage
        </div>
        <div style={{marginBottom: 5, marginTop: 10}}>
          2. Freely use the 'Buy' section to mint tokens without charge
        </div>
        <div style={{marginBottom: 5, marginTop: 10}}>
          3. Testnet implementation also allow you to sign the transaction through the platform backend, so you do not have to worry about keys
        </div>
        <Message.Header style={{marginTop: 20, marginBottom: 20, fontSize: 12, textAlign: 'center'}}>
          NOTE: you will never have to pay gas to use Digital Peso (MXP) with Kadena because of our unique implementation of gas stations. You DO NOT need to be onboarded to cryptocurrencies to use this platform!
        </Message.Header>
      </Message>
      </div>
    )
  }

  return (
    <div>
      {guide()}
    </div>
  );

}

export default Guide;
