import React from 'react';
import Pact from 'pact-lang-api';
import config from '../var/config';

const Context = React.createContext();

const dumKeyPair = Pact.crypto.genKeyPair();

const savedAcct = localStorage.getItem('acct');
const network = localStorage.getItem('network');

export class PactStore extends React.Component {

  state = {
    accountName: (savedAcct ? savedAcct : ""),
    coinBalance: "n/a",
    loading: false,
    accountLoad: false,
    reqKey: "",
    msg: "",
    err: false,
    be: '',
    network: (network ? network : "testnet"),
    meta: (network ? (network === "testnet" ? config.meta.testnet : config.meta.mainnet) : config.meta.testnet)
  }

  changeNetwork = async () => {
    if (this.state.network === 'testnet') {
      await this.setState({ network: 'mainnet', meta: config.meta.mainnet });
      await localStorage.setItem('network', "mainnet");
    }
    else {
      await this.setState({ network: 'testnet', meta: config.meta.testnet });
      await localStorage.setItem('network', "testnet");
    }
    await this.getCoinBalance();
  }

  convertDecimal = (decimal) => {
    decimal = decimal.toString();
    if (decimal[0] === ".") {return "0" + decimal}
    if (decimal.includes('.')) { return decimal }
    if ((decimal / Math.floor(decimal)) === 1) {
      decimal = decimal + ".0"
    }
    return decimal
  }

  setAccountName = async (str) => {
    this.setState({ accountName: str })
    await localStorage.setItem('acct', str);
  }

  getCoinBalance = async () => {
    await this.setState({ accountLoad: true });
    const cmd = await Pact.fetch.local
      ({
        pactCode: `(user.bilira.get-balance ${JSON.stringify(this.state.accountName)})`,
        keyPairs: dumKeyPair,
        caps:
          [
            Pact.lang.mkCap("Gas capability", "description of gas cap", "coin.GAS", [])
          ],
        meta: Pact.lang.mkMeta
          (
            this.state.meta.sender,
            this.state.meta.chainId,
            this.state.meta.gasPrice,
            this.state.meta.gasLimit,
            this.state.meta.creationTime(),
            this.state.meta.ttl
          )
      },
      this.state.meta.host
      )
    const data = await cmd;
    if (data.status === "success") {
      await this.setState({ coinBalance: data.data.toString().substring(0,15), accountLoad: false })
    } else {
      await this.setState({ coinBalance: "n/a", accountLoad: false })
    }
  }

  listen = async (reqKey) => {
    const res = await Pact.fetch.listen({listen: reqKey}, this.state.meta.host);
    console.log(res)
    if (res.status === 'success') {
      this.setState({ msg: 'Success! Check out your '})
    } else {
      this.setState({ msg: 'There was an error processing your '})
    }
  }

