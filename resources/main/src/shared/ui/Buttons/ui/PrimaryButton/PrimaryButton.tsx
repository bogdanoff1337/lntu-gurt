import { FC, ReactNode } from "react";
import { Button } from "../..";
import { classNames as cn } from "../../../../lib/classNames/classNames";
import { Icon } from "../../../Icon";
import cls from "./PrimaryButton.module.scss";

interface PrimaryButtonProps {
	className?: string;
	children: ReactNode;
	Icon: FC<React.SVGProps<SVGSVGElement>>;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ className, children, Icon }) => {
	return (
		<Button className={cn(cls.PrimaryButton, {}, [className])}>
			{children}
			<Icon className={cls.PrimaryButton__icon} />
		</Button>
	);
};
