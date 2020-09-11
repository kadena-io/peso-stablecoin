/**
Module: (index) react-frontend/Home.js
Copyright: Copyright © 2018 - 2020 Kadena LLC.
License: MIT
Maintainer: Francesco Melpignano <francesco@kadena.io>
Stability: experimental

Home page for react frontend
**/

import React, { useState, useEffect, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader } from 'semantic-ui-react';
import User from './User';
import CreateAccount from './CreateAccount';
import Info from './Info';
import Guide from './Guide';
import PactContext from "../contexts/PactContext";
import bk from '../assets/background.png'


const Home = () => {

  const pactContext = useContext(PactContext);

  useEffect(() => {
    async function pactFetch() {
      await pactContext.getCoinBalance();
    }
    pactFetch();
  }, [])


  const panes = [
    { menuItem: { key: 'user', icon: 'user', content: 'Account Details' },
      render: () => <Tab.Pane>
                      <User />
                    </Tab.Pane>
    },
    { menuItem: { key: 'user plus', icon: 'user plus', content: 'Create Account' },
      render: () => <Tab.Pane>
                      <CreateAccount />
                    </Tab.Pane>
    },
    { menuItem: { key: 'user plu', icon: 'question circle', content: 'Getting Started' },
      render: () => <Tab.Pane>
                      <Guide />
                    </Tab.Pane>
    }
  ]

  return (
    <Grid columns={2} padded scrollable verticalAlign="top" style={{backgroundColor: '#006341'}}>
      <Grid.Column textAlign="center" style={{overflow: "auto", backgroundColor: '#006341'}}>
        <Info />
      </Grid.Column>
      <Grid.Column style={{overflow: "auto", backgroundColor: "#F6F7FB", backgroundImage:`url(${bk})`}}>
        <div style={{overflow: "auto", height: "100vh"}}>
        <Tab
          panes={panes}
          menu={{ pointing: true, color:'red', inverted: true, attached: true }}
          defaultActiveIndex={(pactContext.accountName === "" ? 2 : 0)}
          style={{marginLeft: 40, marginRight: 40, marginTop: 30, height: document.documentElement.offsetHeight}}/>
        </div>
      </Grid.Column>
    </Grid>

  );
}

export default Home;
