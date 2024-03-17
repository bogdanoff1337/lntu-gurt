import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { classNames } from "../../../lib/classNames/classNames";
import cls from "./style.module.scss";

interface NavLinkButtonProps {
	className?: string;
	children: ReactNode;
	to: string
}

export const NavLinkButton: FC<NavLinkButtonProps> = ({
	className,
	children,
	to,
}) => (
	<NavLink to={to} className={classNames(cls.Button, {}, [className])}>
		{children}
	</NavLink>
);
