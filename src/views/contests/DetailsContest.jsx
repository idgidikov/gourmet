import React from "react";
import { useState, useEffect } from "react";
import { getContesById } from "../../services/contests-services";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { useParams } from "react-router-dom";
import SubmissionForm from "../submissions/SubmisionForm";
import SubmissionsByContest from "../submissions/SubmissionsByContest";
import { getSubmissionsByContest } from "../../services/submission-services";
import { userRole } from "../../common/enums/user-role.enum";
import { contestPhases } from "../../common/enums/contest.enum";

function DetailsContest() {
	const { addToast, setAppState, ...appState } = useContext(AppContext);
	const { userData } = appState;
	const { contestId } = useParams();
	const [contest, setContest] = useState({
		title: "",
		category: "",
		startPhaseOne: "",
		startPhaseTwo: "",
		startPhaseThree: "",
		phaseStatus: 0,
		id: "",
		url: "",
	});
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		getContesById(contestId)
			.then((result) => {
				setContest((contest) => ({
					...contest,
					title: result.title,
					category: result.category,
					url: result.url,
					phaseStatus: result.phaseStatus,
					id: contestId,
				}));
			})
			.catch((e) => addToast("error", e.message));
	}, [contestId]);

	useEffect(() => {
		getSubmissionsByContest(contestId)
			.then((result) => setPhotos(result))
			.catch((e) => addToast("error", e.message));
	}, [contestId]);

	return (
		<div>
			<div className="card lg:card-side bg-base-100 shadow-xl">
				<figure>
					<img src={contest.url} className="h-[350px]" alt="Album" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">{contest.title}</h2>
					<p>{contest.category}</p>
				</div>
			</div>
			{contest.phaseStatus === contestPhases.PHASE_ONE &&
				userData.role === userRole.PHOTO_JUNKIES && (
					<SubmissionForm contestId={contestId} />
				)}
			<SubmissionsByContest photos={photos} phaseStatus={contest.phaseStatus} />
		</div>
	);
}

export default DetailsContest;
