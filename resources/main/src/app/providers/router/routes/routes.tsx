import { RouteProps } from "react-router-dom";
import { BookRoomPage } from "@/pages/BookRoomPage";
import { LoginPage } from "@/pages/LoginPage";
import { MainPage } from "@/pages/MainPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { RoomPage } from "@/pages/RoomPage";
import { RoomsPage } from "@/pages/RoomsPage";
import {
	getBookRoutePath,
	getLoginRoutePath,
	getMainRoutePath,
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
		path: getBookRoutePath(":id"),
		element: <BookRoomPage />,
		middleware: Middleware.AUTH,
	},
];
