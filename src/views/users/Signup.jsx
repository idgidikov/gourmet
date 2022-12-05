import React from "react";
import { useState } from "react";
import { AppContext } from "../../context/app.context";
import UserValid from "../../common/enums/user-validation";
import { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { createUser, getUser } from "../../services/users.services";
import { registerUser, loginUser } from "../../services/auth.services";

function Signup() {
	const { addToast, setAppState, ...appState } = useContext(AppContext);
	const navigate = useNavigate();
	const location = useLocation();

	const [form, setForm] = useState({
		username: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
		email: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
		password: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
		confirmPassword: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
		name: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
		last: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
		phone: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
	});
	const updateUsername = (value = "") => {
		setForm({
			...form,
			username: {
				value,
				touched: true,
				valid:
					value.length >= UserValid.USER_MIN_LENGTH &&
					value.length <= UserValid.USER_MAX_LENGTH,
				error:
					value.length < UserValid.USER_MIN_LENGTH
						? `Minimum username length:
                 ${UserValid.USER_MIN_LENGTH}`
						: `Maximum username length: ${UserValid.USER_MAX_LENGTH}`,
			},
		});
	};
	const updateEmail = (value = "") => {
		// username between 4 and 20

		setForm({
			...form,
			email: {
				value,
				touched: true,
				valid:
					value.length >= UserValid.EMAIL_MIN_LENGTH &&
					value.length <= UserValid.EMAIL_MAX_LENGTH,
				error:
					value.length < UserValid.EMAIL_MIN_LENGTH
						? `Minimum email length:
                 ${UserValid.EMAIL_MIN_LENGTH}`
						: `Maximum email length: ${UserValid.EMAIL_MAX_LENGTH}`,
			},
		});
	};
	const updatePassword = (value = "") => {
		setForm({
			...form,
			password: {
				value,
				touched: true,
				valid:
					value.length >= UserValid.PASS_MIN_LENGTH &&
					value.length <= UserValid.PASS_MAX_LENGTH,
				error:
					value.length < UserValid.PASS_MIN_LENGTH
						? `Minimum password length:
                 ${UserValid.PASS_MIN_LENGTH}`
						: `Maximum password length: ${UserValid.PASS_MAX_LENGTH}`,
			},
		});
	};

	const confirmPassword = (value = "") => {
		setForm({
			...form,
			confirmPassword: {
				value,
				touched: true,
				valid:
					value.length >= UserValid.PASS_MIN_LENGTH &&
					value.length <= value.length <= UserValid.PASS_MAX_LENGTH &&
					value === form.password.value,
				error:
					value.length < UserValid.PASS_MIN_LENGTH
						? `Minimum password length:
                 ${UserValid.PASS_MIN_LENGTH}`
						: `Maximum password length: ${UserValid.PASS_MAX_LENGTH}`,
			},
		});
	};
	const UpdateName = (value = "") => {
		setForm({
			...form,
			name: {
				value,
				touched: true,
				valid:
					value.length >= UserValid.FIRST_NAME_MIN_LENGTH &&
					value.length <= UserValid.FIRST_NAME_MAX_LENGTH &&
					!/[^a-zA-Z]/.test(value),
				error:
					value.length < UserValid.FIRST_NAME_MIN_LENGTH
						? `Minimum name length:
                ${UserValid.FIRST_NAME_MIN_LENGTH} `
						: /[^a-zA-Z]/.test(value)
						? "Your name must contain only letters!"
						: `Maximum name length:${UserValid.FIRST_NAME_MAX_LENGTH} `,
			},
		});
	};

	const UpdateLastName = (value = "") => {
		setForm({
			...form,
			last: {
				value,
				touched: true,
				valid:
					value.length >= UserValid.LAST_NAME_MIN_LENGTH &&
					value.length <= UserValid.LAST_NAME_MAX_LENGTH &&
					!/[^a-zA-Z]/.test(value),
				error:
					value.length < UserValid.LAST_NAME_MIN_LENGTH
						? `Minimum  last name length:
                ${UserValid.FIRST_LAST_NAME_MIN_LENGTH} `
						: /[^a-zA-Z]/.test(value)
						? "Your last name must contain only letters!"
						: `Maximum last name length:${UserValid.FIRST_LAST_NAME_MAX_LENGTH} `,
			},
		});
	};
	const updatePhone = (value = "") => {
		setForm({
			...form,
			phone: {
				value,
				touched: true,
				valid:
					value.length === UserValid.PHONE_NUMBER_LENGTH && /^\d+$/.test(value),
				error:
					value.length !== UserValid.PHONE_NUMBER_LENGTH
						? `Phone number must contain ${UserValid.PHONE_NUMBER_LENGTH} symbols!`
						: "Phone number must contain digits only 0-9!",
			},
		});
	};

	const register = async (e) => {
		e.preventDefault();

		if (!form.username.valid) return addToast("error", form.username);
		if (!form.email.valid) return addToast("error", form.email.error);
		if (!form.password.valid) return addToast("error", form.password.error);
		if (!form.confirmPassword.valid)
			return addToast("error", form.confirmPassword.error);
		if (!form.name.valid) return addToast("error", form.name.error);
		if (!form.last.valid) return addToast("error", form.last.error);
		if (!form.phone.valid) return addToast("error", form.phone.error);
		try {
			const user = await getUser(form.username.value);

			if (user !== null)
				return addToast(
					"error",
					`User with username ${form.username.value} already exists!`
				);

			const credentials = await registerUser(
				form.email.value,
				form.password.value
			);

			try {
				const userData = await createUser(
					credentials.user.uid,
					form.username.value,
					form.email.value,
					form.name.value,
					form.last.value,
					form.phone.value
				);

				setAppState({
					...appState,
					userData,
				});
			} catch (e) {
				return addToast("error", e.message);
			}

			try {
				const credentials = await loginUser(
					form.email.value,
					form.password.value
				);

				setAppState({
					...appState,
					user: {
						email: credentials.user.email,
						uid: credentials.user.uid,
					},
				});

				addToast("success", "You have been logged!");
				addToast("success", "Please upload profile pic");

				navigate("/");
			} catch (error) {
				addToast("error", "Something went wrong");
				console.log(error);
			}
		} catch (error) {
			if (error.message.includes("auth/email-already-in-use")) {
				return addToast("error", "This email has already been registered!");
			}

			addToast("error", "Something went wrong");
		}
	};

	return (
		<div className="">
			<div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
				<div className="bg-gray-500 flex flex-col justify-center">
					<form className="max-w-[400px] w-full mx-auto bg-white-p-4" action="">
						<h2 className="text-4xl font-bold text-center py-6">25thFrame</h2>

						<p className="mb-4">Please login to your account</p>
						<div className="mb-4">
							<input
								value={form.username.value}
								onChange={(e) => updateUsername(e.target.value)}
								type="text"
								className="form-control block w-full 
                                px-3 py-1.5 text-base font-normal text-gray-700
                                 bg-white bg-clip-padding border border-solid border-gray-300
                                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                                  focus:border-violet-600 focus:outline-none"
								id="username"
								placeholder="Username"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.email.value}
								onChange={(e) => updateEmail(e.target.value)}
								type="email"
								className="form-control block w-full
                                 px-3 py-1.5 text-base font-normal text-gray-700 bg-white 
                                 bg-clip-padding border border-solid border-gray-300 rounded transition 
                                 ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
								id="email"
								placeholder="Email"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.name.value}
								onChange={(e) => UpdateName(e.target.value)}
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal
                                 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
								id="name"
								placeholder="Name"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.last.value}
								onChange={(e) => UpdateLastName(e.target.value)}
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding 
                                border border-solid border-gray-300 rounded transition ease-in-out m-0
                                 focus:text-gray-700 focus:bg-white focus:border-violet-600 
                                focus:outline-none"
								id="lastname"
								placeholder="Last Name"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.password.value}
								onChange={(e) => updatePassword(e.target.value)}
								type="password"
								className="form-control block w-full px-3 py-1.5
                                 text-base font-normal text-gray-700 bg-white
                                  bg-clip-padding border border-solid border-gray-300
                                   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
								id="password"
								placeholder="Password"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.confirmPassword.value}
								onChange={(e) => confirmPassword(e.target.value)}
								type="password"
								className="form-control block w-full px-3 py-1.5
                                 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid
                                  border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700
                                   focus:bg-white focus:border-violet-600 focus:outline-none"
								id="passwordConfirm"
								placeholder="Repeat password"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.phone.value}
								onChange={(e) => updatePhone(e.target.value)}
								type="text"
								className="form-control block w-full px-3 py-1.5
                                 text-base font-normal text-gray-700 bg-white
                                  bg-clip-padding border border-solid border-gray-300
                                   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
								id="phone"
								placeholder="phone"
							/>
						</div>
						<div className="text-center pt-1 mb-12 pb-1">
							<button
								className="inline-block px-6 py-2.5 text-white font-medium text-xs
                                 leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg
                                  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
								type="submit"
								onClick={register}
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
							>
								Register
							</button>
							<a className="text-gray-500" href="#!">
								Forgot password?
							</a>
						</div>
						<div className="flex items-center justify-between pb-6">
							<p className="mb-0 mr-2">You have an account?</p>
							<button
								type="button"
								className="inline-block px-6 py-2 border-2 border-red-600 text-red-600
                                 font-medium text-xs leading-tight uppercase rounded hover:bg-black
                                  hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
							>
								<Link to="/login">Log In</Link>
							</button>
						</div>
					</form>
					{/* </div>
                                </div> */}
					<div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none" />
					{/* </div>
                        </div>
                    </div>
                </div>
            </div> */}
				</div>
			</div>
		</div>
	);
}
export default Signup;
