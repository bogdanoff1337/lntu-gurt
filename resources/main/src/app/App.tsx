import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { entityAuthActions, entityAuthSelectors } from "@/entities/Auth";
import { entityFacultiesActions, entityFacultiesSelectors } from "@/entities/Faculties";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/shared/ui/PageLoader";
import { AppRouter } from "./providers/router";
import { RequiredProfileModal } from "./ui/RequiredProfileModal/RequiredProfileModal";

import { index, Middleware } from "./providers/router/routes";

const App = () => {
    const location = useLocation();

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

    const currentRoute = index.find((route) => route.path === location.pathname);

    const shouldShowModal =
        entityAuthData &&
        !entityAuthData.profile_filled &&
        !(
            currentRoute?.middleware?.includes(Middleware.NO_VERIFY) ||
            currentRoute?.middleware?.includes(Middleware.NO_AUTH)
        );

    return (
        <>
            {shouldShowModal && (
                <RequiredProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
            <AppRouter />
        </>
    );
};

export default App;
