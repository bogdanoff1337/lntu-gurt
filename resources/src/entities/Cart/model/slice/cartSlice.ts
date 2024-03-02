import { createSlice } from "@reduxjs/toolkit";
import { CartSchema } from "../types/CartSchema";

const initialState: CartSchema = {

};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {

	},
});

export const { actions: cartActions } = cartSlice;
export const { reducer: cartReducer } = cartSlice;
