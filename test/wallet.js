const { expectRevert } = require("@openzeppelin/test-helpers");
const chai = require("chai");
const Wallet = artifacts.require("Wallet");

contract("Wallet", (accounts) => {
	let wallet;
	beforeEach(async () => {
		wallet = await Wallet.new([accounts[0], accounts[1], accounts[2]], 2);
		await web3.eth.sendTransaction({ from: accounts[0], to: wallet.address, value: 1000 });
	});

	it("should have correct approvers and quorum", async () => {
		const approvers = await wallet.getApprovers();
		const quorum = await wallet.quorum();
		assert(approvers.length === 3);
		assert(approvers[0] === accounts[0]);
		assert(approvers[1] === accounts[1]);
		assert(approvers[2] === accounts[2]);
		assert(quorum.toNumber() === 2);
	});
	it("should create transfers", async () => {
		await wallet.createTransfer(100, accounts[5], { from: accounts[0] });
		const transfers = await wallet.getTransfers();
		assert.equal(transfers.length, 1);
		assert.equal(transfers[0].id, "0");
		assert.equal(transfers[0].to, accounts[5]);
		assert.equal(transfers[0].approvals, "0");
		assert.equal(transfers[0].sent, false);
	});
	it("should NOT create transfer if sender is not approved", async () => {
		await expectRevert(
			wallet.createTransfer(100, accounts[5], { from: accounts[4] }),
			"only approved users can access"
		);
	});
	it("should increment approval", async () => {
		await wallet.createTransfer(100, accounts[5], { from: accounts[0] });
		await wallet.approveTransfer(0, { from: accounts[0] });
		const balance = await web3.eth.getBalance(wallet.address);
		const transfers = await wallet.getTransfers();
		assert.equal(transfers[0].approvals, "1");
		assert.equal(transfers[0].sent, false);
		assert.equal(balance, "1000");
	});
	it("should send transfer if quorum reached", async () => {
		const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[5]));
		await wallet.createTransfer(100, accounts[5], { from: accounts[0] });
		await wallet.approveTransfer(0, { from: accounts[0] });
		await wallet.approveTransfer(0, { from: accounts[1] });
		const balance = await web3.eth.getBalance(wallet.address);
		const transfers = await wallet.getTransfers();
		assert.equal(transfers[0].sent, true);
		assert.equal(balance, "900");
		const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[5]));
		assert.equal(balanceAfter.sub(balanceBefore).toNumber(), 100);
	});
	it("should NOT approve transaction if sender is not approved", async () => {
		await wallet.createTransfer(100, accounts[5], { from: accounts[0] });
		await expectRevert(wallet.approveTransfer(0, { from: accounts[4] }), "only approved users can access");
	});
	it("should NOT approve transaction if transfer is already sent", async () => {
		await wallet.createTransfer(100, accounts[5], { from: accounts[0] });
		await wallet.approveTransfer(0, { from: accounts[0] });
		await wallet.approveTransfer(0, { from: accounts[1] });
		await expectRevert(wallet.approveTransfer(0, { from: accounts[2] }), "Already sent!");
	});
	it("should NOT approve transaction twice", async () => {
		await wallet.createTransfer(100, accounts[5], { from: accounts[0] });
		await wallet.approveTransfer(0, { from: accounts[0] });
		await expectRevert(wallet.approveTransfer(0, { from: accounts[0] }), "Cannot approve twice");
	});
});
