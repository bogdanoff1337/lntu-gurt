import { FC, ReactNode } from "react";
import { classNames as cn } from "../../../lib/classNames/classNames";
import cls from "./Container.module.scss";

interface ContainerProps {
	className?: string;
	children?: ReactNode;
	isDisabled?: boolean;
	modifier?: ContainerModifier;
}

export enum ContainerModifier {
	CONTAINER_AUTH = "Container_auth",
	FORM = "Container_form",
	ACTIVE = "Container_active",
}

export const Container: FC<ContainerProps> = ({
	className, children, isDisabled, modifier = ContainerModifier.ACTIVE,
}) => {
	return (
		<div className={cn(cls.Container, {
		}, [className, !isDisabled ? cls[modifier] : undefined])}
		>
			{children}
		</div>
	);
};
