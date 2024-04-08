import { PayloadAction } from "@reduxjs/toolkit";
import { StateSchema, ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { validateConfirmPassword } from "@/shared/validate/validateConfirmPassword";
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
		validataEmail: create.reducer((state) => {
			const { ok, message } = validateEmail(state.data.email.value);
			state.data.email.ok = ok;

			if (ok) {
				state.data.email.errorMessage = undefined;
			} else if (!ok) {
				state.data.email.errorMessage = message;
			}
		}),

		changePassword: create.reducer((state, action: PayloadAction<string>) => {
			state.data.password.value = action.payload;
		}),
		validataPassword: create.reducer((state) => {
			const { ok, message } = validatePassword(state.data.password.value);
			state.data.password.ok = ok;

			if (ok) {
				state.data.password.errorMessage = undefined;
			} else if (!ok) {
				state.data.password.errorMessage = message;
			}
		}),

		submitForm: create.asyncThunk<any, void, ThunkConfig<string>>(
			async (_, {
				extra, rejectWithValue, getState,
			}) => {
				const state = getState() as StateSchema;

				try {
					console.log({
						email: state.pageLoginAuth.data.email.value,
						password: state.pageLoginAuth.data.password.value,
					});

					const response = await extra.api.post<TokenData>("auth/login", {
						email: state.pageLoginAuth.data.email.value,
						password: state.pageLoginAuth.data.password.value,
					});

					if (!response.data) {
						throw new Error();
					}
					console.log(response.data);
					// return response.data;
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

					// state.data = action.payload;
				},
				rejected: (state, action) => {
					state.isLoading = false;
					// state.error = action.payload;
				},
			},
		),
	}),
});

export const { actions: pageLoginAuthActions, reducer: pageLoginAuthReducer } = pageLoginAuthSlice;
