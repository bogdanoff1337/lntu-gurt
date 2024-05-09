export const generateQueryString = (params: Record<string, string | number | undefined>): string => {
	const queryString = Object.keys(params)
		.map((key) => (params[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}` : ""))
		.join("&");
	return `?${queryString}`;
};
