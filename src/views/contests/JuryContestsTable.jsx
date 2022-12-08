import React from "react";
import JuryContestRow from "../../components/contests/JuryContestRow";
import { useState, useEffect } from "react";
import { getJuryUsers } from "../../services/users.services";

function JuryContestsTable({ contestId }) {
	const [jury, setJury] = useState([]);

	useEffect(() => {
		getJuryUsers()
			.then((result) => setJury(result))
			.catch((error) => addToast("error", error.message));
	}, [contestId]);

	return (
		<div>
			<div className="overflow-x-auto w-full">
				<table className="table w-full">
					<thead>
						<tr>
							<th />

							<th>Name</th>
							<th>Role</th>
						</tr>
					</thead>

					<tbody>
						{jury.map((el) => (
							<JuryContestRow key={el.uid} object={el} contestId={contestId} />
						))}
					</tbody>

					<tfoot>
						<tr />
					</tfoot>
				</table>
			</div>
		</div>
	);
}

export default JuryContestsTable;
