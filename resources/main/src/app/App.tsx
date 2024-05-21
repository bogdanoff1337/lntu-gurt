import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useClickWindowCloseMenu } from "@/features/Menu";
import { entityAuthActions, entityAuthSelectors } from "@/entities/Auth";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/shared/ui/PageLoader";
import { AppRouter } from "./providers/router";

const App = () => {
	const entityAuthIsLoading = useSelector(entityAuthSelectors.getIsLoading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(entityAuthActions.getUser());
	}, [dispatch]);

	useClickWindowCloseMenu();

	if (entityAuthIsLoading) {
		return <PageLoader />;
	}

	return (
		<AppRouter />
	);
};

export default App;
