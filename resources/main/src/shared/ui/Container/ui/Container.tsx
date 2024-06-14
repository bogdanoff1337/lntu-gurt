import clsx from "clsx";
import { FC, ReactNode, memo } from "react";
import cls from "./Container.module.scss";

interface ContainerProps {
	className?: string;
	children?: ReactNode;
	isDisabled?: boolean;
	modifier?: ContainerModifier;
}

export enum ContainerModifier {
	AUTH = "Container_auth",
	FORM = "Container_form",
	ACTIVE = "Container_active",
}

export const Container: FC<ContainerProps> = memo(({
	className, children, isDisabled, modifier = ContainerModifier.ACTIVE,
}) => {
	return (
		<div className={clsx(cls.Container, [className, !isDisabled ? cls[modifier] : undefined])}>
			{children}
		</div>
	);
});
