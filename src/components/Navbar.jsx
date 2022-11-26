import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/app.context";
import { useSearchParams } from "react-router-dom";

import { defaultPicture } from "../common/constants";
import { useLocation } from "react-router-dom";

const Navbar = function () {
	const [search, setSearch] = useSearchParams();
	const { addToast, setAppState, user, userData } = useContext(AppContext);
	const location = useLocation();

	return (
		<div className="navbar bg-base-100 sticky">
			<div className="flex-1">
				<NavLink to="/">
					<p className="btn btn-ghost normal-case text-xl">25thFrame</p>
				</NavLink>
			</div>

			<div className="flex-none">
				<ul className="menu menu-horizontal p-0">
					<li className="menu-item mr-5">
						<NavLink to="/">Contests</NavLink>
					</li>
					<li className="menu-item mr-5">
						<NavLink to="/">Create Contest</NavLink>
					</li>
					<li className="menu-item mr-5">
						<NavLink to="/">Dashboard</NavLink>
					</li>
				</ul>
			</div>

			<div className="flex-none gap-2">
				{user === null ? (
					<NavLink to="/login">Login</NavLink>
				) : (
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img
									src={userData?.profile ? userData.profile : defaultPicture}
								/>
							</div>
						</label>
						<ul
							tabIndex={0}
							className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
						>
							<li>
								<Link to="/" className="justify-between">
									Profile
									<span className="badge">New</span>
								</Link>
							</li>
							<li>
								<Link to="/">Settings</Link>
							</li>
							<li>
								<Link to="/">Logout</Link>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
