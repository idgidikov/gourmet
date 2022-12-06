import {
	ref,
	get,
	set,
	update,
	query,
	equalTo,
	orderByChild,
} from "firebase/database";
import { db } from "../firebase/config";
import { userRole } from "../common/enums/user-role.enum";
import { getImage } from "../helpers/my-photos-helpers";

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
	phone,
	role = userRole.PHOTO_JUNKIES
) => {
	const user = await getUser(username);

	if (user !== null)
		throw new Error(`User with username ${username} already exists!`);

	const userPhone = await getUserByPhone(phone);

	if (userPhone !== null)
		throw new Error(`Phone number ${phone} has already been registered!`);

	const userData = {
		uid,
		username,
		role,
		email,
		firstName,
		lastName,
		phone,
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

export const getMyPhotos = async (username) => {
	const snapshot = await get(ref(db, `users/${username}/my-pictures`));
	if (!snapshot.exists()) {
		return [];
	}
	const urls = Object.values(snapshot.val());
	return Promise.all(urls.map((e) => getImage(e)));
};

export const getUserByPhone = async (phone) => {
	const snapshot = await get(
		query(ref(db, "users"), orderByChild("phone"), equalTo(phone))
	);

	return snapshot.val();
};
export const getAllPhotoJunkies = async () => {
	const snapshot = await get(ref(db, "users"));

	if (!snapshot.exists()) {
		return [];
	}

	return Object.keys(snapshot.val())
		.map((key) => ({
			...snapshot.val()[key],
			id: key,
		}))
		.filter((x) => x.role === userRole.PHOTO_JUNKIES);
};
