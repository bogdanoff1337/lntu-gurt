import { ThunkConfig } from "@/app/providers/StoreProvider";
import { TOKEN_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { EntityAuthSchema, TokenData, UserData } from "../types/EntityAuthSchema";

const initialState: EntityAuthSchema = {
	data: undefined,
	isLoading: true,
};

export const entityAuthSlice = createSliceWithThunk({
	name: "entityAuthSlice",
	initialState,
	reducers: (create) => ({
		// setAuthData: (state, action: PayloadAction<User>) => {
		// 	state.authData = action.payload;
		// },
		// initAuthData: (state) => {
		// 	const user = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
		// 	if (user) {
		// 		state.authData = JSON.parse(user);
		// 	}
		// 	state._inited = true;
		// },
		logout: create.reducer((state) => {
			state.data = undefined;
			localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
		}),
		getUser: create.asyncThunk<any, void, ThunkConfig<string>>(
			async (_, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.get<UserData>("auth/me");

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

export const { actions: entityFacultiesActions, reducer: entityFacultiesReducer } = entityAuthSlice;
