import clsx from "clsx";
import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { getRoomsRoutePath } from "@/shared/config/routes/path";
import { generateQueryString } from "@/shared/lib/generateQueryString";
import { Img } from "@/shared/ui/Img";
import cls from "./FacultyItem.module.scss";

interface FacultyItemProps {
	className?: string;
	image?: string;
	alt?: string;
	slug?: string;
	id: number | string;
}

export const FacultyItem: FC<FacultyItemProps> = memo(({
	className, image, alt = "faculty", slug, id,
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
				<Img
					className={{ image: cls.FacultyItem__image, skeleton: cls.FacultyItem__skeleton }}
					src={`${__API__}/photos/uploads/facult/${image}`}
					alt={alt}
				/>
				<h3 className={cls.FacultyItem__slug}>{slug}</h3>
			</NavLink>
		</li>
	);
});
