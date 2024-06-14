import { PayloadAction } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { entityAuthActions } from "@/entities/Auth";
import { TOKEN_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { validateEmail } from "@/shared/validate/validateEmail";
import { validatePassword } from "@/shared/validate/validatePassword";
import { PageLoginAuthSchema, TokenData } from "../types/PageLoginAuthSchema";

const initialState: PageLoginAuthSchema = {
	data: {
		email: {
			value: "",
		},
		password: {
			value: "",
		},
		confirmPassword: {
			value: "",
		},
	},
	isLoading: false,
};

export const pageLoginAuthSlice = createSliceWithThunk({
	name: "pageLoginAuth",
	initialState,
	reducers: (create) => ({
		changeEmail: create.reducer((state, action: PayloadAction<string>) => {
			state.data.email.value = action.payload;
		}),
		validateEmail: create.reducer((state) => {
			const { ok, message } = validateEmail(state.data.email.value);
			state.data.email.ok = ok;
			state.data.email.errorMessage = ok ? undefined : message;
		}),
		changePassword: create.reducer((state, action: PayloadAction<string>) => {
			state.data.password.value = action.payload;
		}),
		validatePassword: create.reducer((state) => {
			const { ok, message } = validatePassword(state.data.password.value);
			state.data.password.ok = ok;
			state.data.password.errorMessage = ok ? undefined : message;
		}),
		clearFields: create.reducer((state) => {
			state.data.email.value = "";
			state.data.email.ok = undefined;
			state.data.password.value = "";
			state.data.password.ok = undefined;
		}),
		submitForm: create.asyncThunk<TokenData, void, ThunkConfig<PageLoginAuthSchema["error"]>>(
			async (_, {
				extra, rejectWithValue, getState, dispatch,
			}) => {
				const state = getState() as { pageLoginAuth: PageLoginAuthSchema };
				try {
					const response = await extra.api.post<TokenData>("auth/login", {
						email: state.pageLoginAuth.data.email.value,
						password: state.pageLoginAuth.data.password.value,
					});

					localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, response.data.access_token);
					dispatch(entityAuthActions.getUser());

					return response.data;
				} catch (error: any) {
					return rejectWithValue(error.response.data);
				}
			},
			{
				pending: (state) => {
					state.isLoading = true;
				},
				fulfilled: (state) => {
					state.isLoading = false;
				},
				rejected: (state, action: PayloadAction<any>) => {
					state.isLoading = false;
					state.error = action.payload;
				},
			},
		),
	}),
});

export const { actions: pageLoginAuthActions, reducer: pageLoginAuthReducer } = pageLoginAuthSlice;
