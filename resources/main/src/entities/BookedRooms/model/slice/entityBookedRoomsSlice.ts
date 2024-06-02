import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { EntityBookedRoomsSchema, BookedRoomsData } from "../types/EntityBookedRoomsSchema";

const initialState: EntityBookedRoomsSchema = {
};

export const entityBookedRoomsSlice = createSliceWithThunk({
	name: "entityBookedRooms",
	initialState,
	reducers: (create) => ({
		getBookedRooms: create.asyncThunk<any, void, ThunkConfig<string>>(
			async (_, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.get<any>("book");

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

export const { actions: entityBookedRoomsActions, reducer: entityBookedRoomsReducer } = entityBookedRoomsSlice;
