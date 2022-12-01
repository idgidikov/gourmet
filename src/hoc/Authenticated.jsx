import { Navigate, useLocation } from "react-router-dom";

function Authenticated({ children, user }) {
	const location = useLocation();

	if (!user) return <Navigate to="/login" state={{ from: location }} />;

	return children;
}

export default Authenticated;
