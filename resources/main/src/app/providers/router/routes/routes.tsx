import { RouteProps } from "react-router-dom";
import { MainPage } from "@/pages/MainPage";
import { RoomsPage } from "@/pages/RoomsPage";

import {
	getMainRoutePath,
	getRoomsRoutePath
} from "@/shared/config/routes/path";

export type AppRouteProps = RouteProps & {
	auth?: string;
};

export const routes: AppRouteProps[] = [
	{
		path: getMainRoutePath(),
		element: <MainPage />,
	},
	{
		path: getRoomsRoutePath(),
		element: <RoomsPage />,
	},
];
