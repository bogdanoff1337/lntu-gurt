import clsx from "clsx";
import { FC, memo, useMemo } from "react";
import { Button, ButtonModifier } from "../..";
import { Loader } from "../../../Loader";
import { ButtonProps } from "../Button/Button";
import cls from "./PrimaryButton.module.scss";

interface PrimaryButtonProps extends ButtonProps {
	isLoading?: boolean;
}

export const PrimaryButton: FC<PrimaryButtonProps> = memo(({
	className, children, Icon, modifier = ButtonModifier.DEFAULT, isLoading = false, ...otherProps
}) => {
	return (
		<Button modifier={modifier} className={clsx(cls.PrimaryButton, [className])} {...otherProps}>
			{children}
			{isLoading ? <Loader className={cls.PrimaryButton__loader} /> : Icon && <Icon className={cls.PrimaryButton__icon} />}
		</Button>
	);
});
