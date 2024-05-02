import { FC } from "react";
import { NavLink } from "react-router-dom";
import { generateQueryString } from "@/shared/lib/generateQueryString";
import cls from "./FacultyItem.module.scss";
import clsx from "clsx";

interface FacultyItemProps {
	className?: string;
	image?: string;
	alt?: string;
	slug?: string;
	to?: string;
	id: number | string;
}

export const FacultyItem: FC<FacultyItemProps> = ({
	className, image, alt = "faculty", slug, to = "/", id,
}) => {
	return (
		<li className={clsx(cls.FacultyItem, [className])}>
			<NavLink className={cls.FacultyItem__link} to={{ pathname: "/rooms", search: generateQueryString({ faculty_id: id }) }}>
				<img className={cls.FacultyItem__image} src={image} alt={alt} />
				<h3 className={cls.FacultyItem__slug}>{slug}</h3>
			</NavLink>
		</li>
	);
};
