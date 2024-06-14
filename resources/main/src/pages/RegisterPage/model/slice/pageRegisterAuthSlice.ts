import { PayloadAction } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { entityAuthActions } from "@/entities/Auth";
import { TOKEN_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { validateConfirmPassword } from "@/shared/validate/validateConfirmPassword";
import { validateEmail } from "@/shared/validate/validateEmail";
import { validatePassword } from "@/shared/validate/validatePassword";
import { PageRegisterAuthSchema, TokenData } from "../types/PageRegisterAuthSchema";

const initialState: PageRegisterAuthSchema = {
	data: {
		email: {
			value: "",
			errorMessage: undefined,
			ok: undefined,
		},
		password: {
			value: "",
			errorMessage: undefined,
			ok: undefined,
		},
		confirmPassword: {
			value: "",
			errorMessage: undefined,
			ok: undefined,
		},
	},
	isLoading: false,
};

export const pageRegisterAuthSlice = createSliceWithThunk({
	name: "pageRegisterAuth",
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

		changeConfirmPassword: create.reducer((state, action: PayloadAction<string>) => {
			state.data.confirmPassword.value = action.payload;
		}),

		validateConfirmPassword: create.reducer((state) => {
			const { ok, message } = validateConfirmPassword(
				state.data.password.value,
				state.data.confirmPassword.value,
			);
			state.data.confirmPassword.ok = ok;
			state.data.confirmPassword.errorMessage = ok ? undefined : message;
		}),

		clearFields: create.reducer((state) => {
			state.data.email.value = "";
			state.data.email.ok = undefined;
			state.data.email.errorMessage = undefined;

			state.data.password.value = "";
			state.data.password.ok = undefined;
			state.data.password.errorMessage = undefined;

			state.data.confirmPassword.value = "";
			state.data.confirmPassword.ok = undefined;
			state.data.confirmPassword.errorMessage = undefined;
		}),

		submitForm: create.asyncThunk<TokenData, void, ThunkConfig<PageRegisterAuthSchema["error"]>>(
			async (_, {
				extra, rejectWithValue, getState, dispatch,
			}) => {
				const state = getState() as { pageRegisterAuth: PageRegisterAuthSchema };
				try {
					const response = await extra.api.post<any>("auth/register", {
						email: state.pageRegisterAuth.data.email.value,
						password: state.pageRegisterAuth.data.password.value,
						confirmPassword: state.pageRegisterAuth.data.confirmPassword.value,
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
					state.error = undefined;
				},
				rejected: (state, action: PayloadAction<any>) => {
					state.isLoading = false;
					state.error = action.payload;
				},
			},
		),
	}),
});

export const { actions: pageRegisterAuthActions, reducer: pageRegisterAuthReducer } = pageRegisterAuthSlice;
