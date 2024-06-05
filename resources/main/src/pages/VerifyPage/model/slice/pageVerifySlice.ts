import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { PageVerifySchema } from "../types/PageVerifySchema";

const initialState: PageVerifySchema = {
	isLoading: false,
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
				} catch (e: any) {
					if (e.response.status === 400) {
						return rejectWithValue(e.response.data.messages);
					}
				}
			},
			{
				pending: (state) => {
					state.isLoading = true;
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

export const { actions: pageVerifyActions } = pageVerifySlice;
