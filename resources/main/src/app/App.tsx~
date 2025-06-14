import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { entityAuthActions, entityAuthSelectors } from "@/entities/Auth";
import { entityFacultiesActions, entityFacultiesSelectors } from "@/entities/Faculties";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/shared/ui/PageLoader";
import { AppRouter } from "./providers/router";
import { RequiredProfileModal } from "./ui/RequiredProfileModal/RequiredProfileModal";

const App = () => {
	const entityAuthIsLoading = useSelector(entityAuthSelectors.getIsLoading);
	const entityAuthData = useSelector(entityAuthSelectors.getData);

	const entityFacultiesIsLoading = useSelector(entityFacultiesSelectors.getIsLoading);

	const [isOpen, setIsOpen] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(entityAuthActions.getUser());
		dispatch(entityFacultiesActions.getAllFaculties());
	}, [dispatch]);

	useEffect(() => {
		if (entityAuthIsLoading || entityFacultiesIsLoading) {
			setTimeout(() => {
				setIsOpen(true);
			}, 1000);
		}
	}, [entityAuthIsLoading, entityFacultiesIsLoading]);

	if (entityAuthIsLoading || entityFacultiesIsLoading) {
		return <PageLoader />;
	}

	return (
		<>
			{entityAuthData && !entityAuthData.profileFilled && (
				<RequiredProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
			)}
			<AppRouter />
		</>

	);
};

export default App;
