import { FC } from "react";
import { NavLink } from "react-router-dom";
import { getMainRoutePath } from "../../../config/routes/path";
import { classNames as cn } from "../../../lib/classNames/classNames";
import LogoIcon from "../assets/logo.svg?react";
import cls from "./Logo.module.scss";

interface LogoProps {
	className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => {
	return (
		<NavLink
			to={getMainRoutePath()}
			className={cn(cls.Logo, {}, [className])}
		>
			<LogoIcon className={cls.Logo__icon} />
		</NavLink>
	);
};
