import React from "react";

export default function Approvers({ approvers, quorum }) {
	return (
		<div style={{ border: "solid 3px #325fea", height: "200px", width: "100%" }}>
			<h5 className="text-center mt-3">Approvers Address</h5>
			<div className="mr-auto ml-auto my-3" style={{ width: "90%", overflow: "scroll", color: "#879ab7" }}>
				<ul>
					{approvers.map((approver) => {
						return <li>{approver}</li>;
					})}
				</ul>
			</div>
			<p className="mt-3 ml-3 font-italic">
				Quorum: <span className="font-weight-bold">{quorum}</span>
			</p>
		</div>
	);
}
