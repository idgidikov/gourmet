import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { getContestByUsername } from "../../services/contests-services";
import MyContestRow from "../../components/contests/MyContestRow";

function MyContests() {
	const { addToast, ...appState } = useContext(AppContext);
	const { userData } = appState;
	const [myContests, setMyContests] = useState([]);

	useEffect(() => {
		getContestByUsername(userData?.username)
			.then((result) => setMyContests(result))
			.catch((error) => addToast("error", error.message));
	}, [userData?.username]);

	return (
		<div className="overflow-x-auto w-full">
			<table className="table w-full">
				<thead>
					<tr>
						<th>
							<button className="btn btn-success btn-xs">My contests</button>
						</th>
						<th>
							<button className="btn btn-success btn-xs">Title</button>
						</th>
						<th>
							<button className="btn btn-success btn-xs">Category</button>
						</th>
						<th>
							<button className="btn btn-success btn-xs">Phase</button>
						</th>
					</tr>
				</thead>
				<tbody>
					{myContests.map((contest) => (
						<MyContestRow key={contest.contestId} contest={contest} />
					))}
				</tbody>
			</table>
		</div>
	);
}

export default MyContests;
