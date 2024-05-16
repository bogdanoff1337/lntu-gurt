import clsx from "clsx";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Button } from "../..";
import { Loader } from "../../../Loader";
import cls from "./PrimaryButton.module.scss";
import { ButtonProps } from "../Button/Button";
interface PrimaryButtonProps extends ButtonProps {
	isLoading: boolean;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
	className, children, Icon, modifier, isLoading, ...otherProps
}) => {
	return (
		<Button modifier={modifier} className={clsx(cls.PrimaryButton, [className])} {...otherProps}>
			{children}
			{isLoading ? <Loader className={cls.PrimaryButton__loader} /> : Icon && <Icon className={cls.PrimaryButton__icon} />}
		</Button>
	);
};
