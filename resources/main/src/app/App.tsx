import { useSelector } from "react-redux";
import { AppRouter } from "./providers/router";
import { entityAuthActions, entityAuthSelectors } from "@/entities/Auth";
import { Loader } from "@/shared/ui/Loader";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

const App = () => {
	const entityAuthData = useSelector(entityAuthSelectors.getData);
	const entityAuthIsLoading = useSelector(entityAuthSelectors.getIsLoading);
	const dispatch = useAppDispatch();


	useEffect(() => {
		dispatch(entityAuthActions.getUser());
	}, []);

	if (entityAuthIsLoading) {
		return <Loader />
	}

	return (
		<AppRouter />
	);
};

export default App;
