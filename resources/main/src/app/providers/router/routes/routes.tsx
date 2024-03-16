import { RouteProps } from "react-router-dom";
import { MainPage } from "@/pages/MainPage";
import { RoomsPage } from "@/pages/RoomsPage";
import {
	getBookRoutePath,
	getMainRoutePath,
	getRoomsRoutePath,
} from "@/shared/config/routes/path";
import { RoomPage } from "@/pages/RoomPage";
import { BookRoomPage } from "@/pages/BookRoomPage";

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
	{
		path: getRoomsRoutePath(":id"),
		element: <RoomPage />,
	},
	{
		path: getBookRoutePath(":id"),
		element: <BookRoomPage />,
	},
];
