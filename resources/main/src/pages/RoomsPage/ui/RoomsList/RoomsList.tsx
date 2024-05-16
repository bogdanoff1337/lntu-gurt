import clsx from "clsx";
import queryString from "query-string";
import { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RoomItem, entityRoomsActions, entityRoomsSelectors } from "@/entities/Rooms";
import { getRoomsRoutePath } from "@/shared/config/routes/path";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/shared/ui/PageLoader";
import cls from "./RoomsList.module.scss";

interface RoomsListProps {
	className?: string;
}

export const RoomsList: FC<RoomsListProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const roomsData = useSelector(entityRoomsSelectors.getEntityRoomsData);
	const roomsDataIsLoading = useSelector(entityRoomsSelectors.getEntityRoomsIsLoading);

	useEffect(() => {
		const { faculty_id, dormitory_id, gender } = queryString.parse(window.location.search);
		dispatch(entityRoomsActions.getRoomsByParams({
			faculty_id,
			dormitory_id,
			gender,
		}));
	}, [dispatch]);

	const roomsItems = useMemo(() => {
		return roomsData?.data.map(({ id, images, number }) => (
			<RoomItem key={id} image={images} number={number} to={getRoomsRoutePath(id)} />
		));
	}, [roomsData]);

	if (roomsDataIsLoading) {
		return (
			<PageLoader />
		);
	}

	if (roomsData?.data.length === 0) {
		return (
			<div className={cls.RoomsList__pageEmpty}>
				<p className={cls.RoomsList__empty}>Немає жодної вільної кімнати, зверніться пізніше</p>
			</div>
		);
	}

	return (
		<ul className={clsx(cls.RoomsList, [className])}>
			{roomsItems}
		</ul>
	);
};
