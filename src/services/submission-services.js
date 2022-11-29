import { ref, push, get, update } from "firebase/database";
import { db } from "../firebase/config";

export const createSubmission = async (title, description, url, username) => {
	const submissionObj = {
		title,
		description,
		url,
		username,
		addedOn: Date.now(),
	};
	const { key } = await push(ref(db, "submissions"), submissionObj);

	return update(ref(db), {
		[`users/${username}/createdSubmissions/${key}`]: true,
	});
};

export const getSubmissionById = async (id) => {
	const snapshot = await get(ref(db, `submissions/${id}`));
	if (!snapshot.exists()) throw new Error("Content doesn't exist!");

	return {
		...snapshot.val(),
		id,
	};
};

export const getAllSubmissions = async () => {
	const snapshot = await get(ref(db, "submissions"));

	if (!snapshot.exists()) {
		return [];
	}

	return Object.keys(snapshot.val()).map((key) => ({
		...snapshot.val()[key],
		id: key,
	}));
};
