import { FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Comparision.module.scss";

interface ComparisionProps {
	className?: string
}

export const Comparision: FC<ComparisionProps> = ({ className }) => {
	return (
		<div className={classNames(cls.Comparision, {}, [className])} />
	);
};
