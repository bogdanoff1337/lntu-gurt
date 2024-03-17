import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import ArrowButton from "../../assets/arrow.svg";
import cls from "./Button.module.scss";

interface ButtonProps {
	className?: string;
	right?: boolean;
	onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ className, right, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={cn(cls.Button, {
				[cls.Button_right]: right,
			}, [className])}
		>
			<ArrowButton className={cls.Button__icon} />
		</button>
	);
};
