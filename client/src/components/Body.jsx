import React from "react";
import Approvers from "./Approvers";
import Transfers from "./Transfers";
import CreateTransaction from "./CreateTransaction";
import Approve from "./Approve";

export default function Body({ approvers, quorum, transfers }) {
	return (
		<div className="mx-3 my-5">
			<div className="row">
				<div className="col-3">
					<Approvers approvers={approvers} quorum={quorum} />
				</div>
				<div className="col-6">
					<CreateTransaction />
				</div>
				<div className="col-3">
					<Transfers transfers={transfers} />
				</div>
			</div>
			<Approve />
		</div>
	);
}
