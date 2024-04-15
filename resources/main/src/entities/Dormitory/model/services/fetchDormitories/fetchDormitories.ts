import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Dormitory, DormitoryData } from "../../types/DormitorySchema";

export const fetchDormitories = createAsyncThunk<DormitoryData, void, ThunkConfig<string>>(
	"mainPage/fetchDormitories",
	async (_, thunkApi) => {
		const { extra, rejectWithValue, getState } = thunkApi;

		try {
			const response = await extra.api.get<DormitoryData>("/dormitories");

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
