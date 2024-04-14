import { Menu } from "@headlessui/react";
import { FC } from "react";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./MenuItem.module.scss";

interface MenuItemProps {
	className?: string;
	Icon: FC<React.SVGProps<SVGSVGElement>>;
	name: string;
	onClick?: () => void;
	isHeaderMenu?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({
	className, Icon, name, onClick,
}) => {
	return (
		<li className={cn(cls.MenuItem, {}, [className])}>
			<button className={cls.MenuItem__button} onClick={onClick}>
				<Icon className={cls.MenuItem__icon} />
				<span className={cls.MenuItem__name}>{name}</span>
				<ArrowIcon className={cls.MenuItem__arrowIcon} />
			</button>
		</li>
	);
};
