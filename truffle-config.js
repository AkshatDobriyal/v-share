const path = require("path");

//const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
//const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          //privateKeys.split(','), // Array of account private keys
          'https://ropsten.infura.io/v3/0c5867a6257c459daf419fdd0d30cd4b'// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 3
    }
  },
  contracts_directory: '/contracts/',
  //contracts_build_directory: '/client/src/contracts/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
