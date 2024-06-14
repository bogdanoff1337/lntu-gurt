import clsx from "clsx";
import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import LogoIcon from "@/shared/assets/common/lntu-logo.svg?react";
import { getMainRoutePath } from "../../../config/routes/path";
import cls from "./Logo.module.scss";

interface LogoProps {
	className?: string
}

export const Logo: FC<LogoProps> = memo(({ className }) => {
	return (
		<NavLink
			to={getMainRoutePath()}
			className={clsx(cls.Logo, [className])}
		>
			<LogoIcon className={cls.Logo__icon} />
		</NavLink>
	);
});
