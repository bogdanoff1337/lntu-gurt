import { FC } from "react";
import cls from "./Comparision.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";

interface ComparisionProps {
	className?: string
}

export const Comparision: FC<ComparisionProps> = ({ className }) => {
	return (
		<div className={classNames(cls.Comparision, {}, [className])}>
			
		</div>
	)
}