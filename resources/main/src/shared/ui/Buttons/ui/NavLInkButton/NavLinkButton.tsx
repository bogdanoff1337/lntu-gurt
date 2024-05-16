import clsx from "clsx";
import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import cls from "../common/style.module.scss";
import { ButtonModifier } from "../common/types";

interface NavLinkButtonProps {
	className?: string;
	children: ReactNode;
	to: string;
	modifier?: ButtonModifier;
}

export const NavLinkButton: FC<NavLinkButtonProps> = ({
	className,
	children,
	modifier = "",
	to,
}) => (
	<NavLink to={to} className={clsx(cls.Button, [className, cls[modifier]])}>
		{children}
	</NavLink>
);
