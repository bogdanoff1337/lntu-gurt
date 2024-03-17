import { FC, ReactNode } from "react";
import { classNames as cn } from "../../../lib/classNames/classNames";
import cls from "./Container.module.scss";

interface ContainerProps {
	className?: string;
	children?: ReactNode;
	isDisabled?: boolean;
}

export const Container: FC<ContainerProps> = ({ className, children, isDisabled }) => {
	return (
		<div className={cn(cls.Container, {
			[cls.Container_active]: !isDisabled
		}, [className])}>
			{children}
		</div>
	);
};
