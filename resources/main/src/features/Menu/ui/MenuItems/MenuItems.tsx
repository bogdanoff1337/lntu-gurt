import {
	FC, memo, useCallback, useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { entityAuthActions } from "@/entities/Auth";
import { MenuItem, entityMenuModel } from "@/entities/Menu";
import { getLoginRoutePath } from "@/shared/config/routes/path";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

interface MenuItemsProps {
	className?: string;
}

export const MenuItems: FC<MenuItemsProps> = memo(({ className }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onClickLogoutHandler = useCallback(() => {
		dispatch(entityAuthActions.logout());
		navigate(getLoginRoutePath());
	}, [dispatch, navigate]);

	const menuItems = useMemo(() => {
		return entityMenuModel.map((item) => {
			return (
				<MenuItem
					key={item.id}
					className={className}
					name={item.name}
					to={item.to}
					Icon={item.Icon}
					onClick={item.to === getLoginRoutePath() ? onClickLogoutHandler : undefined}
				/>
			);
		});
	}, [className, onClickLogoutHandler]);

	return menuItems;
});
