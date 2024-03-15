import { FC } from "react";
import { NavLink } from "react-router-dom";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./RoomItem.module.scss";

interface RoomItemProps {
	className?: string;
	image?: string;
	alt?: string;
	slug?: string;
	to?: string;
}



export const RoomItem: FC<RoomItemProps> = ({
	className, image, alt = "faculty", slug, to = "/",
}) => {
	return (
		<li className={cn(cls.RoomItem, {}, [className])}>
			<NavLink className={cls.RoomItem__link} to={to}>
				<img className={cls.RoomItem__img} src={image} alt={alt} />
				<h3 className={cls.RoomItem__slug}>{slug}</h3>
			</NavLink>
		</li>
	);
};
