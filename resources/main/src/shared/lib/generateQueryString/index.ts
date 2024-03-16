export const generateQueryString = (params: Record<string, string | number>): string => {
	const queryString = Object.keys(params)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
		.join("&");
	return `?${queryString}`;
};
