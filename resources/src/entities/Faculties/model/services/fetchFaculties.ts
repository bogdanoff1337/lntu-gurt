import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Faculty } from "../types/FacultiesSchema";

export const fetchFaculties = createAsyncThunk<any, void, ThunkConfig<string>>(
	"page/facultiesSlice",
	async (_, thunkApi) => {
		const { extra, rejectWithValue } = thunkApi;

		try {
			const response = await extra.api.get<any>("/faculties");

			if (!response.data) {
				throw new Error();
			}

			console.log(response.data.data);
			return response.data.data;
		} catch (e) {
			return rejectWithValue("error");
		}
	},
);
