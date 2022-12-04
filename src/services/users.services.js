import {
	ref,
	push,
	get,
	set,
	update,
	query,
	equalTo,
	orderByChild,
	orderByKey,
} from "firebase/database";
import { db, storage } from "../firebase/config";
import { userRole } from "../common/enums/user-role.enum";
import { getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { ref as sRef } from "firebase/storage";
import { v4 } from "uuid";

export const getUser = async (username) => {
	const snapshot = await get(ref(db, `users/${username}`));

	return snapshot.val();
};

export const getUserById = async (uid) => {
	const snapshot = await get(
		query(ref(db, "users"), orderByChild("uid"), equalTo(uid))
	);
	const value = snapshot.val();
	if (value !== null) {
		const key = Object.keys(value)[0];
		const userData = value[key];

		return userData;
	}
	return value;
};

export const createUser = async (
	uid,
	username,
	email,
	firstName,
	lastName,
	role = userRole.PHOTO_JUNKIES
) => {
	const user = await getUser(username);

	if (user !== null)
		throw new Error(`User with username ${username} already exists!`);

	const userData = {
		uid,
		username,
		role,
		email,
		firstName,
		lastName,
		registeredOn: Date.now(),
	};

	await set(ref(db, `users/${username}`), userData);

	return { ...userData };
};

export const updateProfilePic = async (url, userData) => {
	await update(ref(db), {
		[`users/${userData.username}/photoURL`]: url,
	});
};

export const setLoadingProfPic = async (
	loadingPic,
	setPhotoLoad,
	setImageRef
) => {
	const imageRef = sRef(storage, `loadingProfPics/${v4()}`);

	const file = loadingPic;
	try {
		const result = await uploadBytes(imageRef, file);
		const url = await getDownloadURL(result.ref);
		setPhotoLoad(url);
		setImageRef(imageRef);
	} catch (err) {
		console.log("error", err.message);
	}
};

export const updateLoadPic = async (imageRef) => {
	const result = await deleteObject(imageRef);
};
