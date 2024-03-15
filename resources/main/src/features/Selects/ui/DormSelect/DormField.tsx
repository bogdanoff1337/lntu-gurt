import { FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./style.module.scss";

interface DormFieldProps {
	className?: string
}

export const DormField: FC<DormFieldProps> = ({ className }) => {
	return (
		<div className={classNames(cls.DormField, {}, [className])}>
			1
		</div>
	);
};
