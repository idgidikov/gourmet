import React from "react";
import { useState, useEffect } from "react";
import { getContesById } from "../../services/contests-services";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { useParams } from "react-router-dom";
import SubmissionForm from "../submissions/SubmissionForm";
import SubmissionsByContest from "../submissions/SubmissionsByContest";
import { getSubmissionsByContest } from "../../services/submission-services";
import { userRole } from "../../common/enums/user-role.enum";
import { getMySubmission } from "../../services/users.services";
import { contestPhases } from "../../common/enums/contest.enum";
import SubMenuContests from "../../components/contests/SubMenuContests";

function DetailsContest() {
	const { addToast, ...appState } = useContext(AppContext);
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
	const [mySubmissions, setMySubmissions] = useState();

	useEffect(() => {
		getContesById(contestId)
			.then((result) => {
				setContest((contest) => ({
					...contest,
					title: result.title,
					category: result.category,
					url: result.url,
					phaseStatus: result.phaseStatus,
					submissions: result.submissions,
					id: contestId,
				}));
			})
			.catch((e) => addToast("error", e.message));
		getSubmissionsByContest(contestId)
			.then((result) => {
				setPhotos(result);
			})
			.catch((e) => addToast("error", e.message));
		getMySubmission(contestId, userData.username)
			.then((result) => setMySubmissions(result))
			.catch((e) => addToast("error", e.message));
	}, [contestId]);

	return (
		<div>
			<SubMenuContests />
				<div className="flex items-center justify-center">
					<img className="w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={contest.url} alt="Cover-contest" />
				</div>
					<div className="flex items-center justify-center">
						<h2 className="text-3xl">Title: {contest.title}</h2>
					</div>
					<div className="flex items-center justify-center">
						<p className="text-xl">Category: {contest.category}</p>
					</div>
				
			{mySubmissions && userData?.role === userRole.PHOTO_JUNKIES && (
				<div>
					<p>{mySubmissions.title}</p>
					<img src={mySubmissions.url} />
				</div>
			)}
			{!mySubmissions &&
				userData?.role == userRole.PHOTO_JUNKIES &&
				contest.phaseStatus !== contestPhases.PHASE_THREE && (
					<SubmissionForm contestId={contest.id} />
				)}

			{contest.phaseStatus === contestPhases.PHASE_ONE &&
				userData?.role === userRole.ORGANIZER && (
					<SubmissionsByContest
						photos={photos}
						phaseStatus={contest.phaseStatus}
					/>
				)}
			{contest.phaseStatus === contestPhases.PHASE_TWO &&
				userData?.role === userRole.ORGANIZER && (
					<SubmissionsByContest
						photos={photos}
						phaseStatus={contest.phaseStatus}
					/>
				)}
		</div>
	);
}

export default DetailsContest;
