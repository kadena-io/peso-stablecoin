import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Menu } from 'semantic-ui-react';
import TXStatus from './TXStatus';
import PactContext from "../contexts/PactContext";
import MainnetBST from './MainnetBST'


const Sell = () => {

  const pactContext = useContext(PactContext);

  const [amount, setAmount] = useState("")


  const sell = () => {
    return (
      <div>
        <Form>
          <Message negative style={{marginLeft: 100, marginRight: 100, marginTop: 30, textAlign: 'center'}}>
            <Message.Header style={{marginTop: 20}}>
              Sell Digital Peso (MXP) for USD
            </Message.Header>
            <div style={{marginBottom: 10, marginTop: 10}}>
              You will be credited the USD equivalent
            </div>
          </Message>
          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "20px", marginBottom: 20, textAlign: "left"}} >
            <label style={{color: "#006341" }}>(MXP) Amount to Redeem
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>What is Amount to Redeem? </Popup.Header>
                <Popup.Content>Turn your tokenized silver back into a physical asset</Popup.Content>
              </Popup>
            </label>
              <Form.Input
                icon='dollar sign'
                iconPosition='left'
                placeholder='Amount (MXP)'
                value={amount}
                disabled={pactContext.loading}
                onChange={(e) => setAmount(e.target.value)}
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
                  onClick={() => pactContext.burn(amount)}
                  disabled={!pactContext.accountName || amount === "" || isNaN(amount)}
                  loading={pactContext.loading}
                >
                Sell
              </Button>
            )}
          </Form.Field>
        </Form>
      </div>
    )
  }

  return (
    <div>
      {(pactContext.network === 'testnet' ? sell() : <MainnetBST />)}
    </div>
  );

}

export default Sell;
