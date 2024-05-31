import { Suspense, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "@/shared/ui/PageLoader";
import { AppRouteProps, routes } from "../../routes/routes";
import { RequireAuth } from "../RequireAuth";

const AppRouter = () => {
	const RouteItems = useMemo(() => {
		return routes.map((route: AppRouteProps) => {
			const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;

			return (
				<Route
					element={<RequireAuth middleware={route.middleware}>{element}</RequireAuth>}
					key={route.path}
					path={route.path}
				/>
			);
		});
	}, []);

	return (
		<Routes>{RouteItems}</Routes>
	);
};

export default AppRouter;
