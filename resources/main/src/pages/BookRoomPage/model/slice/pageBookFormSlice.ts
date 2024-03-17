import { PayloadAction } from "@reduxjs/toolkit";
import { StateSchema, ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { getPageBookFormData } from "../selectors";
import { PageBookRoomSchema } from "../types/PageBookRoomSchema";

const initialState: PageBookRoomSchema = {
	data: {
		room_id: undefined,
		first_name: "",
		last_name: "",
		father_name: "",
		address: "",
		gender: "",
		phone: "",
		benefits: "",
	},
};

export const pageBookFormSlice = createSliceWithThunk({
	name: "pageBookForm",
	initialState,
	reducers: (create) => ({
		postBookData: create.asyncThunk<any, void, ThunkConfig<string>>(
			async (_, {
				extra, rejectWithValue, getState,
			}) => {
				const formData = getPageBookFormData(getState() as StateSchema);

				try {
					const response = await extra.api.post<PageBookRoomSchema>("book", {
						formData,
					});

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
				},
				fulfilled: (state, action) => {
				},
				rejected: (state, action) => {
				},
			},
		),

		changeRoomId: create.reducer((state, action: PayloadAction<number>) => {
			state.data.room_id = action.payload;
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

export const { actions: pageBookFormActions, reducer: pageBookFormReducer } = pageBookFormSlice;
