import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { entityAuthActions } from "@/entities/Auth";
import { MenuItem } from "@/entities/Menu";
import { getLoginRoutePath } from "@/shared/config/routes/path";
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
	}, []);

	return (
		<>
			<MenuItem className={className} name="Профіль" Icon={UserIcon} />
			<MenuItem className={className} name="Заброньована кімната" Icon={BedIcon} />
			<MenuItem className={className} onClick={onClickLogoutHandler} name="Вихід" Icon={LogoutIcon} />
		</>
	);
};
