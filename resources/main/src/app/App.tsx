import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { entityAuthActions, entityAuthSelectors } from "@/entities/Auth";
import { entityFacultiesActions, entityFacultiesSelectors } from "@/entities/Faculties";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Modal } from "@/shared/ui/Modal";
import { PageLoader } from "@/shared/ui/PageLoader";
import { AppRouter } from "./providers/router";

const App = () => {
	const entityAuthIsLoading = useSelector(entityAuthSelectors.getIsLoading);
	// const entityAuthData = useSelector(entityAuthSelectors.getData);

	const entityFacultiesIsLoading = useSelector(entityFacultiesSelectors.getIsLoading);

	// const [isOpen, setIsOpen] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(entityAuthActions.getUser());
		dispatch(entityFacultiesActions.getAllFaculties());
	}, [dispatch]);

	// useEffect(() => {
	// 	if (entityAuthIsLoading || entityFacultiesIsLoading) {
	// 		setTimeout(() => {
	// 			setIsOpen(true);
	// 		}, 2000);
	// 	}
	// }, [entityAuthIsLoading, entityFacultiesIsLoading]);

	if (entityAuthIsLoading || entityFacultiesIsLoading) {
		return <PageLoader />;
	}

	return (
		<>
			{/* {entityAuthData && (
				<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
					Test
				</Modal>
			)} */}
			<AppRouter />
		</>

	);
};

export default App;
