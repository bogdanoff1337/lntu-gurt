import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { entityAuthSelectors } from "@/entities/Auth";
import { getLoginRoutePath, getMainRoutePath, getNonActiveRoutePath } from "@/shared/config/routes/path";
import { Middleware } from "../routes/routes";

export const RequireAuth = ({ children, middleware }: { children: ReactNode, middleware: Middleware }) => {
	const authData = useSelector(entityAuthSelectors.getData);
	const location = useLocation();

	if (middleware.includes(Middleware.AUTH) && !authData) {
		return <Navigate replace state={{ from: location }} to={getLoginRoutePath()} />;
	} else if (middleware.includes(Middleware.AUTH) && !middleware.includes(Middleware.NO_VERIFY) && authData && !authData.verified) {
		return <Navigate replace state={{ from: location }} to={getNonActiveRoutePath()} />;
	} else if (middleware.includes(Middleware.NO_AUTH) && authData
	|| middleware.includes(Middleware.NO_VERIFY) && authData && authData?.verified) {
		return <Navigate replace state={{ from: location }} to={getMainRoutePath()} />;
	}

	return children;
};
