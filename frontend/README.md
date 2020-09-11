
## To Run

### `npm install` (one-time setup)

### `npm start` (to start serving frontend)

#### Will be served on PORT=3000

#### config file:
- `./src/var/config.js`
- follow instructions in file to toggle mainnet/testnet

#### Main functionality:
- `./src/contexts/PactContext.js`
- contains pact-lang-api blockchain calls and backend api calls
- api calls
  - signing happens in backend (check `backend/app/model.transaction.js`)
    - with `silver-token-ops` keyset
    - returns request key polled with `listen()`
- blockchain call
  - users signs with corresponding private key
  - returns request key polled with `listen()`
- `mint()` (api call)
  - mints tokens with api call
  - IMPLEMENT: fiat payment and verification
- `burn()` (api call)
  - burns tokens with api call
  - IMPLEMENT: fiat credit to user
- `transfer()` (api call)
  - transfers tokens to EXISTING accounts with api call
- `transferDirect()` (blockchain call)
  - transfers tokens to EXISTING accounts directly to blockchain
  - uses gas-station
    - means user only needs STS account no KDA account with balance
