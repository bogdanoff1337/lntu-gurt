import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { RoomData } from "../types/Room";

export const fetchRooms = createAsyncThunk<RoomData, void, ThunkConfig<string>>(
	"page/fetchRooms",
	async (_, thunkApi) => {
		const { extra, rejectWithValue } = thunkApi;

		try {
			const response = await extra.api.get<RoomData>("/room");

			if (!response.data) {
				throw new Error();
			}

			console.log(response.data);
			return response.data;
		} catch (e) {
			return rejectWithValue("error");
		}
	},
);
