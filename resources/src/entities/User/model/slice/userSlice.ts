import { PayloadAction } from "@reduxjs/toolkit";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { User, UserSchema } from "../types/UserSchema";

const initialState: UserSchema = {
	_init: false,
};

export const userSlice = createSliceWithThunk({
	name: "user",
	initialState,
	reducers: (create) => ({
		setAuthData: create.reducer((state, action: PayloadAction<User>) => {
			state.authData = action.payload;
		}),
		initAuthData: (state) => {
			const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
			if (user) {
				state.authData = JSON.parse(user);
			}
			state._init = true;
		},
		logout: (state) => {
			state.authData = undefined;
			localStorage.removeItem(USER_LOCALSTORAGE_KEY);
		},
	}),

	selectors: {
		getAuthData: (state) => state.authData,
		getInit: (state) => state._init,
	},
});

export const { actions: userActions } = userSlice;
export const { selectors: userSelectors } = userSlice;
