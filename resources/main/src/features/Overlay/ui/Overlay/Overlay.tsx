import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Portal } from "@/shared/ui/Portal";
import * as featureOverlaySelectors from "../../model/selectors";
import { featureOverlayActions } from "../../model/slice/featureOverlaySlice";
import cls from "./Overlay.module.scss";

interface OverlayProps {
	className?: string
}

export const Overlay: FC<OverlayProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const isShow = useSelector(featureOverlaySelectors.getIsShow);

	const onClickHandler = useCallback(() => {
		dispatch(featureOverlayActions.setIsShow(false));
	}, [dispatch]);

	return (
		<Portal>
			<Transition
				className={clsx(cls.Overlay, [className])}
				show={isShow}
				enter={cls.Transition_enter}
				enterFrom={cls.Transition_enterFrom}
				enterTo={cls.Transition_enterTo}
				leave={cls.Transition_leave}
				leaveFrom={cls.Transition_leaveFrom}
				leaveTo={cls.Transition_leaveTo}
				onClick={onClickHandler}
			/>
		</Portal>
	);
};
