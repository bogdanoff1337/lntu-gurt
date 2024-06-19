import clsx from "clsx";
import {
	ComponentProps, FC, ReactNode, memo,
	useMemo,
} from "react";
import { NavLink } from "react-router-dom";
import cls from "../common/style.module.scss";
import { ButtonModifier } from "../common/types";

interface NavLinkButtonProps extends ComponentProps<typeof NavLink> {
	className?: string;
	children: ReactNode;
	to: string;
	modifier?: ButtonModifier;
}

export const NavLinkButton: FC<NavLinkButtonProps> = memo(({
	className,
	children,
	modifier = ButtonModifier.DEFAULT,
	to,
	...otherProps
}) => {
	const modifiers = useMemo(() => {
		return modifier.split(" ").map((modifier) => {
			return cls[modifier];
		});
	}, [modifier]);

	return (
		<NavLink to={to} className={clsx(cls.Button, [className, ...modifiers])} {...otherProps}>
			{children}
		</NavLink>
	);
});
