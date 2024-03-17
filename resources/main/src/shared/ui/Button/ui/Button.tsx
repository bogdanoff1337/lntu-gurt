import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { classNames } from "../../../lib/classNames/classNames";
import cls from "./style.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
	className,
	children,
	...otherProps
}) => (
	<button className={classNames(cls.Button, {}, [className])} {...otherProps}>
		{children}
	</button>
);
