import React from "react";
import ProfileCard from "../../components/users/ProfileCard";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/app.context";

function Profile() {
	const { addToast, setAppState, ...appState } = useContext(AppContext);

	const { userData } = appState;
	const [userRole, setUserRole] = useState("Photo junkie");

	//console.log(appState)
	//console.log(userData)
	return (
		<div>
			Profile
			<ProfileCard
				userData={userData}
				userRole={userRole}
				setUserRole={setUserRole}
			/>
		</div>
	);
}

export default Profile;
