import "./App.css";
import { useState, useEffect } from "react";
import { AppContext } from "./context/app.context";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ContestForm from "./views/contests/ContestForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useLocation, useNavigate } from "react-router-dom";
import Signup from "./views/users/Signup";
import { getUserById } from "./services/users.services";
import Navbar from "./components/Navbar";
import SubmissionForm from "./views/submisions/SubmisionForm";
import Login from "./views/users/Login";
import Logout from "./views/users/Logout";

function App() {
	const [user, loading, error] = useAuthState(auth);

	const location = useLocation();
	const navigate = useNavigate();
	const [appState, setAppState] = useState({
		user: user ? { email: user?.email, uid: user?.uid } : null,
		userData: null,
	});
	const [toasts, setToasts] = useState([]);

	useEffect(() => {
		setAppState({
			...appState,
			user: user ? { email: user.email, uid: user.uid } : null,
		});
		if (location.state?.from?.pathname) {
			navigate(location.state.from.pathname);
		}
	}, [user]);

	useEffect(() => {
		if (appState.user !== null) {
			getUserById(appState.user?.uid)
				.then(
					(userData) =>
						setAppState({ ...appState, userData }) || console.log(userData)
				)
				.catch((e) => addToast("error", e.message));
		}
	}, [appState.user]);

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
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create-contest" element={<ContestForm />} />
					<Route path="/sign-up" element={<Signup />} />
					<Route path="/sub" element={<SubmissionForm />} />
					<Route path="/log-in" element={<Login />} />
					<Route path="/log-out" element={<Logout/>} />
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
