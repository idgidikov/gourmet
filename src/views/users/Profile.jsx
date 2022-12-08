import React from "react";
import ProfileCard from "../../components/users/ProfileCard";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/app.context";
import MyContests from "../contests/MyContests";

function Profile() {
	const { addToast, ...appState } = useContext(AppContext);

	const { userData } = appState;
	// const [userRole, setUserRole] = useState("Photo junkie");

	//console.log(appState)
	//console.log(userData)
	return (
		<div>
			Profile
			<ProfileCard
				userData={userData}
				// userRole={userRole}
				// setUserRole={setUserRole}
			/>
			<MyContests />
		</div>
	);
}

export default Profile;
