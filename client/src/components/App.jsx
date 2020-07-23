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
	const [loading, setLoading] = useState(true);
	const [reload, setReload] = useState(0);

	useEffect(() => {
		const init = async () => {
			const web3 = await getWeb3();
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
			setLoading(false);
		};
		init();
	}, []);

	useEffect(() => {
		if (reload !== 0) {
			const init = async () => {
				const wallet = await getWallet(web3);
				const transfers = await wallet.methods.getTransfers().call();
				setTransfers(transfers);
				setLoading(false);
			};
			init();
		}
	}, [reload, accounts, web3, quorum, approvers]);

	const createTransfer = async ({ wei, to }) => {
		setLoading(true);
		await wallet.methods
			.createTransfer(wei, to)
			.send({ from: accounts[0] })
			.on("transactionHash", (hash) => {
				setReload(reload + 1);
			});
	};

	const approveTransfer = async (id) => {
		setLoading(true);
		await wallet.methods
			.approveTransfer(id)
			.send({ from: accounts[0] })
			.on("transactionHash", (hash) => {
				setReload(reload + 1);
			});
	};

	if (loading === true) {
		return <div className="container text-center">Loading...</div>;
	}
	return (
		<div className="mx-5">
			<Header />
			<Body
				approvers={approvers}
				quorum={quorum}
				transfers={transfers}
				approveTransfer={approveTransfer}
				createTransfer={createTransfer}
			/>
		</div>
	);
}
