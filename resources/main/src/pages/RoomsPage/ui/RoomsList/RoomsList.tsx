import clsx from "clsx";
import { FC, useMemo } from "react";
import { RoomItem } from "@/entities/Rooms";
import { getRoomsRoutePath } from "@/shared/config/routes/path";
import cls from "./RoomsList.module.scss";
import { Room } from "@/entities/Rooms";

interface RoomsListProps {
	className?: string;
	data?: Room[]
}

export const RoomsList: FC<RoomsListProps> = ({ className, data }) => {

	const roomsItems = useMemo(() => {
		return data?.map(({ id, images, number }) => (
			<RoomItem key={id} image={`/photos/uploads/room/${images}`} number={number} to={getRoomsRoutePath(id)} />
		));
	}, [data]);

	return (
		<div className={clsx(cls.RoomsList, [className])}>
			{roomsItems}
		</div>
	);
};
