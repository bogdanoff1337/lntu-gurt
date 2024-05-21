import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { EntityFacultiesSchema, FacultyData } from "../types/EntityFacultiesSchema";

const initialState: EntityFacultiesSchema = {
};

export const entityFacultiesSlice = createSliceWithThunk({
	name: "entityFaculties",
	initialState,
	reducers: (create) => ({
		getAllFaculties: create.asyncThunk<any, void, ThunkConfig<string>>(
			async (_, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.get<FacultyData>("faculties");

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

export const { actions: entityFacultiesActions, reducer: entityFacultiesReducer } = entityFacultiesSlice;
