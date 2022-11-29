import React from "react";
import { useNavigate } from "react-router-dom";

function SubmissionCard({ submission }) {
	const navigate = useNavigate();

	const showSubmission = () => {
		navigate(`/submission/${submission.id}`);
	};

	return (
		<div>
			<div className="card w-96 bg-base-100 shadow-xl">
				<figure>
					<img src={submission.url} alt="photo" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">
						{submission.title} <br />
						{submission.description}
					</h2>
				</div>
				<div className="btn btn-primary" onClick={showSubmission}>
					click
				</div>
			</div>
		</div>
	);
}

export default SubmissionCard;
