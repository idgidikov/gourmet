import React from "react";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubmissionReview from "../../components/submisions/SubmissionReview";
import { AppContext } from "../../context/app.context";
import { getSubmissionById } from "../../services/submission-services";

function SubmissionDetails() {
	const { addToast, userData } = useContext(AppContext);
	const { submissionId } = useParams();

	//console.log(userData)
	const [submission, setSubmission] = useState({
		submission: null,
		username: "",
		title: "",
		description: "",
		url: "",
		id: "",
		votes: null,
	});

	useEffect(() => {
		getSubmissionById(submissionId)
			.then((sub) => {
				setSubmission((state) => ({
					...state,
					username: sub.username,
					title: sub.title,
					description: sub.description,
					url: sub.url,
					id: submissionId,
					votes: sub.votes || null,
				}));
			})
			.catch((e) => addToast("error", e.message));
	}, [submissionId]);

	return (
		<section className="">
			<div className="container px-6 py-10 mx-auto">
				<h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
					{submission?.title}
				</h1>

				<div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
					<img
						className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
						src={submission?.url}
						alt=""
					/>

					<div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
						<p className="block mt-4 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
							{submission?.description}
						</p>

						<div className="flex items-center mt-6">
							<img
								className="object-cover object-center w-10 h-10 rounded-full"
								src="https://i.pinimg.com/236x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
								alt="photo"
							/>

							<div className="mx-4">
								<h1 className="text-sm text-gray-700 dark:text-gray-200">
									{submission?.username}
								</h1>
							</div>
						</div>
					</div>
				</div>

				{submission.votes ? null : (
					<SubmissionReview userData={userData} id={submissionId} />
				)}
			</div>

			<div className="comments ml-24">
				<p>Reviews will be here </p>
			</div>
		</section>
	);
}

export default SubmissionDetails;
