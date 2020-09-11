/**
FRONTEND CONFIG for blockchain calls to kadena chainweb
use frontend radio button to toggle testnet / mainnet
(backend and contract config ../../pact/config.js)
**/

//networkId
var networkIdTN = "testnet04"
var networkIdMN = "mainnet01"

//chainweb node
var nodeTN = 'us1.testnet'
var nodeMN = 'us-e1'

//target chain for contract
var chainId = "3"

//api host to send requests
var hostTN = `https://${nodeTN}.chainweb.com/chainweb/0.0/${networkIdTN}/chain/${chainId}/pact`
//api host to send requests
var hostMN = `https://${nodeMN}.chainweb.com/chainweb/0.0/${networkIdMN}/chain/${chainId}/pact`

//creation time for request
var creationTime = () => Math.round((new Date).getTime()/1000)-15


//meta data for blockchian transaction on kadena chainweb
var meta = {
  testnet: {
    networkId: networkIdTN,
    chainId: chainId,
    host: hostTN,
    creationTime: creationTime,
    //gas price at lowest possible denomination
    gasPrice: 0.00000000001,
    //high gas limit for tx
    gasLimit: 10000,
    //time a tx lives in mempool since creationTime
    ttl: 28800,
    //gas payer of the transaction
    //  set to our gas station account defined in st-gas-station.pact
    sender: "Digital Peso-free-gas",
    //nonce here doesnt matter since the tx will never have the same hash
    nonce: "some nonce that doesnt matter",
  },
  mainnet: {
    networkId: networkIdMN,
    chainId: chainId,
    host: hostMN,
    creationTime: creationTime,
    //gas price at lowest possible denomination
    gasPrice: 0.00000000001,
    //high gas limit for tx
    gasLimit: 10000,
    //time a tx lives in mempool since creationTime
    ttl: 28800,
    //gas payer of the transaction
    //  set to our gas station account defined in st-gas-station.pact
    sender: "Digital Peso-free-gas",
    //nonce here doesnt matter since the tx will never have the same hash
    nonce: "some nonce that doesnt matter",
  }
}

module.exports = {
  meta: meta
}
