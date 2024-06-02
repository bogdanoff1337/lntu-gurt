import { FC, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { entityAuthActions } from "@/entities/Auth";
import { MenuItem } from "@/entities/Menu";
import { getBookedRoutePath, getLoginRoutePath, getProfileRoutePath } from "@/shared/config/routes/path";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import BedIcon from "../../assets/bed.svg?react";
import LogoutIcon from "../../assets/logout.svg?react";
import UserIcon from "../../assets/profile.svg?react";

interface MenuItemsProps {
	className?: string;
}

export const MenuItems: FC<MenuItemsProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onClickLogoutHandler = useCallback(() => {
		dispatch(entityAuthActions.logout());
		navigate(getLoginRoutePath());
	}, [dispatch, navigate]);

	return (
		<>
			<MenuItem
				className={className}
				name="Профіль"
				to={getProfileRoutePath()}
				Icon={UserIcon}
			/>
			<MenuItem
				className={className}
				name="Заброньовані кімнати"
				to={getBookedRoutePath()}
				Icon={BedIcon}
			/>
			<MenuItem
				className={className}
				onClick={onClickLogoutHandler}
				name="Вихід"
				to={getLoginRoutePath()}
				Icon={LogoutIcon}
			/>
		</>
	);
};
