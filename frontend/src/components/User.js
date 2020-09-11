import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Menu, Segment } from 'semantic-ui-react';
import Send from './Send';
import Sell from './Sell';
import Buy from './Buy'
import PactContext from "../contexts/PactContext";

const User = () => {

  const pactContext = useContext(PactContext);

  const pactFecth = async () => {
    await pactContext.getCoinBalance();
  }

  const [action, setAction] = useState('send')

  return (
    <div>
    <Form>
      <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "20px", marginBottom: 30, textAlign: "left"}} >
        <label style={{color: "#006341" }}>Enter Your Public Key
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
          <Popup.Header>What is a Public Key? </Popup.Header>
          <Popup.Content>Account Name is the unique sequence of characters that you use to identify yourself in chainweb. You'll be asked to sign with associated key/keys when you make transactions. Account names need to be unique and are assosciated to keypairs that can sign its transactions. The simplest way would be to use your public key as your account name</Popup.Content>
          </Popup>
        </label>
          <Form.Input
            icon='key'
            iconPosition='left'
            placeholder='Account Name'
            value={pactContext.accountName}
            onChange={(e) => pactContext.setAccountName(e.target.value)}
            action={
               <Button
               color='grey'
               onClick={() => pactContext.getCoinBalance()}
               >
                <Icon name="redo"/>
                refresh
               </Button>
             }
          />
      </Form.Field>
      <Message color={(pactContext.accountLoad ? "green" : (pactContext.coinBalance === 'n/a' ? "red" : "green"))} style={{marginLeft: 100, marginRight: 100, textAlign:'center'}}>
        <Segment style={{marginLeft: 10, marginRight: 10}}>
          <Message.Header style={{marginBottom: 10}}>
            {pactContext.network.charAt(0).toUpperCase() + pactContext.network.slice(1)} Account Balance:
          </Message.Header>
          {(pactContext.accountLoad
            ?
              <Loader active inline/>
            :
              <Message.Header>
                {(pactContext.coinBalance === 'n/a'
                  ?
                    `Does not exist`
                  :
                    `${pactContext.coinBalance} MXP`

                )}
              </Message.Header>
          )}
        </Segment>
      </Message>
    </Form>

    <div style={{marginLeft: 50, marginRight: 50, marginTop: 40}}>
    <Menu color="green" widths={3} >

          <Menu.Item
            name='send'
            active={action === 'send'}
            onClick={() => setAction('send')}
          >
            <Icon name='exchange' />
            Send
          </Menu.Item>

          <Menu.Item
            name='buy'
            active={action === 'buy'}
            onClick={() => setAction('buy')}
          >
            <Icon name='money bill alternate' />
            Buy
          </Menu.Item>

          <Menu.Item
            name='redeem'
            active={action === 'redeem'}
            onClick={() => setAction('redeem')}
            disabled={pactContext.coinBalance === 'n/a'}
          >
          <Icon name='cart arrow down' />
            Sell
          </Menu.Item>

        </Menu>
      </div>
      {(action === 'send'
      ?
        <Send />
      :
        (action === 'buy'
        ?
        <Buy />
        :
        <Sell />
        )
      )}
    </div>
  );

}

export default User;
