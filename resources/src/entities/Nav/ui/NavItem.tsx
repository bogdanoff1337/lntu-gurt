import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { ButtonModifier, NavLinkButton } from "@/shared/ui/Button";
import cls from "./NavItem.module.scss";

interface NavItemProps {
	className?: string;
	name: string;
	to: string;
	modifier?: ButtonModifier;
}

export const NavItem: FC<NavItemProps> = ({
	className, to, name, modifier = ButtonModifier.CLEAR,
}) => {
	return (
		<li className={cn(cls.NavItem, {}, [className])}>
			<NavLinkButton className={cls.NavItem__link} modifier={modifier} to={to}>
				{name}
			</NavLinkButton>
		</li>
	);
};
