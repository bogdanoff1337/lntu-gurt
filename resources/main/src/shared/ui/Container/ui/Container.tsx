import { FC, ReactNode } from "react";
import { classNames as cn } from "../../../lib/classNames/classNames";
import cls from "./Container.module.scss";

interface ContainerProps {
	className?: string;
	children?: ReactNode;
}

export const Container: FC<ContainerProps> = ({ className, children }) => {
	return (
		<div className={cn(cls.Container, {}, [className])}>
			{children}
		</div>
	);
};
