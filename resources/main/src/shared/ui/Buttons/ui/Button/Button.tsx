import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { classNames } from "../../../../lib/classNames/classNames";
import cls from "../common/style.module.scss";
import { ButtonModifier } from "../common/types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
}) => (
	<button className={classNames(cls.Button, {}, [className, cls[modifier]])} {...otherProps}>
		{children}
	</button>
);
