import React from "react";
import { useState, useEffect } from "react";
import { getSubmissionsByContest } from "../../services/submission-services";
import SubmissionCard from "../../components/submisions/SubmissionCard";

function SubmissionsByContest({ photos, phaseStatus }) {
	return (
		<div>
			<div className="flex flex-wrap justify-around">
				{photos?.map((x) => (
					<SubmissionCard key={x.id} submission={x} phaseStatus={phaseStatus} />
				))}
			</div>
		</div>
	);
}
export default SubmissionsByContest;
