/**
BACKEND AND SMART CONTRACT CONFIG for blockchain calls to kadena chainweb
change networkId and node to toggle testnet / mainnet
(frontend config /frontend/src/var/config.js)
**/

//networkId
//for mainnet change to:
   var networkId = "mainnet01"
// var networkId = "testnet04"

//chainweb node
//for mainnet change to:
    var node = 'us-e1'
// var node = 'us1.testnet'

//target chain for contract
var chainId = "3"

//api host to send requests
var host = `https://${node}.chainweb.com/chainweb/0.0/${networkId}/chain/${chainId}/pact`

//creation time for request
var creationTime = () => Math.round((new Date).getTime()/1000)-15

/**
<-----------------------------------KEEP SAFE------------------------------------>
**/
//keypair of bilira-admin account
//  GOVERNOR of smart contact
var adminAcct = {
  account: "bilira-admin",
  keypair: {
    publicKey: "37a6ee9be79abbf2b1b1f7a4a7050ba27638720b6a6643c9700803553679a3c7",
    secretKey: "46ddcd57fed7ac7a145672677cf084b3834d6c202f38f3c3736edb5c57b08b40"
  }
}
/**
<-------------------------------------------------------------------------------->
**/

/**
<-----------------------------------KEEP SAFE------------------------------------>
**/
//keypair of bilira-ops account
//  OPERATOR of smart contract
var opsAcct = {
  account: "bilira-ops",
  keypair: {
    publicKey: "cbdf6c3854f56cb80e9133925416f98fc1b9e2441724637452dae4b2479edbb7",
    secretKey: "0da4a9e979b0baf5429faad96a74cbf58d5d4dcd447551784ad40f142bb9c641"
  }
}
/**
<-------------------------------------------------------------------------------->
**/

//meta data for blockchian transaction on kadena chainweb
var meta = {
  networkId: networkId,
  chainId: chainId,
  host: host,
  creationTime: creationTime,
  //gas price at lowest possible denomination
  gasPrice: 0.00000000001,
  //high gas limit for tx
  gasLimit: 10000,
  //time a tx lives in mempool since creationTime
  ttl: 28800,
  //gas payer of the transaction
  //  set to our gas station account defined in st-gas-station.pact
  sender: "bilira-free-gas",
  //nonce here doesnt matter since the tx will never have the same hash
  nonce: "some nonce that doesnt matter",
}

module.exports = {
  admin: adminAcct,
  ops: opsAcct,
  meta: meta
}
