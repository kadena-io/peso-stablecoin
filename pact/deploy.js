'use strict';
var fs = require("fs")
var fetch = require("node-fetch")
var config = require("./config")
var Pact = require("../frontend/node_modules/pact-lang-api/pact-lang-api.js")

//read in pact code
var module = fs.readFileSync("./bilira.pact", 'utf-8')

//format blockchain transaction
const deploy = {
  pactCode: module,
  keyPairs: {
    //admin keypair needs to deploy the contract
    publicKey: config.admin.keypair.publicKey,
    secretKey: config.admin.keypair.secretKey,
    clist: []},
  meta: Pact.lang.mkMeta
    (
      config.admin.account,
      config.meta.chainId,
      config.meta.gasPrice,
      config.meta.gasLimit,
      config.meta.creationTime(),
      config.meta.ttl
    ),
  nonce: config.meta.nonce,
  networkId: config.meta.networkId
}

//send and listen to response from blockchain
Pact.fetch.send(deploy, config.meta.host).then(result => {
  console.log(result)
  Pact.fetch.listen({listen: result.requestKeys[0]}, config.meta.host).then(console.log)
}).catch(e => console.log(e))
