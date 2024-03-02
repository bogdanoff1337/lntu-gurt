import { RouteProps } from "react-router-dom";
import { MainPage } from "@/pages/MainPage";
import {
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
