import { PayloadAction } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { validateСonfirmPassword } from "@/shared/validate/validateConfirmPassword";
import { validateEmail } from "@/shared/validate/validateEmail";
import { validatePassword } from "@/shared/validate/validatePassword";
import { PageRegisterAuthSchema } from "../types/PageRegisterAuthSchema";

const initialState: PageRegisterAuthSchema = {
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

export const pageRegisterAuthSlice = createSliceWithThunk({
	name: "pageRegisterAuth",
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
			}

			if (!ok) {
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
			}

			if (!ok) {
				state.data.password.errorMessage = message;
			}
		}),

		changeConfirmPassword: create.reducer((state, action: PayloadAction<string>) => {
			state.data.confirmPassword.value = action.payload;
		}),
		validataConfirmPassword: create.reducer((state) => {
			const { ok, message } = validateСonfirmPassword(state.data.password.value, state.data.confirmPassword.value);
			state.data.confirmPassword.ok = ok;

			if (ok) {
				state.data.confirmPassword.errorMessage = undefined;
			}

			if (!ok) {
				state.data.confirmPassword.errorMessage = message;
			}
		}),

		// submitForm: create.asyncThunk<any, any, ThunkConfig<string>>(
		// 	async ({ faculty_id, dormitory_id, gender }, {
		// 		extra, rejectWithValue,
		// 	}) => {
		// 		try {
		// 			const response = await extra.api.post<any>("rooms", {

		// 			});

		// 			if (!response.data) {
		// 				throw new Error();
		// 			}

		// 			return response.data.data;
		// 		} catch (e) {
		// 			return rejectWithValue("error");
		// 		}
		// 	},
		// 	{
		// 		pending: (state) => {
		// 			state.isLoading = true;
		// 		},
		// 		fulfilled: (state, action) => {
		// 			state.isLoading = false;
		// 			state.data = action.payload;
		// 		},
		// 		rejected: (state, action) => {
		// 			state.isLoading = false;
		// 			state.error = action.payload;
		// 		},
		// 	},
		// ),
		
	}),
});

export const { actions: pageRegisterAuthActions, reducer: pageRegisterAuthReducer } = pageRegisterAuthSlice;
