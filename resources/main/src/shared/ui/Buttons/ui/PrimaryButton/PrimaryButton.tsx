import clsx from "clsx";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Button } from "../..";
import { Loader } from "../../../Loader";
import cls from "./PrimaryButton.module.scss";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	Icon?: FC<React.SVGProps<SVGSVGElement>>;
	isLoading: boolean;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
	className, children, Icon, isLoading, ...otherProps
}) => {
	return (
		<Button className={clsx(cls.PrimaryButton, [className])} {...otherProps}>
			{children}
			{isLoading ? <Loader className={cls.PrimaryButton__loader} /> : Icon && <Icon className={cls.PrimaryButton__icon} />}
		</Button>
	);
};
