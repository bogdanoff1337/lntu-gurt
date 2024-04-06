import { ThunkConfig } from "@/app/providers/StoreProvider";
import { TOKEN_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { FeatureAuthSchema, TokenData } from "../types/FeatureAuthSchema";

const initialState: FeatureAuthSchema = {
	isLoading: true,
};

export const featureAuthSlice = createSliceWithThunk({
	name: "featureAuthSlice",
	initialState,
	reducers: (create) => ({
		postRegisterUser: create.asyncThunk<any, void, ThunkConfig<string>>(
			async (_, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.post<TokenData>("auth/register");

					localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, response.data.access_token);

					if (!response.data) {
						throw new Error();
					}

					return response.data;
				} catch (e) {
					return rejectWithValue("error");
				}
			},
			{
				pending: (state) => {
					state.isLoading = false;
				},
				fulfilled: (state) => {
					state.isLoading = false;
				},
				rejected: (state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				},
			},
		),
	}),
});

export const { actions: entityFacultiesActions, reducer: entityFacultiesReducer } = featureAuthSlice;
