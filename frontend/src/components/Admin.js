import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Menu } from 'semantic-ui-react';
import PactContext from "../contexts/PactContext";

const Admin = () => {

  const pactContext = useContext(PactContext);

  const pactFecth = async () => {
    await pactContext.getCoinBalance();
    await pactContext.getCWBalance();
    await pactContext.getKuroBalance();
  }

  const [action, setAction] = useState('mint')
  const [keyset, setKeyset] = useState('')

  const send = () => {
    return (
      <div>
        <Form>
          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "20px", marginBottom: 20, textAlign: "left"}} >
            <label style={{color: "#006341" }}>Recepient Account Name
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
              <Popup.Header>What is Account Name? </Popup.Header>
              <Popup.Content>Account Name is the unique sequence of characters that you use to identify a Digital Peso account. NOTE: if you send to the wrong account it is IRREVERSIBLE</Popup.Content>
              </Popup>
            </label>
              <Form.Input
                icon='user'
                iconPosition='left'
                placeholder='Recepient'
                value={pactContext.accountName}
                onChange={(e) => pactContext.setAccountName(e.target.value)}
              />
          </Form.Field>
          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "0px", marginBottom: 20, textAlign: "left"}} >
            <label style={{color: "#006341" }}>Amount to Send
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
                placeholder='Amount'
                // value={amountBuy}
                // onChange={(e) => setAmountBuy(e.target.value)}
              />
          </Form.Field>
          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "0px", marginBottom: 30, textAlign: "center"}} >
          <Button
              style={{
                backgroundColor: "#006341",
                color: "white",
                marginBottom: 10,
                marginTop: 20,
                width: 340,
                }}
              // onClick={() => pactFecth()}
              // disabled={!pactContext.accountName}
            >
            Send
          </Button>
          </Form.Field>
        </Form>

      </div>
    )
  }

  const redeem = () => {
    return (
      <div>
        <Form>
          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "20px", marginBottom: 20, textAlign: "left"}} >
            <label style={{color: "#006341" }}>Amount to Redeem
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
                placeholder='Amount'
                // value={amountBuy}
                // onChange={(e) => setAmountBuy(e.target.value)}
              />
          </Form.Field>
          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "0px", marginBottom: 30, textAlign: "center"}} >
          <Button
              style={{
                backgroundColor: "#006341",
                color: "white",
                marginBottom: 10,
                marginTop: 20,
                width: 340,
                }}
              // onClick={() => pactFecth()}
              // disabled={!pactContext.accountName}
            >
            Redeem
          </Button>
          </Form.Field>
        </Form>
      </div>
    )
  }

  return (
    <div style={{marginBottom: 0}}>
    <Form>
    <div style={{marginLeft: 50, marginRight: 50, marginTop: 40}}>
      <Menu color="green" widths={2} >
          <Menu.Item
            name='send'
            active={action === 'mint'}
            onClick={() => setAction('mint')}
          >
            Mint
          </Menu.Item>

          <Menu.Item
            name='redeem'
            active={action === 'burn'}
            onClick={() => setAction('burn')}
          >
            Burn
          </Menu.Item>

        </Menu>
      </div>
      <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "20px", marginBottom: 20, textAlign: "left"}} >
        <label style={{color: "#006341" }}>User Account Name
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
          <Popup.Header>What is Account Name? </Popup.Header>
          <Popup.Content>Account Name is the unique sequence of characters that you use to identify a Digital Peso account.</Popup.Content>
          </Popup>
        </label>
          <Form.Input
            icon='user'
            iconPosition='left'
            placeholder='Recepient'
            value={pactContext.accountName}
            onChange={(e) => pactContext.setAccountName(e.target.value)}
          />
      </Form.Field>
      {(action === 'mint'
      ?
      <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "20px", marginBottom: 20, textAlign: "left"}} >
        <label style={{color: "#006341" }}>User Public Key
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
          <Popup.Header>What is keyset? </Popup.Header>
          <Popup.Content>Account Name is the unique sequence of characters that you use to identify a Digital Peso account.</Popup.Content>
          </Popup>
        </label>
          <Form.Input
            icon='user'
            iconPosition='left'
            placeholder='Public Key'
            value={keyset}
            onChange={(e) => setKeyset(e.target.value)}
          />
      </Form.Field>
      :
      <div></div>
      )}
      <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "0px", marginBottom: 20, textAlign: "left"}} >
        <label style={{color: "#006341" }}>Amount to {(action === 'mint' ? 'Mint' : 'Burn')}
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
            <Popup.Header>What is Amount? </Popup.Header>
            <Popup.Content>Quantity of Digital Peso you would like to mint / burn for specified user</Popup.Content>
          </Popup>
        </label>
          <Form.Input
            icon='dollar sign'
            iconPosition='left'
            placeholder='Amount'
            // value={amountBuy}
            // onChange={(e) => setAmountBuy(e.target.value)}
          />
      </Form.Field>
      <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "0px", marginBottom: 30, textAlign: "center"}} >
      <Button
          style={{
            backgroundColor: "#006341",
            color: "white",
            marginBottom: 10,
            marginTop: 20,
            width: 340,
            }}
          // onClick={() => pactFecth()}
          // disabled={!pactContext.accountName}
        >
        {(action === 'mint' ? 'Mint' : 'Burn')}
      </Button>
      </Form.Field>
      </Form>
    </div>
  );

}

export default Admin;
