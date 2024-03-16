import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { EntityRoomSchema, RoomData } from "../types/EntityRoomSchema";

const initialState: EntityRoomSchema = {
};

export const entityRoomSlice = createSliceWithThunk({
	name: "entityRoom",
	initialState,
	reducers: (create) => ({
		getRoomById: create.asyncThunk<any, { id: string }, ThunkConfig<string>>(
			async ({ id }, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.get<RoomData>("rooms", {
						params: {
							id
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

export const { actions: entityRoomActions, reducer: entityRoomReducer } = entityRoomSlice;
