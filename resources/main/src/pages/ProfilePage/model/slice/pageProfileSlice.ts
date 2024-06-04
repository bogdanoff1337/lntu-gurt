import { PayloadAction } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { ProfileData, PageProfileSchema, ResponseData } from "../types/PageProfileSchema";

const initialState: PageProfileSchema = {
	// data: {
	// 	first_name: "",
	// 	last_name: "",
	// 	father_name: "",
	// 	address: "",
	// 	gender: "",
	// 	phone: "",
	// 	benefits: "",
	// },
	// tempData: {
	// 	first_name: "",
	// 	last_name: "",
	// 	father_name: "",
	// 	address: "",
	// 	gender: "",
	// 	phone: "",
	// 	benefits: "",
	// },
	tempData: undefined,
	data: undefined,
	isLoading: true,
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
				try {
					// @ts-ignore
					const data = getState().pageProfile.tempData;
					const response = await extra.api.patch<any>("profile/me", data);

					if (!response.data) {
						throw new Error();
					}
					console.log(response.data);
					return response.data;
				} catch (e) {
					console.log(e);
					return rejectWithValue("error");
				}
			},
			{
				pending: (state) => {
					state.isFetching = true;
				},
				fulfilled: (state, action) => {
					state.isFetching = false;
				},
				rejected: (state, action) => {
				},
			},
		),

		getFormData: create.asyncThunk<ProfileData, void, ThunkConfig<string>>(
			async (_, {
				extra, rejectWithValue,
			}) => {
				try {
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
					if (!state.data) {
						state.isLoading = true;
					} else {
						state.isFetching = true;
					}
				},
				fulfilled: (state, action) => {
					state.isLoading = false;
					state.isFetching = false;

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
			state.tempData!.first_name = action.payload;
		}),
		changeLastName: create.reducer((state, action: PayloadAction<string>) => {
			state.tempData!.last_name = action.payload;
		}),
		changeFatherName: create.reducer((state, action: PayloadAction<string>) => {
			state.tempData!.middle_name = action.payload;
		}),
		changeAddress: create.reducer((state, action: PayloadAction<string>) => {
			state.tempData!.city = action.payload;
		}),
		changeGender: create.reducer((state, action: PayloadAction<string>) => {
			state.tempData!.gender = action.payload;
		}),
		changePhone: create.reducer((state, action: PayloadAction<string>) => {
			state.tempData!.phone = action.payload;
		}),
		changeBenefits: create.reducer((state, action: PayloadAction<string>) => {
			state.tempData!.benefits = action.payload;
		}),
	}),
});

export const { actions: pageProfileActions } = pageProfileSlice;
