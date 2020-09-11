import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Menu } from 'semantic-ui-react';
import TXStatus from './TXStatus';
import PactContext from "../contexts/PactContext";
import MainnetBST from './MainnetBST'

const Buy = () => {

  const pactContext = useContext(PactContext);

  const [amount, setAmount] = useState("")


  const buy = () => {
    return (
      <div>
        <Form>
          <Message positive style={{marginLeft: 100, marginRight: 100, marginTop: 30, textAlign: 'center'}}>
            <Message.Header style={{marginTop: 20}}>
              Use your credit card to buy Digital Peso (MXP)
            </Message.Header>
            <div style={{marginBottom: 10, marginTop: 10}}>
              You will be charged the USD equivalent
            </div>
          </Message>
          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "20px", marginBottom: 20, textAlign: "left"}} >
            <label style={{color: "#006341" }}>Credit Card Details
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>What is Amount to Buy? </Popup.Header>
                <Popup.Content>Buy STX with fiat currency</Popup.Content>
              </Popup>
            </label>
              <Form.Input
                icon='hashtag'
                iconPosition='left'
                value='1234 5678 8765 4321'
                placeholder='Credit Card Number'
                disabled
              />
              <Form.Input
                icon='calendar alternate'
                iconPosition='left'
                value='01/23'
                placeholder='Expiration Date (MM/YY)'
                disabled
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                value='678'
                placeholder='Security Code'
                disabled
              />
              NOTE: Credit card section for demo purposes only
          </Form.Field>
          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "20px", marginBottom: 20, textAlign: "left"}} >
            <label style={{color: "#006341" }}>(MXP) Amount to Buy
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>What is Amount to Buy? </Popup.Header>
                <Popup.Content>Buy STX with fiat currency</Popup.Content>
              </Popup>
            </label>
              <Form.Input
                icon='dollar sign'
                iconPosition='left'
                placeholder='Amount (MXP)'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={pactContext.loading}
              />
            {(parseFloat(amount)
              ?
                `~$${(parseFloat(amount) * 0.05).toFixed(2)}usd`
              :
                (amount === ""
                  ?
                    ""
                  :
                    "please enter a digit"
                )
            )}
          </Form.Field>

          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "0px", marginBottom: 30, textAlign: "center"}} >
            {(pactContext.loading
            ?
              <TXStatus />
            :
              <Button
                  style={{
                    backgroundColor: "#006341",
                    color: "white",
                    marginBottom: 10,
                    marginTop: 20,
                    width: 340,
                    }}
                  onClick={() => pactContext.mint(amount)}
                  disabled={!pactContext.accountName || amount === "" || isNaN(amount)}
                  loading={pactContext.loading}
                >
                Buy
              </Button>
            )}
          </Form.Field>

        </Form>
      </div>
    )
  }

  return (
    <div>
      {(pactContext.network === 'testnet' ? buy() : <MainnetBST />)}
    </div>
  );

}

export default Buy;
