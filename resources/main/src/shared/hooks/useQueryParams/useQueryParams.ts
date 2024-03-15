import queryString from "query-string";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useQueryParams = () => {
	const location = useLocation();
	const params = useMemo(() => {
		return queryString.parse(location.search);
	}, [location.search]);
	return params;
};
