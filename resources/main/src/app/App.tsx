import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Overlay } from "@/features/Overlay";
import { entityAuthActions, entityAuthSelectors } from "@/entities/Auth";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Loader } from "@/shared/ui/Loader";
import { PageLoader } from "@/shared/ui/PageLoader";
import { AppRouter } from "./providers/router";

const App = () => {
	const entityAuthData = useSelector(entityAuthSelectors.getData);
	const entityAuthIsLoading = useSelector(entityAuthSelectors.getIsLoading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(entityAuthActions.getUser());
	}, []);

	if (entityAuthIsLoading) {
		return <PageLoader />;
	}

	return (
		<>
			<AppRouter />
			<Overlay />
		</>
	);
};

export default App;
