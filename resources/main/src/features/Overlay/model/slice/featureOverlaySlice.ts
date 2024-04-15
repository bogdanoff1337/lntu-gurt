import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { OverlaySchema } from "../types/OverlaySchema";

const initialState: OverlaySchema = {
	isShow: false,
};

export const featureOverlaySlice = createSliceWithThunk({
	name: "featureOverlay",
	initialState,
	reducers: (create) => ({
		setIsShow: create.reducer((state, action: PayloadAction<boolean>) => {
			state.isShow = action.payload;
		}),
	}),
});

export const { actions: featureOverlayActions } = featureOverlaySlice;
