import { rtkApi } from "@/shared/api/rtkApi";

const profileApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProfile: build.query<any, void>({
			providesTags: ["ProfilePage"],
			query: () => ({
				method: "GET",
				url: "profile",
			}),
		}),

		updateProfile: build.mutation<unknown, any>({
			invalidatesTags: ["ProfilePage"],
			query: () => ({
				url: "profile",
				method: "PATCH",
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
