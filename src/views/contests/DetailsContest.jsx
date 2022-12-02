import React from "react";
import { useState, useEffect } from "react";
import { getContesById } from "../../services/contests-services";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SubmissionForm from "../submissions/SubmissionForm";
import SubmissionsByContest from "../submissions/SubmissionsByContest";
import { getSubmissionsByContest } from "../../services/submission-services";

function DetailsContest() {
	const { addToast } = useContext(AppContext);
	const { contestId } = useParams();
	const [contest, setContest] = useState({
		title: "",
		category: "",
		startPhaseOne: "",
		startPhaseTwo: "",
		startPhaseThree: "",
		id: "",
		url: "",
	});
	const [photos, setPhotos] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getContesById(contestId)
			.then((result) => {
				console.log(result);
				setContest((contest) => ({
					...contest,
					title: result.title,
					category: result.category,
					url: result.url,
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
					<div className="card-actions justify-end">
						<button
							className="btn btn-primary"
							onClick={() => navigate("/sub")}
						>
							Apply photo
						</button>
					</div>
				</div>
			</div>
			<SubmissionForm contestId={contestId} />
			<SubmissionsByContest photos={photos} />
		</div>
	);
}

export default DetailsContest;
