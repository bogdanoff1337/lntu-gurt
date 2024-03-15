import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { EntityRoomsSchema, Room, RoomsData } from "../types/EntityRoomsSchema";

const initialState: EntityRoomsSchema = {
};




export const entityRoomsSlice = createSliceWithThunk({
	name: "entityRooms",
	initialState,
	reducers: (create) => ({
		getRoomsByParams: create.asyncThunk<any, { faculty_id?: number, dormitory_id?: number, gender?: string }, ThunkConfig<string>>(
			async ({ faculty_id, dormitory_id, gender }, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.get<RoomsData>("rooms", {
						params: {
							faculty_id,
							// dormitory_id,
							// gender
						},
					});

					if (!response.data) {
						throw new Error();
					}

					return response.data.data;
				} catch (e) {
					return rejectWithValue("error");
				}
			},
			{
				pending: (state) => {
					state.isLoading = true;
				},
				fulfilled: (state, action) => {
					state.isLoading = false;
					state.data = action.payload;
				},
				rejected: (state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				},
			},
		),
	}),
});

export const { actions: entityRoomsActions, reducer: entityRoomsReducer } = entityRoomsSlice;
