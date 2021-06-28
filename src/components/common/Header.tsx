import React from "react";

export default function Header(): JSX.Element {
	return (
		<>
			<header id="header" className="alt">
				<a href="/" className="logo">
					<strong>Boundary</strong> <span>by Mircat</span>
				</a>
				<nav>
					<a href="#menu">Menu</a>
				</nav>
			</header>
		</>
	);
}
