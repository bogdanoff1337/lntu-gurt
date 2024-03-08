import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./FacultyItem.module.scss";

interface FacultyItemProps {
	className?: string;
	src?: string;
	alt: string;
	facultName: string;
}

export const FacultyItem: FC<FacultyItemProps> = ({
	className, src, alt, facultName,
}) => {
	return (
		<li className={cn(cls.FacultyItem, {}, [className])}>
			<img className={cls.FacultyItem__img} src={src} alt={alt} />
			<h3 className={cls.FacultyItem__facultName}>{facultName}</h3>
		</li>
	);
};
