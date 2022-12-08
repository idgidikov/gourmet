import React from "react";
import { contestPhases } from "../../common/enums/contest.enum";
import Popup from "./Popup";

function MyContestRow({ contest, objects }) {
	return (
		<tr>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img src={contest?.url} alt="Avatar Tailwind CSS Component" />
						</div>
					</div>
				</div>
			</td>
			<td>
				{contest?.title}
				<br />
				{/* <span className="badge badge-ghost badge-sm">register on:{date}</span> */}
			</td>
			<td>{contest?.category}</td>
			<td>
				{contest?.phaseStatus === contestPhases.UPCOMING && "Upcoming"}
				{contest?.phaseStatus === contestPhases.PHASE_ONE && "Open"}
				{contest?.phaseStatus === contestPhases.PHASE_TWO && "Voting"}
				{contest?.phaseStatus === contestPhases.PHASE_THREE && "Finished"}
			</td>

			<th>
				{contest?.phaseStatus === contestPhases.PHASE_ONE && (
					<Popup objects={objects} contestId={contest.contestId} />
				)}
			</th>
		</tr>
	);
}

export default MyContestRow;
