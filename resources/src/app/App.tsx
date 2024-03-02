import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userActions, userSelectors } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/shared/ui/PageLoader";
import { AppRouter } from "./providers/router";

const App = () => {
	const dispatch = useAppDispatch();
	const init = useSelector(userSelectors.getInit);
	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

	if (!init) {
		return <PageLoader />;
	}

	return (
		<AppRouter />
	);
};

export default App;
