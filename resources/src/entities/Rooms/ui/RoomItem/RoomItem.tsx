import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./RoomItem.module.scss";

interface RoomItemProps {
	className?: string;
	src?: string;
	alt: string;
	roomNumber: number;
}

export const RoomItem: FC<RoomItemProps> = ({
	className, src, alt, roomNumber,
}) => {
	return (
		<li className={cn(cls.RoomItem, {}, [className])}>
			<img className={cls.RoomItem__img} src={src} alt={alt} />
			<h3 className={cls.RoomItem__roomNumber}>{roomNumber}</h3>
		</li>
	);
};
