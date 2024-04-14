import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Devices } from "@/shared/const/common";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import ProfileIcon from "../../assets/profile.svg?react";
import * as featureMenuSelectors from "../../model/selectors";
import { featureMenuActions } from "../../model/slice/featureOverlaySlice";
import { Aside } from "../Aside/Aside";
import { DropDown } from "../DropDown/DropDown";
import cls from "./UserMenu.module.scss";

interface UserMenuProps {
	className?: string
}

export const UserMenu: FC<UserMenuProps> = ({ className }) => {
	const isShow = useSelector(featureMenuSelectors.getIsShow);
	const dispatch = useAppDispatch();
	const isTablet = useMediaQuery({ maxWidth: Devices.TABLET });

	const onClickHandler = useCallback(() => {
		dispatch(featureMenuActions.setIsShow(!isShow));
	}, [dispatch, isShow]);

	useEffect(() => {
		const onKeydown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				dispatch(featureMenuActions.setIsShow(false));
			}
		};

		window.addEventListener("keydown", onKeydown);

		return () => {
			window.removeEventListener("keydown", onKeydown);
		};
	}, [dispatch]);

	return (
		<div className={cn(cls.UserMenu, {}, [className])}>
			<button aria-label="Menu" onClick={onClickHandler} className={cls.UserMenu__button}>
				<ProfileIcon className={cls.UserMenu__icon} />
			</button>
			<DropDown className={cls.UserMenu__dropDown} isShow={isShow && !isTablet} />
			<Aside isShow={isShow && isTablet} />
		</div>
	);
};
