import { PayloadAction } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { EntityRoomsSchema, RoomsData } from "../types/EntityRoomsSchema";

interface GetRoomsByParamsProps {
	faculty_id: TParam,
	dormitory_id: TParam,
	gender: TParam,
	page?: TParam
}

const initialState: EntityRoomsSchema = {
};

export const entityRoomsSlice = createSliceWithThunk({
	name: "entityRooms",
	initialState,
	reducers: (create) => ({
		getRoomsByParams: create.asyncThunk<any, GetRoomsByParamsProps, ThunkConfig<string>>(
			async ({
				faculty_id, dormitory_id, gender, page,
			}, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.get<RoomsData>("rooms", {
						params: {
							faculty_id,
							dormitory_id,
							gender,
							page,
						},
					});

					if (!response.data) {
						throw new Error();
					}

					// return response.data;

					return {
						data: response.data,
						params: response.config.params,
					};
				} catch (e) {
					return rejectWithValue("error");
				}
			},
			{
				pending: (state, action) => {
					if (Number(action.meta.arg.page) > 1) {
						state.isFetching = true;
					} else {
						state.isLoading = true;
					}
				},
				fulfilled: (state, action) => {
					state.params = action.payload.params;

					if (Number(action.meta.arg.page) > 1) {
						state.data!.data.push(...action.payload.data.data);
						state.data!.meta = action.payload.data.meta;
						state.isFetching = false;
					} else {
						state.isLoading = false;
						state.data = action.payload.data;
					}
				},
				rejected: (state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				},
			},
		),
		setScrollPosition: create.reducer((state, action: PayloadAction<number>) => {
			state.scrollPosition = action.payload;
		}),
	}),
});

export const { actions: entityRoomsActions, reducer: entityRoomsReducer } = entityRoomsSlice;
