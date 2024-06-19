import clsx from "clsx";
import {
	ButtonHTMLAttributes, FC, ReactNode, useMemo,
} from "react";
import cls from "../common/style.module.scss";
import { ButtonModifier } from "../common/types";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	Icon?: FC<React.SVGProps<SVGSVGElement>>;
	modifier?: ButtonModifier;
}

export const Button: FC<ButtonProps> = ({
	className,
	children,
	Icon,
	modifier = "",
	...otherProps
}) => {
	const modifiers = useMemo(() => {
		return modifier.split(" ").map((modifier) => {
			return cls[modifier];
		});
	}, [modifier]);

	return (
		<button
			className={clsx(cls.Button, {
				[cls.Button_disabled]: otherProps.disabled,
			}, [className, ...modifiers])}
			{...otherProps}
		>
			{children}
		</button>
	);
};
