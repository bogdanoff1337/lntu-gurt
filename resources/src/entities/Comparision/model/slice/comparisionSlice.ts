import { createSlice } from "@reduxjs/toolkit";
import { ComparisionSchema } from "../types/ComparisionSchema";

const initialState: ComparisionSchema = {

};

export const comparisionSlice = createSlice({
	name: "comparision",
	initialState,
	reducers: {

	},
});

export const { actions: comparisionActions } = comparisionSlice;
export const { reducer: comparisionReducer } = comparisionSlice;
