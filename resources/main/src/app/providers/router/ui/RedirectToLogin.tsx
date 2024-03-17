import { Navigate, useLocation } from "react-router-dom";
import { getLoginRoutePath } from "@/shared/config/routes/path";

export const RedirectToLogin = () => {
	const location = useLocation();
	return <Navigate replace state={{ from: location }} to={getLoginRoutePath()} />;
};
