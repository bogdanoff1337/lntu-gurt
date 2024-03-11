import { FC } from "react";
import { NavLink } from "react-router-dom";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./FacultyItem.module.scss";

interface FacultyItemProps {
	className?: string;
	image?: string;
	alt?: string;
	slug?: string;
	to?: string;
}

export const FacultyItem: FC<FacultyItemProps> = ({
	className, image, alt = "faculty", slug, to = "/",
}) => {
	return (
		<li className={cn(cls.FacultyItem, {}, [className])}>
			<NavLink className={cls.FacultyItem__link} to={to}>
				<img className={cls.FacultyItem__img} src={image} alt={alt} />
				<h3 className={cls.FacultyItem__slug}>{slug}</h3>
			</NavLink>
		</li>
	);
};
