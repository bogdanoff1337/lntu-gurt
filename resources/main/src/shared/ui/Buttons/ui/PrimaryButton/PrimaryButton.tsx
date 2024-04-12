import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Button } from "../..";
import { classNames as cn } from "../../../../lib/classNames/classNames";
import { Icon } from "../../../Icon";
import { Loader } from "../../../Loader";
import cls from "./PrimaryButton.module.scss";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	Icon: FC<React.SVGProps<SVGSVGElement>>;
	isLoading: boolean;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
	className, children, Icon, isLoading, ...otherProps
}) => {
	return (
		<Button className={cn(cls.PrimaryButton, {}, [className])} {...otherProps}>
			{children}
			{isLoading ? <Loader className={cls.PrimaryButton__loader} /> : <Icon className={cls.PrimaryButton__icon} />}
		</Button>
	);
};
