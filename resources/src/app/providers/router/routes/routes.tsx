import { RouteProps } from "react-router-dom";
import { FacultiesPage } from "@/pages/FacultiesPage";
import { MainPage } from "@/pages/MainPage";
import {
	getFacultiesRoutePath,
	getMainRoutePath,
} from "@/shared/config/routes/path";

export type AppRouteProps = RouteProps & {
	auth?: string;
};

export const routes: AppRouteProps[] = [
	{
		path: getMainRoutePath(),
		element: <MainPage />,
		auth: "only",
	},
];
