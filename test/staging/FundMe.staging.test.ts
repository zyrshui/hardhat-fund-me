import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert } from "chai";
import { network, ethers } from "hardhat";
import { developmentChains } from "../../helper-hardhat-config";
import { FundMe } from "../../typechain-types"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Tests", function () {
        let deployer: SignerWithAddress;
        let fundMe: FundMe;
        const sendValue = ethers.utils.parseEther("0.1")

        beforeEach(async () => {
            const accounts = await ethers.getSigners()
            deployer = accounts[0]
            fundMe = await ethers.getContract("FundMe", deployer.address)
            console.log("6666", deployer.address, fundMe.address)
        })

        it("allows people to fund and withdraw", async function () {
            const fundTxResponse = await fundMe.fund({ value: sendValue })
            await fundTxResponse.wait(1)
            const withdrawTxResponse = await fundMe.withdraw()
            await withdrawTxResponse.wait(1)

            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            console.log(
                endingFundMeBalance.toString() +
                " should equal 0, running assert equal..."
            )
            assert.equal(endingFundMeBalance.toString(), "0")
        })
    })