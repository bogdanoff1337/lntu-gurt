import {
	FC, ReactNode, useEffect, useState,
} from "react";
import { $api } from "@/shared/api/api";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Room } from "../../model/types/Room";
import { RoomItem } from "../RoomItem/RoomItem";
import cls from "./RoomsList.module.scss";

interface RoomsListProps {
	className?: string;
	// roomsItems: Room[];
}

export const RoomsList: FC<RoomsListProps> = ({
	className,
}) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		$api.get("room")
			.then((response) => {
				console.log(response.data.data);
				setData(response.data.data);
			});
	}, []);

	console.log(data);

	return (
		<ul className={cn(cls.RoomList, {}, [className])}>
			{data.map((item) => (
				<RoomItem alt={item.block} src="data:image/png;base64,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" roomNumber={item.number} />
			))}
		</ul>
	);
};
