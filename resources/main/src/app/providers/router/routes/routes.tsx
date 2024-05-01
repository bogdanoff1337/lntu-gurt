import { RouteProps } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { MainPage } from "@/pages/MainPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { RegisterPage } from "@/pages/RegisterPage";
import { RoomPage } from "@/pages/RoomPage";
import { RoomsPage } from "@/pages/RoomsPage";
import {
	getBookedRoutePath,
	getLoginRoutePath,
	getMainRoutePath,
	getProfileRoutePath,
	getRegisterRoutePath,
	getRoomsRoutePath,
} from "@/shared/config/routes/path";
import { BookedPage } from "@/pages/BookedPage";

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
