import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFaculties } from "../services/fetchFaculties";
import { FacultiesSchema, Faculty } from "../types/FacultiesSchema";

const initialState: FacultiesSchema = {
};

export const facultiesSlice = createSlice({
	name: "facultiesSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFaculties.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchFaculties.fulfilled, (
				state,
				action: PayloadAction<any>,
			) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(fetchFaculties.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});
