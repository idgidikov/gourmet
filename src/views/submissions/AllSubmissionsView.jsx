import React from "react";
import { useState, useEffect } from "react";
import { getAllSubmissions } from "../../services/submission-services";
import SubmissionCard from "../../components/submisions/SubmissionCard";

function AllSubmissions() {
	const [submissions, setSubmissions] = useState([]);

	useEffect(() => {
		getAllSubmissions()
			.then((result) => {
				setSubmissions(result);
			})
			.catch((e) => addToast("error", e.message));
	}, []);

	return (
		<div>
			<div className="flex flex-wrap justify-around">
				{submissions?.map((x) => (
					<SubmissionCard key={x.id} submission={x} />
				))}
			</div>
		</div>
	);
}
export default AllSubmissions;
