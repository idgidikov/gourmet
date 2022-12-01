import { ref, push, get, update } from "firebase/database";
import { db } from "../firebase/config";

export const createSubmission = async (
	title,
	description,
	url,
	contestId,
	username
) => {
	const submissionObj = {
		title,
		description,
		url,
		contestId,
		username,
		addedOn: Date.now(),
	};
	const { key } = await push(ref(db, "submissions"), submissionObj);

	return update(ref(db), {
		[`users/${username}/submissions/${key}`]: true,
		[`contests/${contestId}/submissions/${key}`]: true,
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

export const getSubmissionsByContest = async (contestId) => {
	const snapshot = await get(ref(db, `contests/${contestId}/submissions`));

	if (!snapshot.exists()) {
		return [];
	}

	const submissions = Object.keys(snapshot.val()).map(getSubmissionById);
	return Promise.all(submissions);
};
