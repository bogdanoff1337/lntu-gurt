import { createSlice } from "@reduxjs/toolkit";
import { FavoriteSchema } from "../types/FavoriteSchema";

const initialState: FavoriteSchema = {

};

export const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {

	},
});

export const { actions: favoriteActions } = favoriteSlice;
export const { reducer: favoriteReducer } = favoriteSlice;
