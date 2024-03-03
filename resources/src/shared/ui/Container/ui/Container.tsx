import { FC, ReactNode } from "react";
import { classNames as cn } from "../../../lib/classNames/classNames";
import cls from "./Container.module.scss";

interface ContainerProps {
	className?: string;
	children?: ReactNode;
	modifier?: ContainerModifier;
}

export enum ContainerModifier {
	DEFAULT = "Container_default",
	AUTH = "Container_auth",
	ABOUT = "Container_about",
}

export const Container: FC<ContainerProps> = ({ className, children, modifier = ContainerModifier.DEFAULT }) => {
	return (
		<div className={cn(cls.Container, {}, [className, cls[modifier]])}>
			{children}
		</div>
	);
};
