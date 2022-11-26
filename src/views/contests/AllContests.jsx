import React from "react";
import { useState, useEffect } from "react";
import { getAllContests } from "../../services/contests-services";
import ContestCard from "../../components/contests/ContestCard";
function AllContests() {
	const [contests, setContests] = useState([]);

	useEffect(() => {
		getAllContests()
			.then((result) => setContests(result))
			.catch((e) => addToast("error", e.message));
	}, []);

	return (
		<div>
			<div className="flex flex-wrap justify-around">
				{contests.map((c) => (
					<ContestCard key={c.id} contest={c} />
				))}
			</div>
		</div>
	);
}

export default AllContests;
