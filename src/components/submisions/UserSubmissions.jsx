import React from "react";
import { getSubmissionsByContest } from "../../services/submission-services";
import SubmissionCard from "./SubmissionCard";

function UserSubmissions() {
	const [userSubmissions, setSubmissions] = useState([]);

	return (
		<div>
			<SubmissionCard />
		</div>
	);
}
