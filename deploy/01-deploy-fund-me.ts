import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { verify } from "../utils/verify";

const deployFundMe: DeployFunction = async (env: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments, network } = env;
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts();

    const chainId: number = network.config.chainId!

    let ethUsdPriceFeedAddress: string
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[network.name].ethUsdPriceFeed!
    }

    const args = [ethUsdPriceFeedAddress];
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args,
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 0,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    if (chainId != 31337) {
        await verify(fundMe.address, args)
    }
    log("----------------------------------------------------")

}

export default deployFundMe;
deployFundMe.tags = ["all", "fundMe"]