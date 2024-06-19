import clsx from "clsx";
import queryString from "query-string";
import {
	FC, memo, useEffect, useMemo,
} from "react";
import { useSelector } from "react-redux";
import { useTriggerFetch } from "@/features/TriggerFetch";
import {
	RoomItem, RoomItemSkeleton, entityRoomsActions, entityRoomsSelectors,
} from "@/entities/Rooms";
import { getRoomsRoutePath } from "@/shared/config/routes/path";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/shared/ui/PageLoader";
import cls from "./RoomsList.module.scss";

interface RoomsListProps {
	className?: string;
}

export const RoomsList: FC<RoomsListProps> = memo(({ className }) => {
	const roomsData = useSelector(entityRoomsSelectors.getData);
	const roomsDataIsLoading = useSelector(entityRoomsSelectors.getIsLoading);
	const roomsDataIsFetching = useSelector(entityRoomsSelectors.getIsFetching);

	const dispatch = useAppDispatch();

	const TriggerFetch = useTriggerFetch({

		action: () => {
			const { faculty_id, dormitory_id, gender } = queryString.parse(window.location.search);

			dispatch(entityRoomsActions.getRoomsByParams({
				faculty_id,
				dormitory_id,
				gender,
				page: `${roomsData!.meta.current_page + 1}`,
			}));
		},
		condition: roomsData && roomsData?.meta.current_page < roomsData?.meta.last_page && !roomsDataIsFetching,
	}, [roomsData]);

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
			<p className={cls.RoomsList__empty}>Немає жодної вільної кімнати, зверніться пізніше</p>
		);
	}

	return (
		<div className={clsx(cls.RoomsList, [className])}>
			<ul className={cls.RoomsList__self}>
				{roomsItems}
				{roomsDataIsFetching && new Array(9).fill(undefined).map((_, i) => <RoomItemSkeleton key={i} />)}
			</ul>
			<TriggerFetch />
		</div>
	);
});
