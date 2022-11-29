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
		<div className="navbar bg-base-100 ">
			<div className="flex-1">
				<NavLink to="/">
					<p className="btn btn-ghost normal-case text-xl">25thFrame</p>
				</NavLink>
			</div>

			<div className="flex-none">
				<ul className="menu menu-horizontal p-0">
					<li className="menu-item mr-5">
						<Link to="/up-coming-contests">Dashboard</Link>
					</li>
					<li className="menu-item mr-5">
						<Link to="/">Favorites</Link>
					</li>
					<li className="menu-item mr-5">
						<Link to="/">My photos</Link>
					</li>
				</ul>
			</div>

			<div className="flex-none gap-2">
				{user === null ? (
					<Link to="/login">Login</Link>
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
							className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-10"
						>
							<li>
								<Link to="/profile" className="justify-between">
									Profile
									<span className="badge">New</span>
								</Link>
							</li>
							<li>
								<Link to="/edit-profile">Settings</Link>
							</li>
							<li>
								<Link to="/logout">Logout</Link>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
