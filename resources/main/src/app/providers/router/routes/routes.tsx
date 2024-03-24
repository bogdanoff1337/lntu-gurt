import { RouteProps } from "react-router-dom";
import { BookRoomPage } from "@/pages/BookRoomPage";
import { MainPage } from "@/pages/MainPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { RoomPage } from "@/pages/RoomPage";
import { RoomsPage } from "@/pages/RoomsPage";
import {
	getBookRoutePath,
	getMainRoutePath,
	getRegisterRoutePath,
	getRoomsRoutePath,
} from "@/shared/config/routes/path";

export type AppRouteProps = RouteProps & {
	auth?: string;
};

export const routes: AppRouteProps[] = [
	{
		path: "*",
		// element: <MainPage />,
	},
	{
		path: getRegisterRoutePath(),
		element: <RegisterPage />,
	},
	{
		path: getMainRoutePath(),
		element: <MainPage />,
	},
	{
		path: getRoomsRoutePath(),
		element: <RoomsPage />,
	},
	{
		path: getRoomsRoutePath(":id"),
		element: <RoomPage />,
	},
	{
		path: getBookRoutePath(":id"),
		element: <BookRoomPage />,
	},
];
