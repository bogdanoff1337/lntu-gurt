import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { BabyCarriageData, BabyCarriageProductDetailsSchema } from "../types/BabyCarriageProductDetailsSchema";

const initialState: BabyCarriageProductDetailsSchema = {
	isLoading: true,
};

export const babyCarriageProductDetailsSlice = createSliceWithThunk({
	name: "babyCarriageProductDetails",
	initialState,
	reducers: (create) => ({
		getProductDetails: create.asyncThunk<any, any, ThunkConfig<string>>(
			async (id, {
				extra,
			}) => {
				const response = await extra.api.get<BabyCarriageData>(`/api/products/${id}`, {
					params: {
						_expand: [
							"productsFeedback",
							"productsImage",
							"productsDesc",
							"productsCharacter",
							"productsColor",
							"productsGender",
						],

					},
				});

				return response.data;
			},
			{
				pending: (state) => {
					state.isLoading = true;
				},
				fulfilled: (state, action) => {
					state.isLoading = false;
					state.data = action.payload;
				},
				rejected: (state) => {
					state.isLoading = false;
					state.isError = true;
				},
			},
		),
	}),

	selectors: {
		getData: (state) => state.data,
		getIsLoading: (state) => state.isLoading,
		getIsError: (state) => state.isError,
	},
});

export const { actions: babyCarriageProductDetailsActions } = babyCarriageProductDetailsSlice;
export const { selectors: babyCarriageProductDetailsSelectors } = babyCarriageProductDetailsSlice;
