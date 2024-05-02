import clsx from "clsx";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";
import cls from "./MenuItem.module.scss";

interface MenuItemProps {
	className?: string;
	Icon: FC<React.SVGProps<SVGSVGElement>>;
	name: string;
	onClick?: () => void;
	to: string;
}

export const MenuItem: FC<MenuItemProps> = ({
	className, Icon, name, onClick, to,
}) => {
	return (
		<li className={clsx(cls.MenuItem, [className])}>
			<NavLink className={cls.MenuItem__link} onClick={onClick} to={to}>
				<Icon className={cls.MenuItem__icon} />
				<span className={cls.MenuItem__name}>{name}</span>
				<ArrowIcon className={cls.MenuItem__arrowIcon} />
			</NavLink>
		</li>
	);
};
