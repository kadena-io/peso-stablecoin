/**
Module: transaction.controller.js
Copyright: Copyright © 2018 - 2020 Kadena LLC.
License: MIT
Maintainer: Francesco Melpignano <francesco@kadena.io>
Stability: experimental

Controller for transaction
**/

const Transaction = require("./transaction.model.js");

//mint new tokens to specified account
exports.mint = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Transaction to ref it
  const tx = new Transaction({
    type: req.body.type,
    tx: req.body.tx,
  });

  // mint tokens for specified account
  Transaction.mint(tx, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while minting tokens."
      });
    else res.send(data);
  });
};

//burn existing tokens to specified account
exports.burn = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Transaction to ref it
  const tx = new Transaction({
    type: req.body.type,
    tx: req.body.tx,
  });

  // mint tokens for specified account
  Transaction.burn(tx, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while burining tokens."
      });
    else res.send(data);
  });
};

//transfer tokens to EXISTING account
exports.transfer = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Transaction to ref it
  const tx = new Transaction({
    type: req.body.type,
    tx: req.body.tx,
  });

  // mint tokens for specified account
  Transaction.transfer(tx, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while transfering tokens."
      });
    else res.send(data);
  });
};
