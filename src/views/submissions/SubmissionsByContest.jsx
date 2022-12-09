import React from "react";
import SubmissionCard from "../../components/submisions/SubmissionCard";

function SubmissionsByContest({ photos, phaseStatus }) {
	return (
		<div>
			<h2 className="title">All Submissions</h2>
			<div className="flex flex-wrap justify-around">
				{photos?.map((x) => (
					<SubmissionCard key={x.id} submission={x} phaseStatus={phaseStatus} />
				))}
			</div>
		</div>
	);
}
export default SubmissionsByContest;
