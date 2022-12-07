import React from "react";
import { useState } from "react";
import {
	getSubmissionById,
	updateSubmission,
} from "../../services/submission-services";
function SubmissionReview({ userData, id }) {
	const [review, setReview] = useState("");
	const [vote, setVote] = useState(1);
	const [data, setData] = useState({
		review: "",
		vote: "",
	});
	function handleOnChange(e) {
		setReview(e.target.value);
	}
	async function handleOnClick() {
		setData((prev) => ({
			...prev,
			review,
		}));
		const res = await getSubmissionById(id);
		await updateSubmission(res, data, userData.username);
	}

	return (
		<div className="card w-96 bg-neutral text-neutral-content">
			<div className="card-body">
				<textarea
					value={review}
					className="textarea textarea-primary"
					placeholder="Write your review"
					onChange={handleOnChange}
				/>
				<button className="btn btn-active btn-primary" onClick={handleOnClick}>
					Submit
				</button>
			</div>
		</div>
	);
}

export default SubmissionReview;
