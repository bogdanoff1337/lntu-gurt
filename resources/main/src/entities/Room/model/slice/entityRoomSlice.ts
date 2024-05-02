import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { EntityRoomSchema, RoomData } from "../types/EntityRoomSchema";

const initialState: EntityRoomSchema = {
	isLoading: true,
	isFetching: false,
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
					const response = await extra.api.get<RoomData>(`rooms/${id}`, {
						params: {
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
		bookRoom: create.asyncThunk<any, { id: string }, ThunkConfig<string>>(
			async ({ id }, {
				extra, rejectWithValue, getState,
			}) => {
				// @ts-ignore
				const { data } = getState().entityAuth;
				try {
					const response = await extra.api.post<RoomData>("book", {
						room_id: id,
						student_id: data.id,
						status: "new",
					});

					if (!response.data) {
						throw new Error();
					}

					return response.data.data;
				} catch (e) {
					console.log(e);
					return rejectWithValue("error");
				}
			},
			{
				pending: (state) => {
					state.isFetching = true;
				},
				fulfilled: (state, action) => {
					state.isFetching = false;
				},
				rejected: (state, action) => {
					state.isFetching = false;
					state.error = action.payload;
				},
			},
		),
	}),
});

export const { actions: entityRoomActions, reducer: entityRoomReducer } = entityRoomSlice;
