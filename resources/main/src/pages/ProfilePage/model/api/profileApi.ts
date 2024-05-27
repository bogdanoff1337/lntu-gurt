import { rtkApi } from "@/shared/api/rtkApi";
import { ProfileData, ResponseData } from "../types/PageProfileSchema";

const profileApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProfile: build.query<ResponseData, void>({
			providesTags: ["ProfilePage"],
			query: () => ({
				method: "GET",
				url: "profile",
			}),
		}),

		updateProfile: build.mutation<any, ProfileData>({
			invalidatesTags: ["ProfilePage"],
			query: (formData) => ({
				url: "profile",
				method: "PATCH",
				body: {
					...formData,
				},

			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
