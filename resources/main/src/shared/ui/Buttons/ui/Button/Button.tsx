import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { classNames } from "../../../../lib/classNames/classNames";
import cls from "../common/style.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	Icon?: FC<React.SVGProps<SVGSVGElement>>;
}

export const Button: FC<ButtonProps> = ({
	className,
	children,
	Icon,
	...otherProps
}) => (
	<button className={classNames(cls.Button, {}, [className])} {...otherProps}>
		{children}
	</button>
);
