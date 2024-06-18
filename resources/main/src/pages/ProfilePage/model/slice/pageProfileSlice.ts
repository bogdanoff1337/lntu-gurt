import { PayloadAction } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { ProfileData, PageProfileSchema, ResponseData } from "../types/PageProfileSchema";

const initialState: PageProfileSchema = {
	tempData: undefined,
	data: undefined,
	isLoading: true,
	isFetching: false,

	cities: undefined,
	citiesIsLoading: false,

	readOnly: true,
};

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
					const { pageProfile: { tempData } } = getState() as { pageProfile: PageProfileSchema };
					const response = await extra.api.patch<any>("profile/me", {
						...tempData,
						city_id: tempData?.city?.id,
					});

					if (!response.data) {
						throw new Error();
					}
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
					state.isFetching = false;
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

		getCities: create.asyncThunk<any, { search: string }, ThunkConfig<string>>(
			async ({ search }, {
				extra, rejectWithValue,
			}) => {
				try {
					const response = await extra.api.get<any>("cities", {
						params: {
							search,
						},
					});

					return response.data.data;
				} catch (error: any) {
					return rejectWithValue(error.response.data);
				}
			},
			{
				pending: (state) => {
					state.citiesIsLoading = true;
				},
				fulfilled: (state, action) => {
					state.citiesIsLoading = false;
					state.cities = action.payload;
				},
				rejected: (state, action: any) => {
					state.isLoading = false;
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
		changeAddress: create.reducer((state, action: PayloadAction<{ id: number; slug: string }>) => {
			state.tempData!.city = action.payload;
		}),
		changeGender: create.reducer((state, action: PayloadAction<string>) => {
			state.tempData!.gender = action.payload;
		}),
		changeFaculty: create.reducer((state, action: PayloadAction<number>) => {
			state.tempData!.faculty_id = action.payload;
		}),
		changeCourse: create.reducer((state, action: PayloadAction<number>) => {
			state.tempData!.course = action.payload;
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
