import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Menu } from 'semantic-ui-react';
import TXStatus from './TXStatus';
import PactContext from "../contexts/PactContext";

const Send = () => {

  const pactContext = useContext(PactContext);

  const [recp, setRecp] = useState("")
  const [amount, setAmount] = useState("")
  const [action, setAction] = useState('wallet')
  const [pk, setPk] = useState('')

  const send = () => {
    return (
      <div>
        <Form>
          <Message color="yellow" style={{marginLeft: 100, marginRight: 100, marginTop: 30, textAlign: 'center'}}>
            <Message.Header style={{marginTop: 20, fontSize: 16}}>
              Send Digital Peso (MXP) to a different account
            </Message.Header>
            <div style={{marginBottom: 5, marginTop: 10}}>
              Be sure of the receiver as blockchain transactions cannot be reversed
            </div>
          </Message>
          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "20px", marginBottom: 20, textAlign: "left"}} >
            <label style={{color: "#006341" }}>Recepient Public Key
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
              <Popup.Header>What is Public Key? </Popup.Header>
              <Popup.Content>Public Key is the unique sequence of characters that you use to identify a Digital Peso account. NOTE: if you send to the wrong existing account it can be IRREVERSIBLE</Popup.Content>
              </Popup>
            </label>
              <Form.Input
                icon='user'
                iconPosition='left'
                placeholder='Recepient'
                value={recp}
                disabled={pactContext.loading}
                onChange={(e) => setRecp(e.target.value)}
              />
          </Form.Field>
          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "0px", marginBottom: 20, textAlign: "left"}} >
            <label style={{color: "#006341" }}>(MXP) Amount to Send
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>What is Amount to Send? </Popup.Header>
                <Popup.Content>Quantity of Digital Peso you would like to send to specified recepient</Popup.Content>
              </Popup>
            </label>
              <Form.Input
                icon='dollar sign'
                iconPosition='left'
                placeholder='Amount (MXP)'
                value={amount}
                disabled={pactContext.loading}
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
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
          <div style={{marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 10}}>
          <Menu color="green" widths={(pactContext.network === 'testnet' ? 3 : 2)} >

                {(pactContext.network === 'testnet'
                ?

                    <Menu.Item
                      name='buy'
                      active={action === 'plat'}
                      onClick={() => setAction('plat')}
                    >
                      <Icon name='cloud' />
                      Sign Through Platform
                    </Menu.Item>

                :
                  <div></div>
                )}

                <Menu.Item
                  name='wallet'
                  active={action === 'wallet'}
                  onClick={() => setAction('wallet')}

                >
                  <Icon name='lock' />
                  Sign with Wallet
                </Menu.Item>

                <Menu.Item
                  name='sign'
                  active={action === 'sign'}
                  onClick={() => setAction('sign')}

                >
                  <Icon name='key' />
                  Sign with Private Key
                </Menu.Item>

              </Menu>
            </div>
            {(action === 'sign'
            ?
              <div>
                <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "0px", marginBottom: 20, textAlign: "left"}} >
                  <label style={{color: "#006341" }}>Private Key
                    <Popup
                      trigger={
                        <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                      }
                      position='top center'
                    >
                      <Popup.Header>What is a Private Key </Popup.Header>
                      <Popup.Content>Enter the Private key correspondant to your public key account</Popup.Content>
                    </Popup>
                  </label>
                    <Form.Input
                      icon='key'
                      iconPosition='left'
                      placeholder='Private Key'
                      value={pk}
                      disabled={pactContext.loading}
                      onChange={(e) => setPk(e.target.value)}
                    />
                </Form.Field>
              </div>
            :
              <div></div>
            )}
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
                  onClick={() => {
                    (action === 'plat'
                      ? pactContext.transfer(recp, amount)
                      : (action === 'wallet'
                        ? pactContext.transferWallet(recp, amount)
                        : pactContext.transferDirect(recp, amount, pk)))
                  }}
                  disabled={!pactContext.accountName || amount === "" || isNaN(amount) || recp.length !== 64 || pactContext.coinBalance === 'n/a'}
                  loading={pactContext.loading}
                >
                {(pactContext.coinBalance === 'n/a' ? "Must have balance" : "Send")}
              </Button>
            )}
          </Form.Field>
        </Form>

      </div>
    )
  }

  return (
    <div>
      {send()}
    </div>
  );

}

export default Send;

// <Message style={{marginLeft: 30, marginRight: 30, marginTop: 20, textAlign: 'center'}}>
//   <div style={{marginTop: 5, marginBottom: 0}}>
//     Hash to Sign
//   </div>
//   <div style={{marginTop: 5, marginBottom: 10}}>
//     {pactContext.hash}
//   </div>
//
// </Message>
