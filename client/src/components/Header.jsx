import React from "react";

export default function Header() {
	return (
		<nav className="navbar mt-3">
			<p className="navbar-brand font-weight-bold ml-5 mb-0" style={{ color: "#325fea" }}>
				<span role="img" aria-label="dollar-bag">
					💰
				</span>{" "}
				MultiSig Wallet
			</p>
			<hr style={{ width: "100%", border: "solid 2px #879ab7" }} />
		</nav>
	);
}
