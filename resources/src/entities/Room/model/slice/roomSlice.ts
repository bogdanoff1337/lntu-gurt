import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRooms } from "../..";
import { RoomData, RoomSchema } from "../types/Room";

const initialState: RoomSchema = {
};

export const roomSlice = createSlice({
	name: "roomSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRooms.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchRooms.fulfilled, (
				state,
				action: PayloadAction<RoomData>,
			) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(fetchRooms.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});
