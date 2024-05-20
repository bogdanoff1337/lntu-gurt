import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { $api } from "./api";

export const axiosBaseQuery = (): BaseQueryFn<
{
	url: string,
	method?: AxiosRequestConfig["method"],
	data?: AxiosRequestConfig["data"],
	params?: AxiosRequestConfig["params"],
},
unknown,
unknown
> => async ({
	url, method, data, params,
}) => {
	try {
		const result = await $api({
			url,
			method,
			data,
			params,
		});
		return { data: result.data };
	} catch (axiosError) {
		const err = axiosError as AxiosError;
		return {
			error: {
				status: err.response?.status,
				data: err.response?.data || err.message,
			},
		};
	}
};

export const rtkApi = createApi({
	tagTypes: ["ProfilePage"],
	reducerPath: "rtkApi",
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
});
