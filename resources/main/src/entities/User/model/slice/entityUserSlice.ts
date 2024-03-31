import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { EntityUserSchema } from "../types/EntityUserSchema";

const initialState: EntityUserSchema = {
};

export const entityRoomsSlice = createSliceWithThunk({
	name: "user",
	initialState,
	reducers: (create) => ({
		getRoomsByParams: create.asyncThunk<any, { }, ThunkConfig<string>>(
			async ({  }, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.get<any>("rooms", {
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
