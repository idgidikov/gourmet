import "./App.css";
import { useState } from "react";
import { AppContext } from "./context/app.context";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import SubmissionForm from "./views/submisions/SubmisionForm";

function App() {
	const [appState, setAppState] = useState();
	const [toasts, setToasts] = useState([]);

	const addToast = (type, message) => {
		const toast = {
			class: type === "error" ? "alert-error" : "alert-success",
			message,
		};

		setToasts((toasts) => [...toasts, toast]);

		setTimeout(
			() => setToasts((toasts) => toasts.filter((t) => t !== toast)),
			7000
		);
	};

	return (
		<AppContext.Provider value={{ ...appState, setAppState, addToast }}>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sub" element={<SubmissionForm />} />
				</Routes>
				<div className="toast">
					{toasts.map((t, i) => (
						<div key={i} className={`alert ${t.class}`}>
							<div>
								<span>{t.message}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</AppContext.Provider>
	);
}

export default App;
