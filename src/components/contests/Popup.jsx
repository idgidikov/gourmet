import React from "react";
import JuryContestsTable from "../../views/contests/JuryContestsTable";

function Popup({ contestId }) {
	return (
		<div>
			<label htmlFor="my-modal-5" className="btn btn-primary">
				Invite as Jury
			</label>
			<input type="checkbox" id="my-modal-5" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box w-11/12 max-w-5xl">
					<JuryContestsTable contestId={contestId} />
					<div className="modal-action">
						<label htmlFor="my-modal-5" className="btn">
							Close
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Popup;
