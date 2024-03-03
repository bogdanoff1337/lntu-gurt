import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

export const createSliceWithThunk = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
});
