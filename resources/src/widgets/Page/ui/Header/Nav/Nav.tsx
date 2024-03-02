import { FC, memo, useMemo } from "react";
import { NavItem, navModel } from "@/entities/Nav";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./Nav.module.scss";

interface NavProps {
	className?: string
}

export const Nav: FC<NavProps> = memo(({ className }) => {
	const navItems = useMemo(() => {
		return navModel.map(({ name, to, isFooter }) => {
			if (isFooter) {
				return null;
			}

			return (
				<NavItem className={cls.Nav__item} name={name} to={to} />
			);
		});
	}, []);

	return (
		<ul className={cn(cls.Nav, {}, [className])}>
			{navItems}
		</ul>
	);
});
