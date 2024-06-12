import { PayloadAction } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { ResponseData, EntityCitiesSchema } from "../types/EntityCitiesSchema";

const initialState: EntityCitiesSchema = {
	data: undefined,
	isLoading: false,
	error: undefined,
};

export const entityCitiesSlice = createSliceWithThunk({
	name: "entityCities",
	initialState,
	reducers: (create) => ({
		// example: create.reducer((state, action: PayloadAction<boolean>) => {
		// }),

		getCities: create.asyncThunk<ResponseData, { search: string }, ThunkConfig<string>>(
			async ({ search }, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.get<ResponseData>("cities", {
						params: {
							search,
						},
					});

					return response.data;
				} catch (error: any) {
					return rejectWithValue(error.response.data);
				}
			},
			{
				pending: (state) => {
					state.isLoading = true;
				},
				fulfilled: (state, action) => {
					state.isLoading = false;
					state.error = undefined;
				},
				rejected: (state, action: any) => {
					state.isLoading = false;
					state.error = action.payload;
				},
			},
		),
	}),
});

export const { actions: entityCitiesActions } = entityCitiesSlice;
