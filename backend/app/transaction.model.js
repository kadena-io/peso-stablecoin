/**
Module: transaction.model.js
Copyright: Copyright © 2018 - 2020 Kadena LLC.
License: MIT
Maintainer: Francesco Melpignano <francesco@kadena.io>
Stability: experimental

handle blockchain transactions on backend
sends transaction to blockchain
  signed with locally stored silver-token-ops keyPair
  if successful returns requestKey to client
NOTE: PLEASE IMPLEMENT PROPER SECUIRTY / CHECKS AROUND MINT FUNCTION (line 40)
    not sure if you want to do this at front or backend
      but need to make sure the fiat payment has come through
**/

//vars to make pact calls
var config = require('../../pact/config')
var fetch = require("node-fetch")
var Pact = require("../node_modules/pact-lang-api/pact-lang-api.js")

//helper function for parsing decimals / numbers
const convertDecimal = (decimal) => {
  decimal = decimal.toString();
  if (decimal[0] === ".") { return chainId + decimal }
  if (decimal.includes('.')) { return decimal }
  if ((decimal / Math.floor(decimal)) === 1) {
    decimal = decimal + ".0"
  } return decimal
}


const Transaction = function(tx) {
  this.type = tx.type;
  this.tx = tx.tx
}


Transaction.mint = async (tx, result) => {
/**
<-----------------------------------WARNING-------------------------------------->
**/
  //NOTE BIG BIG IF HERE
  //YOU MUST ALSO CHECK THAT THE PAYMENT WENT THROUGH FIRST!
  //UNSURE HOW YOU WANT TO INTEGRATE THIS LOGIC WITH YOUR EXISTING CODE
  //PLEASE IMPLEMENT THIS SAFELY OTHERWISE ANYONE CAN MINT TOKENS....
/**
<-------------------------------------------------------------------------------->
**/
  if (tx.type === 'mint') {
    try {
      const amount = convertDecimal(tx.tx.amount);
      const account = tx.tx.account;
      //TO IMPLEMENT
      //  check against some sort of payment receipt on your backend
      const conf = tx.tx.conf;
      const reqKey = await Pact.fetch.send(
      {
        networkId: config.meta.networkId,
        pactCode:`(user.bilira.mint ${JSON.stringify(account)} ${amount} (read-keyset "ks"))`,
        keyPairs: [
          {
            publicKey: config.ops.keypair.publicKey,
            secretKey: config.ops.keypair.secretKey,
            clist: [
              {
                name: "user.bilira.OPS",
                args: []
              },
              //capability to use gas station
              {
                name: `user.bilira-gas-station.GAS_PAYER`,
                args: ["hi", {int: 1}, 1.0]
              }
            ]
          }],
        meta: Pact.lang.mkMeta
        (
          config.meta.sender,
          config.meta.chainId,
          config.meta.gasPrice,
          config.meta.gasLimit,
          config.meta.creationTime(),
          config.meta.ttl
        ),
        envData: {ks: {"pred": "keys-any", "keys": [account, config.ops.keypair.publicKey]}},
      }, config.meta.host);
      result(null, {reqkey: reqKey.requestKeys[0]});
      return;
    } catch(e) {
      //error processing the JSON or sending tx
      console.log(e);
      result({ kind: "not_found" }, null);
      return;
    }
  } else {
    //tx type doesn't match route
    result({ kind: "not_found" }, null);
  }
  //if req key gets made, send it back

  //if not send error
}

Transaction.burn = async (tx, result) => {
/**
<-----------------------------------WARNING-------------------------------------->
**/
  //AFTER BURNING ADMIN MUST ISSUE PHYSICAL GOOD OR USD EQUIVALENT TO USER
/**
<-------------------------------------------------------------------------------->
**/
  if (tx.type === 'burn') {
    try {
      const amount = convertDecimal(tx.tx.amount);
      const account = tx.tx.account;
      const reqKey = await Pact.fetch.send(
      {
        networkId: config.meta.networkId,
        pactCode:`(user.bilira.burn ${JSON.stringify(account)} ${amount})`,
        keyPairs: [
          {
            publicKey: config.ops.keypair.publicKey,
            secretKey: config.ops.keypair.secretKey,
            clist: [
              //capability of contract operator
              {
                name: "user.bilira.OPS",
                args: []
              },
              //capability to use gas station
              {
                name: `user.bilira-gas-station.GAS_PAYER`,
                args: ["hi", {int: 1}, 1.0]
              }
            ]
          }],
        meta: Pact.lang.mkMeta
        (
          config.meta.sender,
          config.meta.chainId,
          config.meta.gasPrice,
          config.meta.gasLimit,
          config.meta.creationTime(),
          config.meta.ttl
        )
      }, config.meta.host);
      result(null, {reqkey: reqKey.requestKeys[0]});
      return;
    } catch(e) {
      //error processing the JSON or sending tx
      console.log(e);
      result({ kind: "not_found" }, null);
      return;
    }
  } else {
    //tx type doesn't match route
    result({ kind: "not_found" }, null);
  }
}

//NOTE: this will fail if the receiving account does not already exist
Transaction.transfer = async (tx, result) => {
  /**
  <-----------------------------------WARNING-------------------------------------->
  **/
    //ONLY ALLOWS USER TO TRANSFER TO EXISTING ACCOUNTS
    //TRANSFERING TO NEW ACCOUNTS IS ALLOWED
  /**
  <-------------------------------------------------------------------------------->
  **/
  if (tx.type === 'transfer') {
    try {
      const amount = convertDecimal(tx.tx.amount);
      const to = tx.tx.to;
      const from = tx.tx.from;
      const reqKey = await Pact.fetch.send(
      {
        networkId: config.meta.networkId,
        pactCode:`(user.bilira.transfer ${JSON.stringify(from)} ${JSON.stringify(to)} ${amount})`,
        keyPairs: [
          {
            publicKey: config.ops.keypair.publicKey,
            secretKey: config.ops.keypair.secretKey,
            clist: [
              //capability to transfer
              {
                name: "user.bilira.TRANSFER",
                //do not use helper function for amount here as this is JS getting sent
                args: [from, to, parseFloat(tx.tx.amount)]
              },
              //capability to use gas station
              {
                name: `user.bilira-gas-station.GAS_PAYER`,
                args: ["hi", {int: 1}, 1.0]
              }
            ]
          }],
        meta: Pact.lang.mkMeta
        (
          config.meta.sender,
          config.meta.chainId,
          config.meta.gasPrice,
          config.meta.gasLimit,
          config.meta.creationTime(),
          config.meta.ttl
        )
      }, config.meta.host);
      result(null, {reqkey: reqKey.requestKeys[0]});
      return;
    } catch(e) {
      //error processing the JSON or sending tx
      console.log(e);
      result({ kind: "not_found" }, null);
      return;
    }
  } else {
    //tx type doesn't match route
    result({ kind: "not_found" }, null);
  }
}


module.exports = Transaction
