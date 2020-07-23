import React from "react";

export default function Transfers({ transfers, approveTransfer }) {
	const handleClick = (event) => {
		approveTransfer(event.target.name);
	};

	return (
		<div className="mt-3" style={{ border: "solid 3px #325fea", minHeight: "200px", width: "100%" }}>
			<h5 className="text-center mt-3">Transfers - Approvals</h5>
			<table className="mr-auto ml-auto my-3" style={{ width: "90%", color: "#879ab7" }}>
				<thead>
					<tr>
						<th>Id</th>
						<th>Amount</th>
						<th>To</th>
						<th>Approvals</th>
						<th>Sent</th>
					</tr>
				</thead>
				<tbody>
					{transfers.map(({ id, amount, to, approvals, sent }) => {
						return (
							<tr key={id}>
								<td>{id}</td>
								<td>{amount}</td>
								<td>{to}</td>
								<td>
									{approvals}
									<button name={id} className="ml-2 btn btn-warning" onClick={handleClick}>
										Approve
									</button>
								</td>
								<td>{sent ? "Yes" : "No"}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
