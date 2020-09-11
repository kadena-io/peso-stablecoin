
## To Run

### `npm install` (one-time setup)

### `npm start` (to start serving backend)

#### Will be served on PORT=3002

#### config file:
- `../pact/config.js`
- follow instructions in file to toggle mainnet/testnet

#### Main functionality:
- `./models/app/transaction.model.js`
- all three functions send signed transaction to kadena testnet/mainnet
  - signed with silver-token-ops keyset (specified in `../pact/config.js`
  - return request key (kadena unique identifier for tx receipt) to client
    - response format: `{ "reqkey": "some-req-key-123" }`
- `mint()`
  - mints tokens from api call
  - IMPLEMENT: fiat payment receipt confirmation before minting
- `burn()`
  - burns tokens from api call
  - IMPLEMENT: send fiat payment to user after burn
- `transfer()`
  - tranfers tokens to EXISTING accounts from api call
- IMPLEMENT: general security around api calls. Frontend assumes you are logged into your platform. There is zero security right now

NOTE: This is an experimental integration for your existing backend. Please note that when a user mints tokens from the frontend, the backend should perform a check that the fiat payment has come through before emitting the new tokens. This is well documented in the code comments.
