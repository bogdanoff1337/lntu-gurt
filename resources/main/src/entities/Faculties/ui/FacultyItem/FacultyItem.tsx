import clsx from "clsx";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { getRoomsRoutePath } from "@/shared/config/routes/path";
import { generateQueryString } from "@/shared/lib/generateQueryString";
import cls from "./FacultyItem.module.scss";

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
			<NavLink
				className={cls.FacultyItem__link}
				to={{
					pathname: getRoomsRoutePath(),
					search: generateQueryString({ faculty_id: id }),
				}}
			>
				<img className={cls.FacultyItem__image} src={`/photos/uploads/facult/${image}`} alt={alt} />
				<h3 className={cls.FacultyItem__slug}>{slug}</h3>
			</NavLink>
		</li>
	);
};
