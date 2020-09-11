'use strict';
var fs = require("fs")
var fetch = require("node-fetch")
var config = require("./config")
var Pact = require("../frontend/node_modules/pact-lang-api/pact-lang-api.js")


var module = fs.readFileSync("./bilira-gas-station.pact", 'utf-8')

const deploy = {
  pactCode: module,
  keyPairs: {
      publicKey: config.admin.keypair.publicKey,
      secretKey: config.admin.keypair.secretKey,
      clist: [{name: "coin.GAS", args: []},
              {name: "coin.TRANSFER", args: ["bilira-admin", "bilira-free-gas", 1.9]}
    ]},
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
