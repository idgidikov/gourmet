import {
	ref,
	push,
	get,
	set,
	update,
	remove,
	query,
	equalTo,
	orderByChild,
	orderByKey,
	limitToFirst,
	startAt,
} from "firebase/database";
import { db, storage } from "../firebase/config";
import { getContestPhase } from "../helpers/contests-helpers";

// https://codetheweb.blog/javascript-dates-and-times/
export const createContest = async ({
	title,
	category,
	startPhaseOne,
	startPhaseTwo,
	startPhaseThree,
	url,
}) => {
	const contestObj = {
		title,
		category,
		startPhaseOne: startPhaseOne.getTime(),
		startPhaseTwo: startPhaseTwo.getTime(),
		startPhaseThree: startPhaseThree.getTime(),
		url,
		addedOn: Date.now(),
	};

	const result = await push(ref(db, "contests"), contestObj);
	return result;
};

export const getAllContests = async () => {
	const result = await get(ref(db, "contests"));
	if (!result.exists()) {
		return [];
	}
	console.log(Object.entries(result.val()));

	return Object.entries(result.val())
		.map(([key, value]) => ({
			...value,
			id: key,
		}))
		.map(getContestPhase);
};
