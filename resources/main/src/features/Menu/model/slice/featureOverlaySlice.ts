import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { OverlaySchema } from "../types/OverlaySchema";

const initialState: OverlaySchema = {
	isShow: false,
};

export const featureMenuSlice = createSliceWithThunk({
	name: "featureMenu",
	initialState,
	reducers: (create) => ({
		setIsShow: create.reducer((state, action: PayloadAction<boolean>) => {
			state.isShow = action.payload;
		}),
	}),
});

export const { actions: featureMenuActions } = featureMenuSlice;
