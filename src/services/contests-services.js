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

// https://codetheweb.blog/javascript-dates-and-times/
export const createContest = async ({
	title,
	category,
	startDate,
	endDate,
	phaseTwo,
	url,
}) => {
	const contestObj = {
		title,
		category,
		startDate: startDate.getTime(),
		endDate: endDate.getTime(),
		phaseTwo: phaseTwo.getTime(),
		url,
		addedOn: Date.now(),
	};
	const result = await push(ref(db, "contests"), contestObj);
	return result;
};
