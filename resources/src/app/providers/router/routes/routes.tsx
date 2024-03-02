import { RouteProps } from "react-router-dom";
import { BabyCarriageDetailsPage } from "@/pages/BabyCarriageDetailsPage";
import { BabyCarriagePage } from "@/pages/BabyCarriagePage";
import { LoginPage } from "@/pages/LoginPage";
import { MainPage } from "@/pages/MainPage";
import { RegisterPage } from "@/pages/RegisterPage";
import {
	getBabyCarriageRoutePath, getLoginRoutePath, getMainRoutePath, getRegisterRoutePath,
} from "@/shared/config/routes/path";

export type AppRouteProps = RouteProps & {
	nonAuthOnly?: boolean;
	auth?: string;
};

export const routes: AppRouteProps[] = [
	{
		path: getLoginRoutePath(),
		element: <LoginPage />,
		auth: "already",
	},
	{
		path: getRegisterRoutePath(),
		element: <RegisterPage />,
		auth: "already",
	},
	{
		path: getMainRoutePath(),
		element: <MainPage />,
		auth: "only",
	},
	{
		path: getBabyCarriageRoutePath(),
		element: <BabyCarriagePage />,
		auth: "only",
	},

	{
		path: getBabyCarriageRoutePath(":id"),
		element: <BabyCarriageDetailsPage />,
		auth: "only",
	},
];
