import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
// import { getUserAuthData } from "@/entities/User";
import { entityAuthSelectors } from "@/entities/Auth";
import { getLoginRoutePath, getMainRoutePath } from "@/shared/config/routes/path";
import { Middleware } from "../routes/routes";

export const RequireAuth = ({ children, middleware }: { children: ReactNode, middleware: Middleware }) => {
	const authData = useSelector(entityAuthSelectors.getData);
	const location = useLocation();

	if (middleware === Middleware.AUTH && !authData) {
		return <Navigate replace state={{ from: location }} to={getLoginRoutePath()} />;
	}

	if (middleware === Middleware.NO_AUTH && authData) {
		return <Navigate replace state={{ from: location }} to={getMainRoutePath()} />;
	}

	return children;
};
