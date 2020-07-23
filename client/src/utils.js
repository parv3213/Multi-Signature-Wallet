import Wallet from "./contracts/Wallet.json";
import Web3 from "web3";

const getWeb3 = () => {
	return new Promise((resolve, reject) => {
		window.addEventListener("load", async () => {
			if (window.ethereum) {
				const web3 = new Web3(window.ethereum);
				try {
					await window.ethereum.enable();
					resolve(web3);
				} catch (e) {
					reject(e);
				}
			} else if (window.web3) {
				resolve(window.web3);
			} else {
				window.alert("Must install Metamask Extension!\nDApp will not load");
				reject("Must install Metamask Extension!");
			}
		});
	});
};

const getWallet = async (web3) => {
	const networkId = await web3.eth.net.getId();
	const contractDeployment = Wallet.networks[networkId];
	return new web3.eth.Contract(Wallet.abi, contractDeployment && contractDeployment.address);
};

export { getWeb3, getWallet };
