import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
// import { getUserAuthData } from "@/entities/User";
import { userSelectors } from "@/entities/User";
import { getLoginRoutePath, getMainRoutePath } from "@/shared/config/routes/path";

export const RequireAuth = ({ children, auth }: { children: ReactNode, auth?: string }) => {
	const authData = useSelector(userSelectors.getAuthData);
	const location = useLocation();

	if (!authData && auth === "only") {
		return <Navigate replace state={{ from: location }} to={getLoginRoutePath()} />;
	}

	if (authData && auth === "already") {
		return <Navigate replace state={{ from: location }} to={getMainRoutePath()} />;
	}

	return children;
};
