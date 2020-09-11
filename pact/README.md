
## To Deploy Silver Token Contract

### `node deploy.js`

## To Deploy Silver Token Gas Station

### `node deploy-gs.js`


#### config file:
- `../pact/config.js`
- follow instructions in file to toggle mainnet/testnet

#### Main functionality:
- `silver-token.pact`
  - `GOVERNANCE` with `silver-token-admin` keyset
    - update smart contract
  - `OPS` with `silver-token-ops` keyset
    - mint
    - burn
    - transfer
    - rotate-keyset
- `silver-token-gas-station.pact`
  - `GOVERNANCE` with `silver-token-admin` keyset
    - update smart contract
    - only allows calls from `silver-token` contract to use gas-station


NOTE: Please keep the keys in the config file safe! Never show them to others and we would recommend using an HSM for private key security
