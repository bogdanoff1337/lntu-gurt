import { RouteProps } from "react-router-dom";
import { BookedPage } from "@/pages/BookedPage";
import { LoginPage } from "@/pages/LoginPage";
import { MainPage } from "@/pages/MainPage";
import { NonActivePage } from "@/pages/NonActivePage";
import { ProfilePage } from "@/pages/ProfilePage";
import { RegisterPage } from "@/pages/RegisterPage";
import { RoomPage } from "@/pages/RoomPage";
import { RoomsPage } from "@/pages/RoomsPage";
import {
	getBookedRoutePath,
	getLoginRoutePath,
	getMainRoutePath,
	getNonActiveRoutePath,
	getProfileRoutePath,
	getRegisterRoutePath,
	getRoomsRoutePath,
} from "@/shared/config/routes/path";

export type AppRouteProps = RouteProps & {
	middleware: Middleware
};

export enum Middleware {
	AUTH = "auth",
	NO_AUTH = "noAuth",
}

export const routes: AppRouteProps[] = [
	// {
	// 	path: "*",
	// 	// element: <MainPage />,
	// },
	{
		path: getRegisterRoutePath(),
		element: <RegisterPage />,
		middleware: Middleware.NO_AUTH,
	},
	{
		path: getNonActiveRoutePath(),
		element: <NonActivePage />,
		middleware: Middleware.AUTH,
	},
	{
		path: getLoginRoutePath(),
		element: <LoginPage />,
		middleware: Middleware.NO_AUTH,

	},
	{
		path: getMainRoutePath(),
		element: <MainPage />,
		middleware: Middleware.AUTH,

	},
	{
		path: getRoomsRoutePath(),
		element: <RoomsPage />,
		middleware: Middleware.AUTH,
	},
	{
		path: getRoomsRoutePath(":id"),
		element: <RoomPage />,
		middleware: Middleware.AUTH,
	},
	{
		path: getProfileRoutePath(),
		element: <ProfilePage />,
		middleware: Middleware.AUTH,
	},
	{
		path: getBookedRoutePath(),
		element: <BookedPage />,
		middleware: Middleware.AUTH,
	},
];
