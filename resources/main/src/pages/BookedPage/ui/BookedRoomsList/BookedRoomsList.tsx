import clsx from "clsx";
import {
	FC, memo, useEffect, useMemo,
} from "react";
import { useSelector } from "react-redux";
import { entityBookedRoomsSelectors, entityBookedRoomsActions } from "@/entities/BookedRooms";
import { RoomItem } from "@/entities/Rooms";
import { getRoomsRoutePath } from "@/shared/config/routes/path";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/shared/ui/PageLoader";
import cls from "./BookedRoomsList.module.scss";

interface BookedRoomsListProps {
	className?: string;
}

export const BookedRoomsList: FC<BookedRoomsListProps> = memo(({ className }) => {
	const dispatch = useAppDispatch();

	const bookedRoomsData = useSelector(entityBookedRoomsSelectors.data);
	const bookedRoomsDataIsLoading = useSelector(entityBookedRoomsSelectors.isLoading);

	useEffect(() => {
		dispatch(entityBookedRoomsActions.getBookedRooms());
	}, [dispatch]);

	const bookedRoomsItems = useMemo(() => {
		return bookedRoomsData?.map(({ room: { id, images, number }, status }) => {
			return <RoomItem key={id} image={images} number={number} to={getRoomsRoutePath(id)} status={status} />;
		});
	}, [bookedRoomsData]);

	if (bookedRoomsDataIsLoading) {
		return (
			<PageLoader />
		);
	}

	if (bookedRoomsData?.length === 0) {
		return (
			<p className={cls.BookedRoomsList__empty}>У вас жодної заброньованої кімнати</p>
		);
	}

	return (
		<ul className={clsx(cls.BookedRoomsList, [className])}>
			{bookedRoomsItems}
		</ul>
	);
});
