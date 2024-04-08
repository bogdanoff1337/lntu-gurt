import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import LogoutIcon from "../../assets/logout.svg?react";
import RoomIcon from "../../assets/room.svg?react";
import ProfileIcon from "../../assets/user.svg?react";
import { EntityMenuSchema } from "../types/EntityMenuSchema";

const initialState: EntityMenuSchema = {
	data: [
		{
			Icon: ProfileIcon,
			name: "Профіль",
		},
		{
			Icon: RoomIcon,
			name: "Заброньована кімната",
			is: false,
		},
		{
			Icon: LogoutIcon,
			name: "Вийти",
		},
	],
};

export const entityMenuSlice = createSliceWithThunk({
	name: "entityMenu",
	initialState,
	reducers: (create) => ({

	}),
});

export const { actions: entityRoomActions, reducer: entityRoomReducer } = entityMenuSlice;
