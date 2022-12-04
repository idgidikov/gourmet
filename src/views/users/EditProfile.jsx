import React from "react";
import { useEffect, useState, useContext } from "react";
import { useAuth, upload } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { defaultPicture } from "/src/common/constants";
import { AppContext } from "../../context/app.context";
import {
	setLoadingProfPic,
	updateLoadPic,
	updateProfilePic,
} from "../../services/users.services";

function EditProfile() {
	const { addToast, setAppState, ...appState } = useContext(AppContext);
	const { userData } = appState;
	const currentUser = useAuth();
	const [photo, setPhoto] = useState(null);
	const [loading, setLoading] = useState(false);
	const [photoURL, setPhotoUrl] = useState(defaultPicture);
	const [photoLoad, setPhotoLoad] = useState(defaultPicture);
	const [imageRef, setImageRef] = useState(null);
	const navigate = useNavigate();
	async function handleChange(e) {
		if (e.target.files[0]) {
			setPhoto(e.target.files[0]);

			await setLoadingProfPic(e.target.files[0], setPhotoLoad, setImageRef);
		}
	}

	async function handleClick() {
		await upload(photo, currentUser, setLoading);

		await updateProfilePic(photoURL, userData);

		setAppState((prev) => ({
			...prev,
			userData: {
				...userData,
				photoURL,
			},
		}));
		await updateLoadPic(imageRef);

		setPhotoLoad(defaultPicture);
		setImageRef(null);

		addToast("success", "You have update profile picture!");

		navigate("/profile");
	}

	useEffect(() => {
		if (currentUser?.photoURL) {
			setPhotoUrl(currentUser.photoURL);
		}
	}, [currentUser?.photoURL]);

	return (
		<div>
			EditProfile
			<form action="/profile">
				<input
					type="file"
					accept="image/*"
					className="file-input file-input-bordered file-input-primary w-full max-w-xs"
					onChange={handleChange}
				/>
				<br />
				<button
					disabled={loading || !photo}
					className="btn btn-primary"
					onClick={handleClick}
				>
					Upload Photo
				</button>
				<div className="avatar">
					<div className="avatar">
						<div className="w-24 rounded-xl">
							<img src={photoLoad} />
						</div>
					</div>
				</div>
				<br />
				<br />

				<div className="avatar">
					<h1>Current photo:</h1>
					<div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
						<img src={userData?.photoURL ? userData.photoURL : photoURL} />
					</div>
				</div>
			</form>
		</div>
	);
}

export default EditProfile;
