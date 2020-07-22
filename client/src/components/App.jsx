import React, { useEffect, useState } from "react";
import { getWeb3, getWallet } from "../utils";
import Header from "./Header";
import Body from "./Body";

export default function App() {
	const [web3, setWeb3] = useState(undefined);
	const [accounts, setAccounts] = useState(undefined);
	const [wallet, setWallet] = useState(undefined);
	const [approvers, setApprovers] = useState([]);
	const [quorum, setQuorum] = useState(undefined);
	const [transfers, setTransfers] = useState([]);

	useEffect(() => {
		const init = async () => {
			const web3 = getWeb3();
			const accounts = await web3.eth.getAccounts();
			const wallet = await getWallet(web3);
			const approvers = await wallet.methods.getApprovers().call();
			const quorum = await wallet.methods.quorum().call();
			const transfers = await wallet.methods.getTransfers().call();
			setWeb3(web3);
			setAccounts(accounts);
			setWallet(wallet);
			setApprovers(approvers);
			setQuorum(quorum);
			setTransfers(transfers);
		};
		init();
	}, []);
	if (web3 === undefined || accounts === undefined || wallet === undefined) {
		return <div className="text-center">Loading...</div>;
	}
	return (
		<div className="mx-5">
			<Header />
			<Body approvers={approvers} quorum={quorum} transfers={transfers} />
		</div>
	);
}
