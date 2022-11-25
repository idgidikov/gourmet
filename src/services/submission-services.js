import { ref, push, get, update } from "firebase/database";
import { db } from "../firebase/config";

export const createSubmission = async (title, description, url) => {
	const sub = { title, description, url, addedOn: Date.now() };
	const result = await push(ref(db, "submission"), sub);

	return result;
};
