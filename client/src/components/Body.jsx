import React from "react";
import Approvers from "./Approvers";
import Transfers from "./Transfers";
import CreateTransfer from "./CreateTransfer";

export default function Body({ approvers, quorum, transfers, createTransfer, approveTransfer }) {
	return (
		<div className="mx-3 my-5">
			<div className="row">
				<div className="col-lg-5 ">
					<Approvers approvers={approvers} quorum={quorum} />
				</div>
				<div className="col-lg-7">
					<CreateTransfer createTransfer={createTransfer} />
				</div>
			</div>
			<Transfers transfers={transfers} approveTransfer={approveTransfer} />
		</div>
	);
}
