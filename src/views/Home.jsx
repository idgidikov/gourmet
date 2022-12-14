import React from "react";
import { getAllSubmissions } from "../services/submission-services";
import { useState, useEffect } from "react";
import SliderCard from "../components/submisions/SliderCard";

function Home() {
	const [submissions, setSubmission] = useState([]);

	useEffect(() => {
		getAllSubmissions()
			.then((result) => {
				setSubmission(result);
			})
			.catch((e) => addToast("error", e.message));
	}, []);

	return (
		<div>
			<div className="text text-center text-3xl">Welcome !</div> <br />
			<div className="flex flex-wrap justify-around">
				{submissions?.map((x) => (
					<SliderCard key={x.id} submission={x} />
				))}
			</div>
		</div>
	);
}

export default Home;
