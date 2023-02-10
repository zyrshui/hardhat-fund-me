import { run } from "hardhat";

export async function verify(contractsAddress: string, args: any[]) {
    console.log("Verify contract...");
    try {
        await run("verify:verify", {
            address: contractsAddress,
            constructorArguments: args
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.warn("Already Verified!")
        } else {
            console.error(e)
        }
    }
}