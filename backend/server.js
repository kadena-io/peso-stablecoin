/**
Module: server.js
Copyright: Copyright © 2018 - 2020 Kadena LLC.
License: MIT
Maintainer: Francesco Melpignano <francesco@kadena.io>
Stability: experimental

Main file to serve api
**/

const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')

const app = express();


app.use(cors({origin: '*'}))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BILIRAxKADENA token platform" });
});

//import trasaction api function calls
require("./app/transaction.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
