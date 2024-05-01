import { useCallback } from "react";
import { featureMenuActions } from "@/features/Menu";
import { useClickWindow } from "@/shared/hooks/useClickWindow/useClickWindow";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

export const useClickWindowCloseMenu = () => {
	const dispatch = useAppDispatch();

	const onCloseClickHandler = useCallback(() => {
		dispatch(featureMenuActions.setIsShow(false));
	}, [dispatch]);

	useClickWindow({ onClick: onCloseClickHandler }, []);
};
