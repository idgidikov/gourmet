import { useState } from "react";
import "./App.css";

function App() {
	const fun = () => {
		return 5;
	};
	return (
		<div className="App">
			<h1 className="main-header">Under production</h1>
			<p>
				This website will be part of portfolio under construction of Ivan,
				Plamen and Evgeni.
			</p>
			<p>Every feature will be implemented by the following roles</p>
			<ul>
				<li className="">Using React</li>
				<li className="">Well maintain libraries</li>
				<li className="">Eslint configuration</li>
				<li className="">CI/CD</li>
				<li className="">Deploy to Firebase</li>
			</ul>
			<h3>This is a test</h3>
		</div>
	);
}

export default App;
