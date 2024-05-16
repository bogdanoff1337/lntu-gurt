import clsx from "clsx";
import { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RoomItem } from "@/entities/Rooms";
import { getRoomsRoutePath } from "@/shared/config/routes/path";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/shared/ui/PageLoader";
import cls from "./BookedRoomsList.module.scss";
import { entityBookedRoomsActions } from "@/entities/BookedRooms/model/slice/entityBookedRoomsSlice";
import { entityBookedRoomsSelectors } from "@/entities/BookedRooms";

interface BookedRoomsListProps {
	className?: string;
}

export const BookedRoomsList: FC<BookedRoomsListProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const bookedRoomsData = useSelector(entityBookedRoomsSelectors.data);
	const bookedRoomsDataIsLoading = useSelector(entityBookedRoomsSelectors.isLoading);
	
	useEffect(() => {
		dispatch(entityBookedRoomsActions.getBookedRooms());
	}, [dispatch]);

	const bookedRoomsItems = useMemo(() => {
		return bookedRoomsData?.data.map(({ id, images, number }) => (
			<RoomItem key={id} image={`/photos/uploads/room/${images}`} number={number} to={getRoomsRoutePath(id)} />
		));
	}, [bookedRoomsData]);

	if (bookedRoomsDataIsLoading) {
		return (
			<PageLoader />
		);
	}

	if (bookedRoomsData?.data.length === 0) {
		return (
			<div className={cls.BookedRoomsList__pageEmpty}>
				<p className={cls.BookedRoomsList__empty}>Немає жодної вільної кімнати, зверніться пізніше</p>
			</div>
		);
	}

	return (
		<ul className={clsx(cls.BookedRoomsList, [className])}>
			{bookedRoomsItems}
		</ul>
	);
};
