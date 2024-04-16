import { PayloadAction } from "@reduxjs/toolkit";
import { RootState, StateSchema, ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import * as pageProfileSelectors from "../selectors";
import { Data, PageProfileSchema } from "../types/PageProfileSchema";

const initialState: PageProfileSchema = {
	data: {
		first_name: "",
		last_name: "",
		father_name: "",
		address: "",
		gender: "",
		phone: "",
		benefits: "",
	},
	tempData: {
		first_name: "",
		last_name: "",
		father_name: "",
		address: "",
		gender: "",
		phone: "",
		benefits: "",
	},
	isLoading: false,
	isFetching: false,
	readOnly: true,
};

// @ts-ignore
export const pageProfileSlice = createSliceWithThunk({
	name: "pageProfile",
	initialState,
	reducers: (create) => ({
		setReadOnly: create.reducer((state, payload: PayloadAction<boolean>) => {
			state.readOnly = payload.payload;
		}),

		patchFormData: create.asyncThunk<any, void, ThunkConfig<string>>(
			async (_, {
				extra, rejectWithValue, getState,
			}) => {
				// @ts-ignore
				const { data } = getState().pageProfile;

				try {
					const response = await extra.api.put<any>("profile", data);

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
					state.isLoading = true;
				},
				fulfilled: (state, action) => {
					state.isLoading = false;
				},
				rejected: (state, action) => {
				},
			},
		),

		getFormData: create.asyncThunk<Data, void, ThunkConfig<string>>(
			async (_, {
				extra, rejectWithValue,
			}) => {
				try {
					// @ts-ignore
					const response = await extra.api.get<ResponseData>("profile");

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
					state.tempData = action.payload;
				},
				rejected: (state, action) => {
				},
			},
		),

		cancelForm: create.reducer((state) => {
			state.tempData = state.data;
		}),

		changeFirstName: create.reducer((state, action: PayloadAction<string>) => {
			state.data.first_name = action.payload;
		}),
		changeLastName: create.reducer((state, action: PayloadAction<string>) => {
			state.data.last_name = action.payload;
		}),
		changeFatherName: create.reducer((state, action: PayloadAction<string>) => {
			state.data.father_name = action.payload;
		}),
		changeAddress: create.reducer((state, action: PayloadAction<string>) => {
			state.data.address = action.payload;
		}),
		changeGender: create.reducer((state, action: PayloadAction<string>) => {
			state.data.gender = action.payload;
		}),
		changePhone: create.reducer((state, action: PayloadAction<string>) => {
			state.data.phone = action.payload;
		}),
		changeBenefits: create.reducer((state, action: PayloadAction<string>) => {
			state.data.benefits = action.payload;
		}),
	}),
});

export const { actions: pageProfileActions } = pageProfileSlice;
