import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";
import { fetchDormitories } from "../services/fetchDormitories/fetchDormitories";
import { DormitorySchema, Dormitory, DormitoryData } from "../types/DormitorySchema";

export const dormitoriesAdapter = createEntityAdapter({
	selectId: (gurt: Dormitory) => gurt.id,
});

export const getTormitories = dormitoriesAdapter.getSelectors<StateSchema>(
	(state) => state.dormitories || dormitoriesAdapter.getInitialState(),
);

export const dormitoriesSlice = createSlice({
	name: "dormitoriesSlice",
	initialState: dormitoriesAdapter.getInitialState<DormitorySchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDormitories.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchDormitories.fulfilled, (
				state,
				action: PayloadAction<DormitoryData>,
			) => {
				state.isLoading = false;
				dormitoriesAdapter.setAll(state, action.payload);
			})
			.addCase(fetchDormitories.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const {
	reducer: dormitoriesReducer,
	actions: dormitoriesActions,
} = dormitoriesSlice;
