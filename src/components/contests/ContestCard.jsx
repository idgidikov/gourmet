import React from "react";
import useCountdown from "./CountDown";
function ContestCard({ contest }) {
	const [timeLeft, setEndTime] = useCountdown(contest.endDate);

	const hours = Math.floor(timeLeft / 600000) % 24;
	const minutes = Math.floor(timeLeft / 60000) % 60;
	const seconds = Math.floor(timeLeft / 1000) % 60;

	return (
		<div>
			<div className="card w-96 bg-base-100 shadow-xl">
				<figure>
					<img src={contest.url} alt="Shoes" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">
						{contest.title}
						<div className="badge badge-secondary">NEW</div>
					</h2>
					<p>{contest.category}</p>
					<div className="card-actions justify-end">
						<div className="badge badge-outline">{`${hours}:${minutes}:${seconds}`}</div>
						<div className="badge badge-outline">{contest.startDate}</div>
					</div>
					``
				</div>
			</div>
		</div>
	);
}

export default ContestCard;
