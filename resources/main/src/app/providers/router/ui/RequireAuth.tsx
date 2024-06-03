import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { entityAuthSelectors } from "@/entities/Auth";
import { getLoginRoutePath, getMainRoutePath, getVerifyRoutePath } from "@/shared/config/routes/path";
import { Middleware } from "../routes/routes";

const useAuthNavigation = (middleware: Middleware, authData: any, location: any) => {
	if (middleware.includes(Middleware.AUTH)) {
		if (!authData) {
			return <Navigate replace state={{ from: location }} to={getLoginRoutePath()} />;
		}
		if (!middleware.includes(Middleware.NO_VERIFY) && authData && !authData.verified) {
			return <Navigate replace state={{ from: location }} to={getVerifyRoutePath()} />;
		}
	}

	if ((middleware.includes(Middleware.NO_AUTH) && authData)
      || (middleware.includes(Middleware.NO_VERIFY) && authData?.verified)) {
		return <Navigate replace state={{ from: location }} to={getMainRoutePath()} />;
	}

	return null;
};

export const RequireAuth = ({ children, middleware }: { children: ReactNode, middleware: Middleware }) => {
	const authData = useSelector(entityAuthSelectors.getData);
	const location = useLocation();

	const navigation = useAuthNavigation(middleware, authData, location);
	if (navigation) {
		return navigation;
	}

	return children;
};
