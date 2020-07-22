import React from "react";

export default function Approve({ approve }) {
	return (
		<div>
			<h5 className="mt-5">Approve</h5>
			<div className="input-group mb-2 mr-auto">
				<div class="input-group-prepend">
					<div class="input-group-text">Transaction Number</div>
				</div>
				<input className="form-group mb-0" type="text" placeholder="" />
				<button className="ml-3 btn btn-warning">Approve!</button>
			</div>
		</div>
	);
}
