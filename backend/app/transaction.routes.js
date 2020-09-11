/**
Module: transaction.routes.js
Copyright: Copyright © 2018 - 2020 Kadena LLC.
License: MIT
Maintainer: Francesco Melpignano <francesco@kadena.io>
Stability: experimental

Routes for api calls
**/

var cors = require('cors')
module.exports = app => {
  const transaction = require("./transaction.controller.js");

  // Mint new tokens for specified account
  app.post("/transaction/mint", cors(), transaction.mint);

  //Burn existing tokens for specified account
  app.post("/transaction/burn", cors(), transaction.burn)

  //Transfer tokens to an EXISTING account
  app.post("/transaction/transfer", cors(), transaction.transfer)
};
