import { ProxyAgent, setGlobalDispatcher } from "undici"
import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config"
import "@nomiclabs/hardhat-waffle"
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage"
import "hardhat-deploy"
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter"


const proxyAgent = new ProxyAgent("http://127.0.0.1:4780")
setGlobalDispatcher(proxyAgent);
const config: HardhatUserConfig = {
  solidity: {
    compilers: [{
      version: "0.8.17"
    }, {
      version: "0.6.6"
    }]
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY!],
      chainId: 5
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0
    }
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: 'gas-report.txt',
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: 'ETH'
  }
};
export default config;
