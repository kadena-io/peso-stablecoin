import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Menu } from 'semantic-ui-react';
import PactContext from "../contexts/PactContext";

const TXStatus = () => {

  const pactContext = useContext(PactContext);


  const status = () => {
    return (
      <div>
        <Form>
          <Message style={{marginLeft: 30, marginRight: 30, marginTop: 20, textAlign: 'center'}}>
            <div style={{marginTop: 5, marginBottom: 0}}>
              Request Key:
            </div>
            <div style={{marginTop: 5, marginBottom: 10}}>
              {pactContext.reqKey}
            </div>
            {(pactContext.msg === ""
            ?
              <div>
                <div style={{marginBottom: 10, marginTop: 10}}>
                  Please wait while your transaction is being mined...
                </div>
                <Loader active inline/>
              </div>
            :
              <div>
                <div style={{marginBottom: 10, marginTop: 10}}>
                  {pactContext.msg}<a href={pactContext.be} target="_blank">transaction</a>
                </div>
                <Button
                    style={{
                      backgroundColor: "#006341",
                      color: "white",
                      marginBottom: 10,
                      marginTop: 10,
                      width: 240,
                      }}
                    onClick={() => window.location.reload()}
                  >
                  Done
                </Button>
              </div>
            )}

          </Message>
        </Form>
      </div>
    )
  }

  return (
    <div>
      {status()}
    </div>
  );

}

export default TXStatus;
