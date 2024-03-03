import { createSlice } from "@reduxjs/toolkit";
import { ProductSchema } from "../types/ProductSchema";

const initialState: ProductSchema = {

};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {

	},
});

export const { actions: productActions } = productSlice;
export const { reducer: productReducer } = productSlice;
