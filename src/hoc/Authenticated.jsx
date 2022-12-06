import { Navigate, useLocation } from "react-router-dom";

function Authenticated({ children, user, loading }) {
	const location = useLocation();

	if (!loading && !user)
		return <Navigate to="/login" state={{ from: location }} />;

	return children;
}

export default Authenticated;
