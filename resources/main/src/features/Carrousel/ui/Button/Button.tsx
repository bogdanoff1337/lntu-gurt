import clsx from "clsx";
import { FC } from "react";
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
			aria-label="Arrow button"
			onClick={onClick}
			className={clsx(cls.Button, {
				[cls.Button_right]: right,
			}, [className])}
		>
			<ArrowButton className={cls.Button__icon} />
		</button>
	);
};
