import { PayloadAction } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { PageVerifySchema } from "../types/PageVerifySchema";

const initialState: PageVerifySchema = {
	isLoading: false,
	data: {
		timer: 0,
	},
};

export const pageVerifySlice = createSliceWithThunk({
	name: "pageVerify",
	initialState,
	reducers: (create) => ({
		submitForm: create.asyncThunk<any, void, ThunkConfig<string>>(
			async (_, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.get<any>("email/send", {
					});

					if (!response.data) {
						throw new Error();
					}
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

		setTimer: create.reducer((state, action: PayloadAction<number>) => {
			state.data!.timer = action.payload;
		}),
	}),
});

export const { actions: pageVerifyActions } = pageVerifySlice;
