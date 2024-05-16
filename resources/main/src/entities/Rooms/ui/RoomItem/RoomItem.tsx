import clsx from "clsx";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import cls from "./RoomItem.module.scss";

interface RoomItemProps {
	className?: string;
	image?: string;
	alt?: string;
	number?: string;
	to?: string;
}

export const RoomItem: FC<RoomItemProps> = ({
	className, image, alt = "faculty", number, to = "/",
}) => {
	return (
		<li className={clsx(cls.RoomItem, [className])}>
			<NavLink className={cls.RoomItem__link} to={to}>
				{image && <img className={cls.RoomItem__image} src={`/photos/uploads/room/${image}`} alt={alt} />}
				<h3 className={cls.RoomItem__number}>{number}</h3>
			</NavLink>
		</li>
	);
};
