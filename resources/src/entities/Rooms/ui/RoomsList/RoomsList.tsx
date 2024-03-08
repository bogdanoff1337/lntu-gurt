import {
	FC, ReactNode, useEffect, useState,
} from "react";
import { useSelector } from "react-redux";
import { $api } from "@/shared/api/api";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchRooms, getRoomsData } from "../..";
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
		$api.get("rooms")
			.then((response) => {
				console.log(response.data.data);
				setData(response.data.data);
			});
	}, []);

	// console.log(data);

	// const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	dispatch(fetchRooms() as any);
	// }, [dispatch]);

	// const data = useSelector(getRoomsData);

	return (
		<ul className={cn(cls.RoomList, {}, [className])}>
			{data.map((item) => (
				<RoomItem
					key={item.id}
					alt={item.block}
					src={item.photos[0]}
					roomNumber={item.number}
				/>
			))}
		</ul>
	);
};
