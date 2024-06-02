import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { DormitoriesData, EntityDormitoriesSchema } from "../types/EntityDormitoriesSchema";

const initialState: EntityDormitoriesSchema = {
};

export const entityDormitoriesSlice = createSliceWithThunk({
	name: "entityDormitories",
	initialState,
	reducers: (create) => ({
		getAllDormitories: create.asyncThunk<any, void, ThunkConfig<string>>(
			async (_, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.get<DormitoriesData>("dormitories");

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

export const { actions: entityDormitoriesActions } = entityDormitoriesSlice;
