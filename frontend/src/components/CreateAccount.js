import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Menu } from 'semantic-ui-react';
import PactContext from "../contexts/PactContext";

const CreateAccount = () => {

  const pactContext = useContext(PactContext);

  const [recp, setRecp] = useState("")
  const [amount, setAmount] = useState("")

  const [action, setAction] = useState('gen')

  const create = () => {
    return (
      <div>
        <Form>

            <Message color="green" style={{marginLeft: 100, marginRight: 100, marginTop: 20, textAlign: 'left'}}>
              <Message.Header style={{marginTop: 20, fontSize: 16, textAlign: 'center'}}>
                Create Digital Peso (MXP) Account
              </Message.Header>
              <div style={{marginBottom: 5, marginTop: 10}}>
                1. Select Generate if you do not already own a Kadena keypair or would like to use a new one
              </div>
              <div style={{marginBottom: 20, marginTop: 10}}>
                2. Select Provide if you would like to use an exisitng Kadena keypair already under your custody
              </div>
            </Message>
            <div style={{marginLeft: 50, marginRight: 50, marginTop: 40, marginBottom: 20}}>
              <Menu color="green" widths={2} style={{marginTop: 20, marginLeft: 30, marginRight: 30}}>
                  <Menu.Item
                    name='gen'
                    active={action === 'gen'}
                    onClick={() => setAction('gen')}
                  >
                    <Icon name='download' />
                    Generate Keypair
                  </Menu.Item>

                  <Menu.Item
                    name='prov'
                    active={action === 'prov'}
                    onClick={() => setAction('prov')}
                  >
                    <Icon name='upload' />
                    Provide Public Key
                  </Menu.Item>

                </Menu>
              </div>

            {(action === 'gen'
            ?
              <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "0px", marginBottom: 30, textAlign: "center"}} >
                  <Button
                      style={{
                        backgroundColor: "#006341",
                        color: "white",
                        marginBottom: 10,
                        marginTop: 20,
                        width: 340,
                        }}
                      onClick={() => pactContext.genKp()}
                      disabled={pactContext.accountName !== ""}
                    >
                      Generate and Download Keypair
                  </Button>
              </Form.Field>
            :
              <div></div>
            )}

          <Form.Field  style={{marginLeft: 50, marginRight: 50, marginTop: "20px", marginBottom: 20, textAlign: "left"}} >
            <label style={{color: "#006341" }}>Your Public Key
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
                value={pactContext.accountName}
                disabled={pactContext.loading}
                onChange={(e) => pactContext.setAccountName(e.target.value)}
                action={
                   <Button
                   color='grey'
                   onClick={() => pactContext.setAccountName("")}
                   >
                    <Icon name="x"/>
                    clear
                   </Button>
                 }
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
                  onClick={() => window.location.reload()}
                  disabled={!pactContext.accountName}
                  loading={pactContext.loading}
                >
                Confirm Account
              </Button>
          </Form.Field>
        </Form>

      </div>
    )
  }

  return (
    <div>
      {create()}
    </div>
  );

}

export default CreateAccount;
