import React from "react";
import Star from "./Star";
function VoteCard({ vote }) {
	console.log(vote);
	return (
		<div>
			<div className="card w-95 bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title">{vote.id}</h2>
					<p>{vote.comment}</p>
					<div className="card-actions justify-end">
						<button className="btn btn-primary">
							{[...Array(vote.vote)].map((e, i) => (
								<Star key={i} />
							))}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VoteCard;