  mint = async (amount) => {
    //conf param is to be IMPLEMENTED
    //  left as a placeholder to check on backend that the fiat payment was received
    this.setState({ loading: true, msg: "" })
    try {
      const res = await fetch(`https://bilira-api.chainweb.com/transaction/mint`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          type: "mint",
        	tx: {
        		account: this.state.accountName,
        		amount: amount,
        		conf: "IMPLEMENT ME"
        	}
        })
      })
      const json = await res.json();
      const reqKey = json.reqkey;
      this.setState({ reqKey: reqKey, be: `https://explorer.chainweb.com/${this.state.meta.networkId.slice(0, -2)}/tx/${reqKey}` })
      await this.listen(reqKey)
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, msg: "" })
      alert('There was a problem processing your transaction. Please try again')
    }

  }

  burn = async (amount) => {
    this.setState({ loading: true, msg: "" })
    try {
      const res = await fetch(`https://bilira-api.chainweb.com/transaction/burn`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          type: "burn",
        	tx: {
        		account: this.state.accountName,
        		amount: amount,
        	}
        })
      })
      const json = await res.json();
      const reqKey = json.reqkey;
      this.setState({ reqKey: reqKey, be: `https://explorer.chainweb.com/${this.state.meta.networkId.slice(0, -2)}/tx/${reqKey}` })
      await this.listen(reqKey)
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, msg: "" })
      alert('There was a problem processing your transaction. Please try again')
    }

  }

  transfer = async (recp, amount) => {
    this.setState({ loading: true, msg: "" })
    try {
      const res = await fetch(`https://bilira-api.chainweb.com/transaction/transfer`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          type: "transfer",
          tx: {
            from: this.state.accountName,
            to: recp,
            amount: amount,
          }
        })
      })
      const json = await res.json();
      const reqKey = json.reqkey;
      this.setState({ reqKey: reqKey, be: `https://explorer.chainweb.com/${this.state.meta.networkId.slice(0, -2)}/tx/${reqKey}` })
      await this.listen(reqKey)
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, msg: "" })
      alert('There was a problem processing your transaction. Please try again')
    }

  }

  download = (data, filename, type) => {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
  }

  genKp = async () => {
    var kp = Pact.crypto.genKeyPair();
    var id = kp.publicKey.substring(0, 6);
    var priv = `public: ${kp.publicKey}\nsecret: ${kp.secretKey}`
    var privName = `private-keypair-${id}.kda`
    await this.setAccountName(kp.publicKey);
    this.download(priv, privName, "text/plain;charset=utf-8");

  }

  transferDirect = async (recp, amount, privKey) => {
    this.setState({ loading: true, msg: "" })
    try {
      const amt = this.convertDecimal(amount)
      const res = await Pact.fetch.send(
      {
        networkId: this.state.meta.networkId,
        pactCode:`(user.bilira.transfer ${JSON.stringify(this.state.accountName)} ${JSON.stringify(recp)} ${amt})`,
        keyPairs: [
          {
            publicKey: this.state.accountName,
            secretKey: privKey,
            clist: [
              //capability to transfer
              {
                name: "user.bilira.TRANSFER",
                args: [this.state.accountName, recp, parseFloat(amount)]
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
          this.state.meta.sender,
          this.state.meta.chainId,
          this.state.meta.gasPrice,
          this.state.meta.gasLimit,
          this.state.meta.creationTime(),
          this.state.meta.ttl
        )
      }, this.state.meta.host);
      const reqKey = res.requestKeys[0]
      await this.setState({ reqKey: reqKey, be: `https://explorer.chainweb.com/${this.state.meta.networkId.slice(0, -2)}/tx/${reqKey}` })
      await this.listen(reqKey)
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, msg: "" })
      alert('There was a problem processing your transaction. Please try again')
    }
  }

  transferWallet = async (recp, amount) => {
    this.setState({ loading: true, msg: "" })
    try {
      const amt = this.convertDecimal(amount)
      const signCmd = {
          pactCode: `(user.bilira.transfer ${JSON.stringify(this.state.accountName)} ${JSON.stringify(recp)} ${amt})`,
          caps: [
            Pact.lang.mkCap("Gas capability", "description of gas cap", "user.bilira-gas-station.GAS_PAYER", ["hi", {int: 1}, 1.0]),
            Pact.lang.mkCap("transfer capability", "description of transfer cap", "user.bilira.TRANSFER", [this.state.accountName, recp, parseFloat(amount)]),
          ],
          sender: this.state.meta.sender,
          gasLimit: this.state.meta.gasLimit,
          chainId: this.state.meta.chainId,
          ttl: this.state.meta.ttl,
          envData: {}
        }
      const cmd = await Pact.wallet.sign(signCmd)
      console.log(cmd)
      const res = await Pact.wallet.sendSigned(cmd, this.state.meta.host)
      const reqKey = res.requestKeys[0]
      await this.setState({ reqKey: reqKey, be: `https://explorer.chainweb.com/${this.state.meta.networkId.slice(0, -2)}/tx/${reqKey}` })
      await this.listen(reqKey)
    } catch(err){
      this.setState({ loading: false, msg: "" })
      alert("you cancelled the TX or you did not have the wallet app open")
      window.location.reload();
    }
  }



  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setAccountName: this.setAccountName,
          getCoinBalance: this.getCoinBalance,
          mint: this.mint,
          burn: this.burn,
          transfer: this.transfer,
          genKp: this.genKp,
          transferDirect: this.transferDirect,
          transferWallet: this.transferWallet,
          changeNetwork: this.changeNetwork
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

}

export default Context;
