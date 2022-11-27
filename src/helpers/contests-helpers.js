export const getContestPhase = (obj) => {
	if (obj.startPhaseOne < Date.now()) {
		obj.phaseStatus = 0;
	} else if (obj.startPhaseOne >= Date.now()) {
		obj.phaseStatus = 1;
	} else if (obj.setStartPhaseTwo >= Date.now()) {
		obj.phaseStatus = 2;
	} else if (obj.setStartPhaseTwo >= Date.now()) {
		obj.phaseStatus = 3;
	}
	return obj;
};
