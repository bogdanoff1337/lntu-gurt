import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useClickWindowCloseMenu } from "@/features/Menu";
import { entityAuthActions, entityAuthSelectors } from "@/entities/Auth";
import { entityFacultiesActions, entityFacultiesSelectors } from "@/entities/Faculties";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/shared/ui/PageLoader";
import { AppRouter } from "./providers/router";

const App = () => {
	const entityAuthIsLoading = useSelector(entityAuthSelectors.getIsLoading);
	const entityFacultiesIsLoading = useSelector(entityFacultiesSelectors.getIsLoading);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(entityAuthActions.getUser());
		dispatch(entityFacultiesActions.getAllFaculties());
	}, [dispatch]);

	if (entityAuthIsLoading || entityFacultiesIsLoading) {
		return <PageLoader />;
	}

	return (
		<AppRouter />
	);
};

export default App;
