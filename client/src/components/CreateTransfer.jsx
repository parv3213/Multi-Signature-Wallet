import React, { useState } from "react";

export default function CreateTransfer({ createTransfer }) {
	const [transfer, setTransfer] = useState();

	const handleChange = (event) => {
		setTransfer({ ...transfer, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createTransfer(transfer);
	};

	return (
		<div className="mt-3 mx-3">
			<h5>Create Transfer</h5>
			<form className="mt-4" onSubmit={handleSubmit}>
				<div className="input-group mb-2">
					<div className="input-group-prepend">
						<div className="input-group-text">Wei</div>
					</div>
					<input name="wei" className="form-group mb-0" type="text" placeholder="" onChange={handleChange} />
				</div>
				<div className="input-group mb-2">
					<div className="input-group-prepend">
						<div className="input-group-text">To</div>
					</div>
					<input name="to" className="form-group mb-0 w-75" type="text" placeholder="" onChange={handleChange} />
				</div>

				<button className="btn btn-info btn-sm mt-1" style={{ width: "100%" }}>
					Submit Transfer
				</button>
			</form>
		</div>
	);
}
