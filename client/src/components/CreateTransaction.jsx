import React from "react";

export default function CreateTransaction({ createTransaction }) {
	return (
		<div className="mt-3 mx-5">
			<h5>Create Transaction</h5>
			<form className="mt-4">
				<div className="input-group mb-2 mr-auto">
					<div class="input-group-prepend">
						<div class="input-group-text">Amount</div>
					</div>
					<input className="form-group mb-0" type="text" placeholder="" />
					<div class="input-group-prepend ml-auto ">
						<div class="input-group-text">To</div>
					</div>
					<input className="form-group mb-0" type="text" placeholder="" />
				</div>
				<button className="btn btn-info btn-sm" style={{ width: "100%" }}>
					Submit Transaction
				</button>
			</form>
		</div>
	);
}
